// https://www.orange.k12.nj.us/cms/lib/NJ01000601/Centricity/Domain/15/Universal_Gravitation_v_1-1.3.pdf

const Info = {
    sun: {
        r: 695508, // Km
        m: 1.9891 * Math.pow(10, 30), // 1.9891 × 10^30
        v: 0,
        dist_to_sun: 0, // Km
    },
    earth:{
        r: 6371, // Km
        m: 5.9736 * Math.pow(10, 24), // 5,9736 × 10^24 => NASA Data =>  5.97 x 10^24
        v: 0,
        dist_to_sun: 1496e5, // 149.6M Km
    },
    moon: {
        r: 1737, // Km
        m: 7.3477 * Math.pow(10,22), // 7,3477 × 10^22 => NASA Data => 7.3 x 10^22 kg
        v: 0,
        dist_to_earth: 384400, // +- 384400 Km => NASA Data => 3.84 x 10^8 m
        dist_to_sun: 1496e5, //
    },
    mars:{
        r: 3390, // Km
        m: 6.4171 * Math.pow(10,23), // 6.4171 × 10^23
        v: 0,
        dist_to_sun: 230e6, // Km
    },
    jupiter:{
        r: 69911, // Km
        m: 1.8982 * Math.pow(10,27), // 1.8982 × 10^27
        v: 0,
        dist_to_sun: 778e6, // Km
    },
    saturn:{
        r: 58232, // Km
        m: 5.6834 * Math.pow(10,26), // 5.6834 × 10^26
        v: 0,
        dist_to_sun: 14e8, // 1.4B Km
    },

}

let W               = 0;
let H               = 0;
let ctrl_panel      = null;
let canvas          = null;

const G_CONST       = (6.67 * Math.pow(10, -11 )); //  Nm2/kg2, // G == gravitational constant
const S_CONST       = 1e6;
const V_CONST       = (4/3) * Math.PI;
const _4xPI         = (4*Math.PI);
const _1_3          = (1/3);
const SCALE_CONST   = 0.0001; // 0.0002;

function getByID(id){ return document.getElementById( id ); }
function randInt(min, max){ return Math.floor( Math.random() * (max - min + 1)) + min; }
function randFloat(min, max){ return (Math.random() * (max - min + 0.001)) + min; }
function fix( val, upto ){ return ( (+val).toFixed( (+upto) || 4 ) ); }

function randVec(){

    let v_x = randFloat(0, 1000) / 1000;
    let v_y = randFloat(0, 1000) / 1000;

    return {
        x: randInt(0, 50) > 50 ? v_x*-1 : v_x,
        y: randInt(0, 50) > 50 ? v_y*-1 : v_y,
    };
}

function getVolumeByDiameter( D ){

    //       4
    // V = ----- PI r^3
    //       3
    return V_CONST * Math.pow( D/2, 3 );

}

function getRadiusByVolume( V ){
    return Math.pow(((3 * V) / _4xPI), _1_3 );
}

function getNewDiameter( obj_A, obj_B ){
    let v0 = getVolumeByDiameter( obj_A.D );
    let v1 = getVolumeByDiameter( obj_B.D );
    return getRadiusByVolume(v0 +v1) *2;
}

function getObjectsDist( obj_A, obj_B ){
    let a = obj_A.p_x - obj_B.p_x;
    let b = obj_A.p_y - obj_B.p_y;
    return Math.sqrt( a*a + b*b );
}

function getAttractionForce( obj_A, obj_B ){

    // [Gravitational Field]
    //          m1
    // g = G ------ == m/s^2
    //         r^2

    //         m1 m2
    // F = G ---------
    //          r^2

    //           earth.m * moon.m                       (5,9736 × 10^24) (7,3477 × 10^22)
    // F = G ------------------------- == G:(6.67e-11) ------------------------------------- == 197133565266927030000
    //        moon.dist_to_earth ^ 2                              ( 3.84 × 10^8 )^2


    let m123 = G_CONST * obj_A.M * obj_B.M;
    let r = Math.pow( obj_A.p_x -obj_B.p_x, 2 ) + Math.pow( obj_A.p_y -obj_B.p_y, 2 );
    return m123 / r; // Simulation
    // return m123 / Math.pow( r, 2 ); // << Real

}

// let G    = (6.67 * Math.pow(10, -11 )); // Nm2/kg2, // G == gravitational constant
// let m0_0 = (5.97 * Math.pow(10,24)); 
// let m0_1 = (7.3 * Math.pow(10,22)); 
// console.log(' Eart to moon: ['+( (G * m0_0 * m0_1) / Math.pow( (3.84 * Math.pow(10,8)), 2  ) )+']'); // << r == Meters
// >>> 197133565266927030000


function getObjJoules( obj_A ){
    let x = 1/2 * obj_A.M * Math.pow( obj_A.a_x, 2 );
    let y = 1/2 * obj_A.M * Math.pow( obj_A.a_y, 2 );
    return { x, y };
}

function getMassToAccel( M, a_x ){
    return a_x;
    // return (a_x / M); // 4.45 / 1e6 * 1000

}

window.addEventListener('resize', function(e){
    W = window.innerWidth;
    H = window.innerHeight;
    ctrl_panel.style.marginTop = (H- 42)+'px';
    canvas.setAttribute('width', W+'px');
    canvas.setAttribute('height', H+'px');
});

window.addEventListener('load', function(e){
    W = window.innerWidth;
    H = window.innerHeight;
    ctrl_panel = getByID('ctrl-panel-bottom');
    canvas = getByID('canvas');
    ctrl_panel.style.marginTop = (H- 42)+'px';
    canvas.setAttribute('width', W+'px');
    canvas.setAttribute('height', H+'px');

    let mSimul = Simulation({ G: G_CONST });

});

let collors = ['#cd6155','#9b59b6','#5499c7','#5dade2','#48c9b0','#f4d03f','#f5b041','#eb984e',];
let collor_index = 0;

function getNextColor(){

    if( (++collor_index)+1 >= collors.length ){
        collor_index = 0;
    }

    return collors[ collor_index ];

}


function Simulation( P ){

    // var W               = 1366;
    // var H               = 768;
    var CW                  = W / 2;
    var CH                  = H / 2;
    var GLOB_X              = CW;
    var GLOB_Y              = CH;
    var Objs                = [];
    var currFrame           = 0;

    // var canvas              = getByID( "canvas" );
    var canvasOffset_x      = canvas.offsetLeft;
    var canvasOffset_y      = canvas.offsetTop;
    var dragOffset_x        = 0;
    var dragOffset_y        = 0;

    let mouseDown_x         = 0;
    let mouseDown_y         = 0;
    let mouseUp_x           = 0;
    let mouseUp_y           = 0;
    let mouseCurrent_x      = 0;
    let mouseCurrent_y      = 0;

    let mouseCurrentAbs_x   = 0;
    let mouseCurrentAbs_y   = 0;
    let mouseCurrentRel_x   = 0;
    let mouseCurrentRel_y   = 0;

    var isMouseDown         = false;
    var isDragSelected      = true;
    var simulate            = false;
    var textIndex           = 0; 
    var timeout_t           = null;

    let objSelectMax_x      = 100;
    let objSelectMax_y      = 100;


    var frameRate           = 1000 / 60;  //62.5; // 62.5 == 16 frames / sec
    var followCenterOfMass  = true;
    var forceMultiplier     = 1;
    let curr_common_CM_x    = 0;
    let curr_common_CM_y    = 0;

    var drawCenterOfMass    = true;
    var drawObjectLines     = false;
    var drawObjectInfoData  = false;
    var drawObjectTail      = false;

    let followObject        = false;

    var ctx                 = canvas.getContext("2d");
    ctx.lineWidth           = 2;
    ctx.fillStyle           = "#F00";
    ctx.strokeStyle         = "#F00";

    let br_data = [];

    var mObject = function( P ){

        this.M          = P.M;
        this.D          = this.M /1e4;

        this.a_x        = P.a_x || 0.00000000001;
        this.a_y        = P.a_y || 0.00000000001;
        this.p_x        = P.p_x || 0.00000000001;
        this.p_y        = P.p_y || 0.00000000001;
        this.F          = P.F || 0.00000000001;

        // p_x => delta => frames/s
        this.d_x        = 0;
        this.d_y        = 0;

        this.clr        = P.clr || getNextColor(); // collors[ randInt( 0, collors.length-1 ) ],
        this.del        = false;
        this.tail       = [];
        this.selected   = false;
        // this.tail_crl   = this.clr; // randInt( 0, collors.length-1 );
        return this;
    };

    var newObject = { D: 10, clr: 'rgba(255,180,0)', M: 10 };

    let fpsRateInput = getByID('fps-rate-input');
    fpsRateInput.value = parseInt(frameRate);
    fpsRateInput.addEventListener('input', function(){
        frameRate = 1000 /(+this.value);
    });

    $('#move-to-center-of-mass').on('click', function(){
        GLOB_X = curr_common_CM_x+(W/2);
        GLOB_Y = curr_common_CM_y+(H/2);
    });

    $('#force-multiplier').on('input', function(){
        forceMultiplier = +$(this).val().trim().replace(',','.');
    });

    $('#force-multiplier').val( forceMultiplier );


    $('.create-new-system').on('click', function(){

        if( confirm('Create new ? All unsaved data will be lost') ){
            $('#start-stop-btn').trigger('click');
            Objs = [];
            GLOB_X = CW;
            GLOB_Y = CH;
        }

    });

    $('.follow-center-of-mass').on('click', function(){
        followCenterOfMass = !followCenterOfMass;
        followCenterOfMass ? $(this).addClass('btn-success').removeClass('btn-danger') : $(this).removeClass('btn-success').addClass('btn-danger');
        followObject = followCenterOfMass ? false : followObject;
        $('#move-to-center-of-mass').trigger('click');

    });

    $('.show-info-type').on('click', function(){

        let v = null;

        switch( $(this).attr('data-type') ){
            case 'obj-tail': drawObjectTail = !drawObjectTail; v = drawObjectTail; break; 
            case 'obj-info': drawObjectInfoData = !drawObjectInfoData; v = drawObjectInfoData; break; 
            case 'obj-lines': drawObjectLines = !drawObjectLines; v = drawObjectLines; break; 
            case 'obj-center-of-mass': drawCenterOfMass = !drawCenterOfMass; v = drawCenterOfMass; break; 
        }

        v ? $(this).addClass('btn-success').removeClass('btn-danger') : $(this).removeClass('btn-success').addClass('btn-danger');

    });

    $('.tool-btn').on('click', function(){
        $('.tool-btn').each(function(){ $(this).removeClass('btn-success').addClass('btn-danger'); });
        $(this).addClass('btn-success').removeClass('btn-danger');
        isDragSelected = $(this).attr('data-type') == 'drag' ? true : false;

        canvas.style.cursor = isDragSelected ? 'grab' : 'crosshair';

    });

    $('#start-stop-btn').on('click', function(){

        simulate = !simulate;

        $(this)
            .addClass( !simulate ? 'btn-success' : 'btn-danger' )
            .removeClass( simulate ? 'btn-success' : 'btn-danger' )
            .text( simulate ? 'Pause' : 'Start' );

        if( simulate ) loop();

    });

    function STOP(){ simulate = false; }
    function START(){ simulate = true; loop(); }

    canvas.addEventListener('mousedown', function( e ){
        isMouseDown = true;
        mouseDown_x = CW - (e.clientX - canvasOffset_x);
        mouseDown_y = CH - (e.clientY - canvasOffset_y);
    });

    canvas.addEventListener('mousemove', function( e ){

        mouseCurrentAbs_x = (e.clientX - canvasOffset_x);
        mouseCurrentAbs_y = (e.clientY - canvasOffset_x);

        mouseCurrentRel_x = (GLOB_X -mouseCurrentAbs_x) -dragOffset_x;
        mouseCurrentRel_y = (GLOB_Y -mouseCurrentAbs_y) -dragOffset_y;

        mouseCurrent_x = CW -mouseCurrentAbs_x;
        mouseCurrent_y = CH -mouseCurrentAbs_y;

        if( isDragSelected )
            drawABSCenterRect( mouseCurrentAbs_x, mouseCurrentAbs_y, objSelectMax_x, objSelectMax_y, '#0F0' );

        if( isMouseDown && isDragSelected ){
            dragOffset_x = -(mouseDown_x - mouseCurrent_x);
            dragOffset_y = -(mouseDown_y - mouseCurrent_y);
        }

    });

    canvas.addEventListener('mouseup', function( e ){

        isMouseDown = false;

        mouseUp_x = CW - (e.clientX - canvasOffset_x);
        mouseUp_y = CH - (e.clientY - canvasOffset_y);

        if( isDragSelected ){
            GLOB_X -= dragOffset_x;
            GLOB_Y -= dragOffset_y;

            for( let i in Objs ){
                if( isInSelectArea( Objs[ i ] ) ){
                    Objs[ i ].selected = !Objs[ i ].selected;
                    followObject = Objs[ i ].selected ? Objs[ i ] : false;
                    followCenterOfMass = false;
                }
            }

        }else{

            aX = (mouseUp_x - mouseDown_x) * 0.01;
            aY = (mouseUp_y - mouseDown_y) * 0.01;

            let _M = ( +getByID('custom-M').value );

            if( !_M ) return;

            Objs.push( new mObject({ 
                M    : _M,
                a_x  : aX, 
                a_y  : aY, 
                p_x  : ( mouseDown_x - (CW-GLOB_X) ),
                p_y  : ( mouseDown_y - (CH-GLOB_Y) ), 
            }));

        }

        dragOffset_x = 0;
        dragOffset_y = 0;

    });

    // ----------------------------------------------------------------
    let BOUNDS = 0.75;

    // generate dust 
    for (var i=0; i<0; i++) {

        let vec = randVec();

        Objs.push( new mObject({ 
            M    : 1000,
            F    : 0, 
            a_x  : vec.x *0.75,
            a_y  : vec.y *0.75,
            p_x  : (-CW *BOUNDS) + randFloat( 0, W *BOUNDS ), 
            p_y  : (-CH *BOUNDS) + randFloat( 0, W *BOUNDS ), 
        }));
    }

    // Test
    // Binary == 
    // Objs.push( new mObject({ M: 7e5, a_x: 0, a_y: -4, p_x: -100, p_y: 0 }));
    // Objs.push( new mObject({ M: 7e5, a_x: 0, a_y: 4, p_x: 100, p_y: -0 }));

    // Binary [!=] => 1 
    // Objs.push( new mObject({ M: 7e5, a_x: 0, a_y: 0, p_x: 0, p_y: 0 }));
    // Objs.push( new mObject({ M: 1e5, a_x: 0, a_y: 5.8, p_x: 350, p_y: 0 }));

    const SHIFT_X = 0;
    const SHIFT_Y = 0;

    // Binary [!=] => 2 
    Objs.push( new mObject({ M: 7e5, a_x: 0 +SHIFT_X, a_y: 0 +SHIFT_Y, p_x: 0, p_y: 0 }));
    Objs.push( new mObject({ M: 1e5, a_x: 0 +SHIFT_X, a_y: 5.8 +SHIFT_X, p_x: 350, p_y: 0 }));

    // ----------------------------------------------------------------

    function loop(){

        clearTimeout( timeout_t );
        clear();
        clearTextIndex();
        drawGridInfo();

        if( simulate ){

            let valid_objects = [];

            for( var ci=0; ci< Objs.length; ci++ ){

                if( Objs[ ci ].del ) continue;

                valid_objects.push( Objs[ ci ] );

                for( var oi=0; oi< Objs.length; oi++ ){

                    if( ci == oi ) continue;
                    if( Objs[ oi ].del ) continue;
                    if( Objs[ ci ].del ) continue;

                    let dist_t = getObjectsDist( Objs[ oi ], Objs[ ci ] );
                    let coll_dist_t = ( Objs[ oi ].D + Objs[ ci ].D );

                    // Collision and vectors
                    if( dist_t <= coll_dist_t ){

                        // let ci_j = getObjJoules( Objs[ ci ] );
                        // let oi_j = getObjJoules( Objs[ oi ] );

                        if( Objs[ ci ].M >= Objs[ oi ].M ){

                            // let a_dx = Objs[ oi ].a_x* (oi_j.x / ci_j.x);
                            // let a_dy = Objs[ oi ].a_y* (oi_j.y / ci_j.y);
                            // let a_dx = ( Objs[ ci ].a_x - Objs[ oi ].a_x ) * (ci_j.x / oi_j.x);
                            // let a_dy = ( Objs[ ci ].a_y - Objs[ oi ].a_y ) * (ci_j.y / oi_j.y);

                            Objs[ ci ].a_x += Objs[ oi ].a_x * ( Objs[ oi ].M / Objs[ ci ].M ); // * 0.05;
                            Objs[ ci ].a_y += Objs[ oi ].a_y * ( Objs[ oi ].M / Objs[ ci ].M ); // * 0.05;

                            Objs[ ci ].M += Objs[ oi ].M;
                            Objs[ ci ].D = getNewDiameter( Objs[ oi ], Objs[ ci ] );
                            Objs[ oi ].del = true;     

                        }else{

                            Objs[ oi ].a_x += Objs[ ci ].a_x * ( Objs[ ci ].M / Objs[ oi ].M ); // * 0.05;
                            Objs[ oi ].a_y += Objs[ ci ].a_y * ( Objs[ ci ].M / Objs[ oi ].M ); // * 0.05;

                            Objs[ oi ].M += Objs[ ci ].M;
                            Objs[ oi ].D = getNewDiameter( Objs[ ci ], Objs[ oi ] );
                            Objs[ ci ].del = true;     

                        }

                    }else{

                        let Force = getAttractionForce( Objs[ ci ], Objs[ oi ] ) * forceMultiplier;
                        let mass_diff_coef = Objs[ oi ].M / Objs[ ci ].M;

                        Objs[ ci ].d_x = ( Objs[ oi ].p_x - Objs[ ci ].p_x ) *Force *mass_diff_coef; // * Objs[ oi ].M;
                        Objs[ ci ].d_y = ( Objs[ oi ].p_y - Objs[ ci ].p_y ) *Force *mass_diff_coef; // * Objs[ oi ].M; 

                        Objs[ ci ].a_x += Objs[ ci ].d_x; // * 0.05;
                        Objs[ ci ].a_y += Objs[ ci ].d_y; // * 0.05;

                    }

                }

            }

            Objs = valid_objects;

        }

        let largest_M = 0;
        let largest_D = 0;

        let common_M  = 0;
        let common_MR_x = 0;
        let common_MR_y = 0;
        let common_CM_x = 0;
        let common_CM_y = 0;

        for( var i0=0; i0<Objs.length; i0++ ){
            common_M  += Objs[ i0 ].M;
            common_MR_x += (Objs[ i0 ].M * Objs[ i0 ].p_x);
            common_MR_y += (Objs[ i0 ].M * Objs[ i0 ].p_y);
        }

        common_CM_x = 1 / common_M * common_MR_x;
        common_CM_y = 1 / common_M * common_MR_y;

        let common_CM_diff_x = common_CM_x - curr_common_CM_x;
        let common_CM_diff_y = common_CM_y - curr_common_CM_y;

        curr_common_CM_x = common_CM_x;
        curr_common_CM_y = common_CM_y;

        if( simulate ) currFrame++;

        for( var i=0; i<Objs.length; i++ ){

            if( !Objs[ i ].del ){

                if( simulate ){ // Apply forces

                    Objs[ i ].p_x += Objs[ i ].a_x;
                    Objs[ i ].p_y += Objs[ i ].a_y;

                    // Line-Tail
                    if( drawObjectTail ){

                        Objs[ i ].tail.push({ p_x: Objs[ i ].p_x, p_y: Objs[ i ].p_y });
                        if( Objs[ i ].tail.length > 100 ) Objs[ i ].tail.shift();
                        
                        for( let tail_i=0; tail_i < Objs[ i ].tail.length-1; tail_i++ )
                            drawRELLine( 
                                Objs[ i ].tail[ tail_i ].p_x, 
                                Objs[ i ].tail[ tail_i ].p_y, 
                                Objs[ i ].tail[ tail_i+1 ].p_x, 
                                Objs[ i ].tail[ tail_i+1 ].p_y, 
                                1, Objs[ i ].clr
                            );
                    }else{ Objs[ i ].tail = []; }

                }else{
                    // [Pause] View mode
                }

                largest_M = Objs[ i ].M > largest_M ? Objs[ i ].M : largest_M;
                largest_D = Objs[ i ].D > largest_D ? Objs[ i ].D : largest_D;

                drawObject( Objs[i], i );
                drawObjectField( Objs[i], i );

                if( drawObjectInfoData || Objs[i].hovered || Objs[i].selected ) drawObjectInfo( Objs[ i ] );
            
            }

        }

        // last Doble loop 

        if( simulate ){

            for( var ci=0; ci< Objs.length; ci++ ){
                if( Objs[ ci ].del ) continue;

                for( var oi=0; oi< Objs.length; oi++ ){
                    if( ci == oi ) continue;
                    if( Objs[ ci ].del ) continue;

                    // Connection lines
                    if( drawObjectLines ){
                        drawRELLine( Objs[ ci ].p_x, Objs[ ci ].p_y, Objs[ oi ].p_x, Objs[ oi ].p_y, 1, '#0F0' );
                        let c_of_x = (Objs[ ci ].p_x +Objs[ oi ].p_x)/2;
                        let c_of_y = (Objs[ ci ].p_y +Objs[ oi ].p_y)/2;
                        let dist = getObjectsDist(Objs[ ci ], Objs[ oi ]);
                        drawRELLCros( c_of_x, c_of_y, 10, 1, '#fff' );
                        drawText( c_of_x+10, c_of_y+10, 'Dist: '+fix( dist, 2 ), '#FFF' );

                    }

                }
                
            }

            // Draw center of mass
            drawRELLCros( common_CM_x, common_CM_y, 20, 2, '#0F0' );
            drawObject( {p_x: common_CM_x, p_y: common_CM_y, D:4, M:10000, clr: '#F00' } );
            drawText( common_CM_x+10, common_CM_y+10, 'COM: x/y '+fix( common_CM_x, 2 )+'/'+fix( common_CM_y, 2 ), '#FFF' );

        } // simulate

        if( simulate ){

            if( followCenterOfMass && common_CM_diff_x && common_CM_diff_y ){
                GLOB_X += common_CM_diff_x;
                GLOB_Y += common_CM_diff_y;
            }else if( followObject ){
                GLOB_X += followObject.a_x;
                GLOB_Y += followObject.a_y;
            }

        }

        if( isMouseDown ){
            if( !isDragSelected ){
                drawMouseLine( (mouseDown_x), mouseDown_y, (mouseCurrent_x), mouseCurrent_y );
                drawDot( (mouseDown_x), mouseDown_y, 10 );
                drawDot( (mouseCurrent_x), mouseCurrent_y, 10 );
            }
        }

        toScreen( ' curr. frame  : [ '+(currFrame)+' ]' );
        toScreen( ' total-objs.  : [ '+Objs.length+' ]');
        toScreen( ' common M x/y : [ '+fix(common_CM_x)+'/'+fix(common_CM_y)+' ]');
        // toScreen( ' dx-Mass x/y  : [ '+( fix(common_CM_diff_x)+'/'+fix(common_CM_diff_y) )+' ]');
        toScreen( ' largest [D]  : [ '+fix(largest_D)+' ]');
        toScreen( ' largest [M]  : [ '+fix(largest_M)+' ]');
        toScreen( ' total   [M]  : [ '+fix(common_M)+' ]');
        toScreen( ' frame rate   : [ '+(1000/frameRate).toFixed(2)+' ]');

        timeout_t = setTimeout( ()=>{ loop(); }, frameRate );

    }

    loop();

    // ----------------------------------------------------------------
    // export / import

    function download( data ) {

        let type = 'application/json';
        let num = localStorage.getItem('univers.numver');
            num = num ? (+num)+1 : 0;
        let name =  'univers-'+( num )+'.json';
        localStorage.setItem('univers.numver', num);

        var workElement = document.createElement("a");
        if ('download' in workElement) {
            workElement.href = "data:" + type + "charset=utf-8," + escape(data);
            workElement.setAttribute("download", name);
            document.body.appendChild(workElement);
            var eventMouse = document.createEvent("MouseEvents");
            eventMouse.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            workElement.dispatchEvent(eventMouse);
            document.body.removeChild(workElement);
        }

    }

    $("#import-json-file").change(function(){
        if (this.files && this.files[0]) {
            let reader = new FileReader();
            reader.onload = function (e) { 

                try{

                    let json_t = JSON.parse( atob(e.target.result.split(',')[1]) );

                    if( json_t.objects.length > 0 ){

                        frameRate = +json_t.settings.frameRate;
                        followCenterOfMass = +json_t.settings.followCenterOfMass;
                        drawCenterOfMass = +json_t.settings.drawCenterOfMass;
                        drawObjectLines = +json_t.settings.drawObjectLines;
                        drawObjectInfoData = +json_t.settings.drawObjectInfoData;
                        drawObjectTail = +json_t.settings.drawObjectTail;
                        GLOB_X = +json_t.settings.GLOB_X;
                        GLOB_Y = +json_t.settings.GLOB_Y;

                        forceMultiplier = +json_t.settings.forceMultiplier;
                        $('#force-multiplier').val( forceMultiplier );

                        Objs = [];

                        for( let i in json_t.objects ){
                            Objs.push( new mObject({
                                M   : json_t.objects[ i ].M,
                                D   : json_t.objects[ i ].D,
                                a_x : json_t.objects[ i ].a_x,
                                a_y : json_t.objects[ i ].a_y,
                                p_x : json_t.objects[ i ].p_x,
                                p_y : json_t.objects[ i ].p_y,
                                F   : json_t.objects[ i ].F,
                                d_x : json_t.objects[ i ].d_x,
                                d_y : json_t.objects[ i ].d_y,
                                clr : json_t.objects[ i ].clr,
                            }));

                        }

                        setTimeout(function(){ $('#move-to-center-of-mass').trigger('click'); }, 10 );
                        setTimeout(function(){ $('#move-to-center-of-mass').trigger('click'); }, 100 );
                        setTimeout(function(){ $('#move-to-center-of-mass').trigger('click'); }, 500 );
                        setTimeout(function(){ $('#move-to-center-of-mass').trigger('click'); }, 1000 );

                    }

                }catch(e){
                    alert(' Error on parsing imported data');
                }

            }
            reader.readAsDataURL(this.files[0]);
        }
    });


    $('.import-json').on('click', function(){
        simulate = true;
        $('#start-stop-btn').trigger('click');
        $('#import-json-file').trigger('click');
    });

    $('.export-json').on('click', function(){

        simulate = true;
        $('#start-stop-btn').trigger('click');

        let json_t = {

            settings: {
                frameRate, 
                drawObjectLines, 
                drawObjectInfoData, 
                followCenterOfMass, 
                forceMultiplier, 
                drawCenterOfMass,
                GLOB_X, 
                GLOB_Y,
            },
            objects: [],
        };

        for( let i in Objs ){

            json_t.objects.push({
                M   : Objs[ i ].M,
                D   : Objs[ i ].D,
                a_x : Objs[ i ].a_x,
                a_y : Objs[ i ].a_y,
                p_x : Objs[ i ].p_x,
                p_y : Objs[ i ].p_y,
                F   : Objs[ i ].F,
                d_x : Objs[ i ].d_x,
                d_y : Objs[ i ].d_y,
                clr : Objs[ i ].clr,
            });

        }

        // window.open('data:application/json;charset=utf-8,'+JSON.stringify( json_t ));

        download( JSON.stringify( json_t ) );

    });

    // ----------------------------------------------------------------
    function clear(){ 
        ctx.clearRect(0, 0, W, H);
    }

    function drawGridInfo(){

        drawABSRect(0, 0, W, H, '#000');

        // CENTER-CROSS
        drawABSLine( GLOB_X+(dragOffset_x*-1), 0, GLOB_X+(dragOffset_x*-1), H, 1, '#777' ); // H
        drawABSLine( 0, GLOB_Y+(dragOffset_y*-1), W, GLOB_Y+(dragOffset_y*-1), 1, '#777' );

        const GR_MAX   = 10000;
        let GR_STP   = 100;
        let GR_STP_X = -GR_MAX;
        let GR_STP_Y = -GR_MAX;
        let xALL = 0;
        let yALL = 0;

        while( GR_STP_X < GR_MAX ){

            if( GR_STP_X != 0 ){
                xALL = ( GLOB_X+(dragOffset_x*-1) +GR_STP_X );
                yALL = ( GLOB_Y+(dragOffset_y*-1) );
                drawABSLine( xALL, (yALL-20), xALL, (yALL+20), 1, '#07F');
                drawABSText( (xALL+5), (yALL-8), GR_STP_X, '#07F' );
            }

            GR_STP_X += GR_STP;
        }

        xALL = 0;
        yALL = 0;

        while( GR_STP_Y < GR_MAX ){

            if( GR_STP_Y != 0 ){
                xALL = ( GLOB_X+(dragOffset_x*-1) );
                yALL = ( GLOB_Y+(dragOffset_y*-1) +GR_STP_Y );
                drawABSLine( (xALL-20), yALL, (xALL+20), yALL, 1, '#07F');
                drawABSText( (xALL+5), (yALL-8), GR_STP_Y, '#07F' );
            }

            GR_STP_Y += GR_STP;
        }


    }

    function isInSelectArea( obj, i ){

        return (
            mouseCurrentRel_x+ objSelectMax_x > ( obj.p_x ) && mouseCurrentRel_x- objSelectMax_x < ( obj.p_x )  
            && 
            mouseCurrentRel_y+ objSelectMax_y > ( obj.p_y ) && mouseCurrentRel_y- objSelectMax_y < ( obj.p_y )  
        );

    }

    function drawObject( obj, i ){
        ctx.beginPath();

        obj.hovered = false;

        if( isInSelectArea( obj ) || obj.selected ){
            obj.hovered = true;
            ctx.fillStyle   = '#F00';
            ctx.strokeStyle = '#F00';

        }else{
            ctx.fillStyle   = obj.clr || '#222';
            ctx.strokeStyle = obj.clr || '#222';
            
        }

        ctx.arc( (GLOB_X -dragOffset_x -obj.p_x), (GLOB_Y -dragOffset_y -obj.p_y), obj.D, 0, 2*Math.PI);
        ctx.fill();
    }

    function drawObjectField( obj, clr ){
        ctx.beginPath();
        ctx.strokeStyle = ( obj.hovered || obj.selected ? '#F00' : (obj.clr || '#F00') );

        ctx.lineWidth = 1;
        ctx.arc( (GLOB_X- dragOffset_x -obj.p_x), (GLOB_Y -dragOffset_y -obj.p_y), obj.D * 5, 0, 2*Math.PI);
        ctx.stroke();
    }

    function drawRELLObjectField( obj, D, w, clr ){
        ctx.beginPath();
        ctx.strokeStyle = clr || '#F00';  
        ctx.lineWidth = w || 1;
        ctx.arc( (GLOB_X- dragOffset_x -obj.p_x), (GLOB_Y -dragOffset_y -obj.p_y), D, 0, 2*Math.PI);
        ctx.stroke();
    }

    function normilize( obj ){
        return { x: (obj.a_x*50), y: (obj.a_y*50) }
    }

    function drawObjectInfo( obj ){

        let t_y = 0;
        let p_x = obj.p_x;
        let p_y = obj.p_y;

        let norm_v = normilize( obj );

        drawRELLDot( obj.p_x+norm_v.x, obj.p_y+norm_v.y, 7, '#F00' );   
        drawRELLine( obj.p_x, obj.p_y, obj.p_x+norm_v.x, obj.p_y+norm_v.y, 2, '#07F' );

        let joules = getObjJoules( obj );

        let data = {
            'F      :': fix(obj.F, 12),
            'M      :': fix(obj.M, 4),
            'D      :': fix(obj.D, 4),
            'p  x/y :': fix(obj.p_x, 8)+' / '+fix(obj.p_y, 8),
            'dA x/y :': fix(obj.d_x, 8)+' / '+fix(obj.d_y, 8),
            'A  x/y :': fix(obj.a_x, 8)+' / '+fix(obj.a_y, 8),
            'J  x/y :': fix(joules.x)+' / '+fix(joules.y),

        }

        for( let key in data ){
            drawText( p_x-20 -( obj.D/2 ), p_y+t_y, key+' '+data[ key ], '#fff' );
            t_y += 15;
        }

    }

    function drawDot( x0, y0, D, clr ){
        ctx.beginPath();
        ctx.fillStyle = clr || 'rgba(0, 128, 255, 0.8)';
        ctx.arc( CW-x0, CH-y0, (D/2), 0, 2*Math.PI);
        ctx.fill();
    }

    function drawRELLDot( x0, y0, D, clr ){
        ctx.beginPath();
        ctx.fillStyle = clr || 'rgba(0, 128, 255, 0.8)';
        ctx.arc( (GLOB_X-dragOffset_x) -x0, (GLOB_Y-dragOffset_y) -y0, D, 0, 2*Math.PI);
        ctx.fill();
    }

    function drawRELLCros( x0, y0, R, w, clr ){
        drawRELLine( x0 -(R), y0, x0 +(R), y0, w, clr );
        drawRELLine( x0, y0 -(R), x0, y0 +(R), w, clr );
    }

    function drawMouseLine( x0, y0, x1, y1, clr ){
        ctx.beginPath();
        ctx.strokeStyle = clr || 'rgba(255, 128, 0, 1.0)';
        ctx.lineWidth = 1;
        ctx.fillStyle = "rgb(0,255,0)" ;
        ctx.moveTo( CW-x0, CH-y0 );
        ctx.lineTo( CW-x1, CH-y1 );
        ctx.stroke();
    }

    function drawABSLine( x0, y0, x1, y1, w, clr ){
        ctx.beginPath();
        ctx.strokeStyle = clr || 'rgba(255, 128, 0, 1.0)';
        ctx.fillStyle = clr || "rgb(0,255,0)" ;
        ctx.lineWidth = w || 1;
        ctx.moveTo( x0, y0 );
        ctx.lineTo( x1, y1 );
        ctx.stroke();
    }

    function drawRELLine( x0, y0, x1, y1, w, clr ){
        ctx.beginPath();
        ctx.strokeStyle = clr || 'rgba(255, 128, 0, 1.0)';
        ctx.lineWidth = w || 1;
        ctx.moveTo( ( GLOB_X- dragOffset_x )-x0, ( GLOB_Y- dragOffset_y )-y0 );
        ctx.lineTo( ( GLOB_X- dragOffset_x )-x1, ( GLOB_Y- dragOffset_y )-y1 );
        ctx.stroke();
    }

    function drawABSRect( x0, y0, w, h, clr ){
        ctx.fillStyle = clr || '#F0F';
        ctx.fillRect( x0, y0, w, h);
        ctx.stroke();
    }

    function drawABSCenterRect( x0, y0, w, h, clr ){

        ctx.beginPath();
        ctx.strokeStyle = clr || '#F0F';
        ctx.lineWidth = 1;

        ctx.moveTo( x0-( w/2 ), y0-( h/2 ) );
        ctx.lineTo( x0+( w/2 ), y0-( h/2 ) );
        ctx.lineTo( x0+( w/2 ), y0+( h/2 ) );
        ctx.lineTo( x0-( w/2 ), y0+( h/2 ) );
        ctx.lineTo( x0-( w/2 ), y0-( h/2 ) );

        ctx.stroke();
    }

    function drawRELLRect( x0, y0, w, h, clr ){
        ctx.fillStyle = clr || '#F0F';
        ctx.fillRect( ( GLOB_X- dragOffset_x )-x0, ( GLOB_Y- dragOffset_y )-y0, w, h);
        ctx.stroke();
    }

    function drawABSRect( x0, y0, w, h, clr ){
        ctx.fillStyle = clr || 'rgb(255,0,255)';
        ctx.fillRect( x0, y0, w, h );
        ctx.fill();
    }

    function drawText( x0, y0, data, clr ){
        ctx.font = '14px monospace';
        ctx.fillStyle = clr || '#eee';
        ctx.fillText( data, (GLOB_X-(dragOffset_x)-x0) , (GLOB_Y-(dragOffset_y)-y0) );
    }

    function drawABSText( x0, y0, data, clr ){
        ctx.font = '12px monospace';
        ctx.fillStyle = clr || '#eee';
        ctx.fillText( data, x0, y0 );
    }

    function clearTextIndex(){ textIndex = 3; }

    function toScreen( data, clr ){
        ctx.font = '16px monospace';
        ctx.fillStyle = clr || '#ccc';
        ctx.fillText( data, 0, 5+ (18 * textIndex));
        textIndex++;
    }

};

