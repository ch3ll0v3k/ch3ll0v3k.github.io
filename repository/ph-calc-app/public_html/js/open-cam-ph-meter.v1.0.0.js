// https://github.com/ch3ll0v3k/open-cam-ph-meter.git
// open-cam-ph-meter.v1.0.0.js

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

// http://127.0.0.1:8080/ph-samples/photo_2020-07-25_18-07-44.jpg

class OpenCamPHMeter{
  constructor(params){

    const self = this;

    // chrome://inspect#devices

    self.params = params;

    self.appName = 'Open-Cam-PH Meter';
    self.appVersion = [0,0,1];

    self.FPS = 24;
    self.FPS_delay = (1000 / self.FPS);
    self.W = window.innerWidth;
    self.H = window.innerHeight;
    self.video = null;
    self.canvas = null;
    self.ctx = null;
    self.DPI = window.devicePixelRatio;

    self.videoElem = 'open-ph-video';
    self.canvasElem ='open-ph-canvas';

    self.textIndex = 0;

    self.html = {
      wrapper: null, popup: null, canvas: null, video: null,
    };

    self.btns = {
      // reset: {el: null, onClick: self._resetData },
    };

    self.maxMeasurements = 1000;
    self.measurements = [];

    self._init();

  }

  _resetData(){
    this.measurements = [];
  }

  _appendData( phData ){
    this.measurements.push( phData );

    if( this.measurements.length >= this.maxMeasurements ){
      this.measurements.splice(0,1);
    }
  }

  getAvgPHLevel(){

    const avgs = {
      ph: 0,
      delta: 0,
    };

    this.measurements.map((phData)=>{
      avgs.ph += ( +phData.ph );
      // avgs.color = ( +phData.color );
      avgs.delta += ( +phData.delta );
    });

    for( const dataType of Object.keys(avgs) ){
      avgs[ dataType ] /= this.measurements.length;
    }

    avgs.records = this.measurements.length;

    return avgs;

  }

  async _init(){

    const self = this;

    document.body.innerHTML = `
      <div id="open-ph-popup">${self.appName}<br/>v${ self.appVersion.join('.') }</div>
      <div id="open-ph-wrapper">
        <div id="open-ph-float-panel">
          <button id="open-ph-reset-btn" class="btn clr-main w-100">Reset</video>        
        </div>
        <canvas id="${self.canvasElem}"></canvas>
        <video id="${self.videoElem}"></video>
      </div>
    `;

    for( const type of Object.keys( self.html ) ){
      self.html[ type ] = document.getElementById(`open-ph-${type}`);
    }

    // for( const btn of Object.keys( self.btns ) ){
    //   self.btns[ btn ].el = document.getElementById(`open-ph-${btn}-btn`);
    //   self.btns[ btn ].el.addEventListener('click', ()=>{ self.btns[ btn ].onClick() } );
    // }

    self.btns.reset = document.getElementById(`open-ph-reset-btn`);
    self.btns.reset.addEventListener('click', ()=>{ self._resetData(); } );

    if( !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
      self.alert('Your browser does not support Web Media Devices', 'warn');
      return;
    }

    let useThisDeviceId = ''; // '88932d408a6f418be5fca9c9de3229b2ce6210a5a9a281201987da5e22807009'

    if( useThisDeviceId ){
      self.setUpStream( useThisDeviceId );
      return;
    }

    // get all video devices
    const requiredDevices = await self.requestUserDevice(); 

    if( !requiredDevices || requiredDevices.length <= 0 ){
      self.alert(` Application could not get any of Video cameras.<br/> Aborting ...`);
      return;
    }

    // User must select on of devices
    self.createSelectBox( 'Select Camera', requiredDevices, (deviceId)=>{
      self.setUpStream( deviceId );
    });

  }

  createSelectBox(title, options, onSelect){

    const self = this;

    options = [{value:'', name:'Select camera'},...options];

    const selectId = `select-${Date.now()}`;
    let items = options.map((option)=>{
      return `<option value="${option.value}">${option.name}</option>\n`;
    });

    self.html.popup.innerHTML = `<div class="text clr-info">${ title }</div><br/><select class="main-select" id=${selectId}>${items.join('\n')}</select>`;
    self._showAlertBox();

    setTimeout(()=>{

      document.getElementById( selectId ).addEventListener('change', (event)=>{
        self._closeAlertBox(); 
        onSelect( event.target.value );
      });

    },200);

  }

  alert( message, onOk=false, onCancel=false ){
    const self = this;
    const btnId = `close-btn-${Date.now()}`;
    let html = `<div class="">${ message }</div><br/>`;

    if( !onOk && !onCancel ) html += `<button id="${btnId}-close" class="btn clr-main">Close</button>`;
    if( onOk ) html += `<button id="${btnId}-ok" class="btn clr-success">Ok</button>`;
    if( onCancel ) html += `<button id="${btnId}-cancel" class="btn clr-warn">Cancel</button>`;

    this.html.popup.innerHTML = html;

    this.html.popup.style.display = 'block';
    setTimeout(()=>{
      if( !onOk && !onCancel )
        document.getElementById(`${btnId}-close`).addEventListener('click', ()=>{ self._closeAlertBox(); });
      if( onOk )
        document.getElementById(`${btnId}-ok`).addEventListener('click', ()=>{ onOk(); self._closeAlertBox(); });
      if( onCancel )
        document.getElementById(`${btnId}-cancel`).addEventListener('click', ()=>{ onCancel(); self._closeAlertBox(); });
    },100);

  }

  _closeAlertBox(){
    this.html.popup.innerHTML = '';
    this.html.popup.style.display = 'none';
  }

  _showAlertBox( clear=false ){
    if( clear ) this.html.popup.innerHTML = '';
    this.html.popup.style.display = 'block';
  }

  async getMediaDeviceById(deviceId){ // eg: { video: true }

    // see: ./devices.example.json
    // (await navigator.mediaDevices.enumerateDevices()).map((device)=>{});

    // console.log(deviceId);
    // 88932d408a6f418be5fca9c9de3229b2ce6210a5a9a281201987da5e22807009

    return new Promise(async(resolve,rej)=>{
      try{

        // { video: { deviceId: myPreferredCameraDeviceId } }
        // { audio: true, video: { facingMode: { exact: "environment" } } }
        // { video: { deviceId: { exact: myExactCameraOrBustDeviceId } } }

        const constraints = { video: { deviceId: { exact: deviceId } } };
        const stream = await navigator.mediaDevices.getUserMedia( constraints );
        resolve({success: true, message: 'OK', data: stream});
      }catch(e){
        resolve({success: false, message: e.message, data: null});
      }
    });
  }

  async requestUserDevice(){

    const self = this;

    const devices = await navigator.mediaDevices.enumerateDevices();

    const videoInputs = [];

    for( const device of devices ){
      if( !device ) continue;
      if( device.kind === 'videoinput' ){
        videoInputs.push({
          value: device.deviceId, name: device.label,
        });
        // {
        //   "deviceId": "0632f7ccd2348d78810f877dfc47402ecd46b79b3b333a02854a40c0b67c740f",
        //   "kind": "videoinput",
        //   "label": "camera2 1, facing front",
        //   "groupId": "c8e939b22e9696080c0397b9a32dee17dce8f1fba02e77558f2949196251b157"
        // },
      }
    }

    return videoInputs;

  }

  async setUpStream( deviceId=false ){

    const self = this;

    self.video = document.getElementById( self.videoElem );
    self.video.setAttribute('width', `${self.W}px`);
    self.video.setAttribute('height', `${self.H}px`);

    self.canvas = document.getElementById( self.canvasElem );
    self.canvas.setAttribute('width', `${self.W /* *window.devicePixelRatio */}px`);
    self.canvas.setAttribute('height', `${self.H /* *window.devicePixelRatio */}px`);
    self.ctx = self.canvas.getContext('2d');
    self.ctx.width = self.W;
    self.ctx.height = self.H;

    const streamRes = await self.getMediaDeviceById( deviceId );

    if( !streamRes.success ){
      alert( streamRes.message );

      return;

      // user static Image as "video input"

      self.video = new Image();
      // video.crossOrigin = "Anonymous";
      self.video.setAttribute('crossOrigin', '');
      self.video.src = `./ph-samples/photo_2020-07-25_18-07-39.jpg?v=${ Date.now() }`;

    }else{
      self.video.srcObject = streamRes.data;
      // console.log({streamRes: streamRes.data});
      console.log( self.video );
      self.video.play();
    }

    self._closeAlertBox();
    self.processVideoStrem();

  } 

  processVideoStrem(){

    const self = this;

    try{

      self.canvasClear();

      // self.DPI = 2;
      // self.DPI = window.devicePixelRatio;

      // self.drawImage(self.video, 0, 0, self.W *self.DPI, self.H );
      self.drawImage(self.video, 0, 0, self.W, self.H );

      self.DPI = 2;

      const W = (self.W /* *self.DPI */);
      // const W = (self.W *self.DPI);
      const W2 = Math.floor(W/2);

      const H = (self.H /* *self.DPI */);
      // const H = (self.H *self.DPI );
      const H2 = Math.floor(H/2);

      const MLS = 30;
      const box_x = W /MLS;
      const box_h = H /(MLS * (H/W) );

      const FX = (W2 -(box_x*1));
      const FY = (H2 -(box_h*1)) - 140;

      const TX = (box_x*2);
      const TY = (box_h*2);

      let destClr = '#F00';

      const raw_RGBA = self.ctx.getImageData(0, 0, self.W /* *self.DPI*/, self.H);

      var CX = window.innerWidth /2;
      var CY = window.innerHeight /2;

      const RGBA = self.getPixValue(raw_RGBA, CX, CY, 'toArray' );
      // const RGBA = self.getPixValue(raw_RGBA, CX, CY, 'toArray' );

      const hexColor = chroma([ RGBA[0], RGBA[1], RGBA[2], ]).hex();

      const phData = self.calcPHByColor( hexColor );
      self._appendData( phData );
      const phAvgData = self.getAvgPHLevel();

      self.ctx.putImageData(raw_RGBA, 0, 0);

      self.drawRect( 0, 0/*35*/, self.W, ((65/3)*8) +(35), 'transparent','rgba(0,0,0, 140)', 2);

      self.drawRect( 10, 10, 200, 10, '#fff', hexColor, 2);

      self.drawRect( CX-10, CY-10, TX, TY, '#0F0', 'transparent', 2);

      self.drawInfoText( ` Main data:`, '#fff' );
      self.drawInfoText( `   ph    : ${phData.ph}`, '#fff' );
      self.drawInfoText( `   color : ${phData.color}`, '#fff' );
      self.drawInfoText( `   delta : ${ +(phData.delta).toFixed(3) }`, '#fff' );
      self.drawInfoText( ` Avg data:`, '#fff' );
      self.drawInfoText( `   ph    : ${+(phAvgData.ph).toFixed(3)}`, '#fff' );
      self.drawInfoText( `   delta : ${ +(phAvgData.delta).toFixed(3) }`, '#fff' );
      self.drawInfoText( `   rec's : ${phAvgData.records}`, '#fff' );

      // self.drawRect( 50, 10, 300, 20, '#fff', destClr, 2);

    }catch(e){
      alert(e.message);            
    }

    setTimeout(()=>{ self.processVideoStrem(); }, self.FPS_delay);

  }

  getPixValue( buffer, x, y, toArray=false ){
    const CW = window.innerWidth;
    const CH = window.innerHeight;
    const R = +(buffer.data[((CW * y) + x) * 4 + 0]);
    const G = +(buffer.data[((CW * y) + x) * 4 + 1]);
    const B = +(buffer.data[((CW * y) + x) * 4 + 2]);
    const A = +(buffer.data[((CW * y) + x) * 4 + 3]);
    return toArray ? [R, G, B, A] : { R, G, B, A };
  }

  // ------------------------------------------------------------
  // PH(s)


  getColorDelta( c0, c1 ){
    const delta = chroma.deltaE( c0, c1 );
    return { c0, c1, delta };
  }

  calcPHByColor( input ){

    let maxDelta = 1000000;
    let result = {
      ph: 0,
      color: input,
      delta: 0,
    };

    for( const ph of Object.keys(CS) ){
    
      const testColor = CS[ ph ];
      const delta = this.getColorDelta( input, testColor ); 

      if( delta.delta < maxDelta ){
        maxDelta = delta.delta;
        result.ph = ph;
        result.delta = delta.delta;
      }
    }

    return result;

  }

  // ------------------------------------------------------------
  // canvas draw

  canvasClear( toColor=true ){ 

    // this.ctx.globalCompositeOperation = 'destination-out';
    // this.ctx.globalCompositeOperation = 'source-over';
    this.clearInfoTextIndex();
    this.ctx.clearRect( 0, 0, this.W, this.H );
    // this.drawRect( 0, 0, this.W, this.H, '#999', '#999', 1 );

  }

  clearInfoTextIndex(){ this.textIndex = 0; }

  drawArc( x0, y0, R, start, end, clr='#f00' ){
    this.ctx.beginPath();
    this.ctx.moveTo( x0, y0 );
    this.ctx.arc( x0, y0, (R || 5), (start || 0), ( end || (2*Math.PI) ));
    // this.ctx.closePath();
    this.ctx.fillStyle = clr;
    this.ctx.fill();
  }

  drawLine( x0, y0, x1, y1, clr, w ){
    this.ctx.beginPath();
    this.ctx.strokeStyle = clr || '#F00';
    this.ctx.lineWidth = (w || 1);
    this.ctx.fillStyle = "rgb(0,255,0)" ;
    this.ctx.moveTo( x0, y0 );
    this.ctx.lineTo( x1, y1 );
    this.ctx.stroke();
  }

  drawRect( x0, y0, w, h, fgColor, bgColor, lw=1 ){
    this.ctx.beginPath();
    this.ctx.strokeStyle = fgColor || '#F00';
    this.ctx.fillStyle = bgColor || 'rgb(0,0,0,0)';
    this.ctx.lineWidth = (+lw);
    this.ctx.rect( x0, y0, w, h);
    this.ctx.stroke();
    this.ctx.fill();
  }

  drawImage( image, sx, sy, sw, sh, dx=null, dy=null, dw=null, dh=null ){
    try{
      if( !image ) return;
      if( dx && dy && dw && dh ){
        this.ctx.drawImage( image, sx, sy, sw, sh, dx, dy, dw, dh );
      }else{
        this.ctx.drawImage( image, sx, sy, sw, sh );
      }
    }catch(e){
      // _alert(e.message);
      // console.log( e );
    }
  }

  drawText( string, x0, y0, clr, size, font='monospace' ){
    this.ctx.font = `${ size || '16' }px ${ font }`;
    this.ctx.fillStyle = clr || '#F00';
    this.ctx.fillText( string, x0, y0 );
  }


  drawInfoText( string, clr, size=16, font='monospace' ){
    size = size || this.fontSize;
    this.ctx.font = `${ size }px ${ font }`;
    this.ctx.fillStyle = clr || '#F00';
    // this.ctx.fillText( string, 20, 30+ ((size+2) * this.textIndex));
    this.ctx.fillText( string, 10, 55+ ((size+2) * this.textIndex));
    this.textIndex++;
  }

} 
