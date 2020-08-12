
// https://gka.github.io/palettes/#/9|s||ffffe0,ff005e,93003a|1|1
// => x.PH.scale.jpg

const logger = require('mii-logger.js');
const chroma = require('chroma-js');

const PH = {
  // 'na': { color: 'na'},
  '8.5': { color: '#094d8e', },
  '8.0': { color: '#066138', },
  '7.0': { color: '#06914d', },
  '6.5': { color: '#9bb135', },
  '6.0': { color: '#efe561', },
  '5.0': { color: '#de923c', },
  '4.0': { color: '#d34422', },
};

// ph: na => 8.5 [ na #094d8e ], steps: NaN 
// ph: 8.5 => 8.0 [ #094d8e #066138 ], steps: 5 
// ph: 8.0 => 7.0 [ #066138 #06914d ], steps: 10 
// ph: 7.0 => 6.5 [ #06914d #9bb135 ], steps: 5 
// ph: 6.5 => 6.0 [ #9bb135 #efe561 ], steps: 5 
// ph: 6.0 => 5.0 [ #efe561 #de923c ], steps: 10 
// ph: 5.0 => 4.0 [ #de923c #d34422 ], steps: 10 
// ph: 4.0 => na [ #d34422 na ], steps: NaN 

const bezierInterpolation = ( colors, num, correct=true )=>{
  const c = chroma.bezier( colors ).scale();
  return ( correct ? c.correctLightness() : c ).colors( (+num) );
}

const getDelta = ( c0, c1 )=>{
  const delta = chroma.deltaE( c0, c1 );
  return { c0, c1, delta };
}

const PHS = Object.keys(PH);

const table_full = {};
const G_STEP = 0.1;

for( let ph_i=0; ph_i<PHS.length; ph_i++ ){

  const cPH = PHS[ ph_i ];
  const nPH = PHS.length > (ph_i+1) ? PHS[ ph_i+1 ] : 'na'; 

  const ObPH0 = PH[ cPH ];
  const ObPH1 = PH[ nPH ];
  const steps = Math.floor( ( (+cPH) - (+nPH)) /G_STEP );
  // console.log(`// ph: ${cPH} => ${nPH} [ ${ObPH0.color} ${ObPH1.color} ], steps: ${ steps } `);
  if( steps ){

    table_full[ cPH ] = {
      range: { from: { value: cPH, color: ObPH0.color }, to: {value: nPH, color: ObPH1.color } },
      steps,
      data: [],
    };

    const data = bezierInterpolation([ObPH0.color, ObPH1.color], steps ); // .reverse();
    table_full[ cPH ].data = [];
    for( const c_i in data ){
      const c = data[ c_i ];
      const v = (+cPH) - ( c_i * G_STEP );
      table_full[ cPH ].data.push({ color: c, ph: v });
    }
    // console.log(`bezierInterpolation(['${ObPH0.color}','${ObPH1.color}'],${ steps });`);
  }

}


// console.jsonToFile( 'table-full.json', table_full, true, 2 );

// const table_short = [];
// Object.keys(table_full).map((ph)=>{
//   table_full[ ph ].data.map((item)=>{
//     table_short.push( item );
//   })
// });

// console.jsonToFile( 'table-short.json', table_short, true, 2 );
const CS = {
  '8.5': "#094d8e",
  '8.4': "#1c5279",
  '8.3': "#1f5763",
  '8.2': "#1a5c4e",
  '8.1': "#066138",
  '8.0': "#066138",
  '7.9': "#06663a",
  '7.8': "#066b3d",
  '7.7': "#06713f",
  '7.6': "#077641",
  '7.5': "#077b44",
  '7.4': "#078146",
  '7.3': "#068648",
  '7.2': "#068c4b",
  '7.1': "#06914d",
  '7.0': "#06914d",
  '6.9': "#459948",
  '6.8': "#66a143",
  '6.7': "#81a93d",
  '6.6': "#9bb135",
  '6.5': "#9bb135",
  '6.4': "#b0be40",
  '6.3': "#c5cb4b",
  '6.2': "#dad856",
  '6.1': "#efe561",
  '6.0': "#efe561",
  '5.9': "#eedc5d",
  '5.8': "#ecd358",
  '5.7': "#ebc954",
  '5.6': "#e9c050",
  '5.5': "#e7b74c",
  '5.4': "#e5ae48",
  '5.3': "#e3a544",
  '5.2': "#e09b40",
  '5.1': "#de923c",
  '5.0': "#de923c",
  '4.9': "#dd8a39",
  '4.8': "#dc8236",
  '4.7': "#db7a33",
  '4.6': "#da7230",
  '4.5': "#d96a2d",
  '4.4': "#d8612a",
  '4.3': "#d65827",
  '4.2': "#d54e25",
  '4.1': "#d34422"
};

const calcPHByColor = ( input )=>{

  let maxDelta = 1000000;
  let result = {
    ph: 0,
    color: input,
    delta: 0,
  };

  for( const ph of Object.keys(CS) ){
  
    const testColor = CS[ ph ];
    const delta = getDelta( input, testColor ); 

    if( delta.delta < maxDelta ){
      maxDelta = delta.delta;
      result.ph = ph;
      result.delta = delta.delta;
    }
  }

  return result;

}


// console.log( calcPHByColor('#05432e') ); // {"ph":"8.2","color":"#05432e","delta":15.359530486663825}
// console.log( calcPHByColor('#1b5d2f') ); // {"ph":"8.1","color":"#1b5d2f","delta":3.08780538374212}
// console.log( calcPHByColor('#316c36') ); // {"ph":"7.8","color":"#316c36","delta":4.897856598585441}
// console.log( calcPHByColor('#3e7027') ); // {"ph":"7.6","color":"#3e7027","delta":8.805413152883142}
// console.log( calcPHByColor('#597b1c') ); // {"ph":"6.9","color":"#597b1c","delta":13.086411251301064}
// console.log( calcPHByColor('#637925') ); // {"ph":"6.8","color":"#637925","delta":14.54815465607808}
// console.log( calcPHByColor('#6e7623') ); // {"ph":"6.8","color":"#6e7623","delta":17.284118539426718}
// console.log( calcPHByColor('#727327') ); // {"ph":"6.8","color":"#727327","delta":19.634144990688466}
// console.log( calcPHByColor('#8c7e26') ); // {"ph":"6.6","color":"#8c7e26","delta":18.52624190331792}
// console.log( calcPHByColor('#947c1c') ); // {"ph":"5.2","color":"#947c1c","delta":18.769266859293534}
// console.log( calcPHByColor('#a98724') ); // {"ph":"5.2","color":"#a98724","delta":13.386735227230044}
// console.log( calcPHByColor('#b37f1a') ); // {"ph":"5.1","color":"#b37f1a","delta":10.940918794109052}
// console.log( calcPHByColor('#b67821') ); // {"ph":"4.9","color":"#b67821","delta":9.828651239318416}
// console.log( calcPHByColor('#c15b1b') ); // {"ph":"4.5","color":"#c15b1b","delta":6.463969353585213}
// console.log( calcPHByColor('#be5816') ); // {"ph":"4.5","color":"#be5816","delta":7.554627606861653}
// console.log( calcPHByColor('#c03919') ); // {"ph":"4.1","color":"#c03919","delta":5.075874800827002}
// console.log( calcPHByColor('#c32f21') ); // {"ph":"4.1","color":"#c32f21","delta":7.085608359812613}


// console.log( calcPHByColor('') );

// console.log( calcPHByColor('#dac343') ); // {"ph":"5.7","color":"#dac343","delta":3.820538002653347}

console.log( calcPHByColor('#22624a') ); // {"ph":"8.2","color":"#22624a","delta":4.652516018306168}
console.log( calcPHByColor('#c74630') ); // {"ph":"4.1","color":"#c74630","delta":4.824047810592723}




























// --------------------------------------------------------------------
// DOCS: https://gka.github.io/chroma.js/#chroma


// chroma.scale(['yellow', 'navy']);
// chroma.scale(['yellow', 'navy']).mode('lab');

// chroma.scale(['#f00', '#0f0']);
// chroma.scale(['#f00', '#0f0']).mode('lrgb');

// // linear interpolation
// chroma.scale(['yellow', 'red', 'black']);
// // bezier interpolation
// chroma.bezier(['yellow', 'red', 'black']);

// const c5 = chroma.bezier(['yellow', 'red', 'black'])
//   .scale()
//   .correctLightness()
//   .colors(5);
// console.log({c5});

// .correctLightness(): off : ["#ffff00","#f2a200","#b8580c","#66260e","#000000"]
// .correctLightness(): on  : ["#ffff00","#f5a900","#bf5e0b","#6c280e","#000000"]
