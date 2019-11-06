window.addEventListener('load', function () {

    $('.auto-copy').on('click', function(){

        let data_to_copy = $(this).attr('data-auto-copy');

        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val( data_to_copy ).select();
        document.execCommand("copy");
        $temp.remove();

        if( typeof __success != "undefined" ){
            __success(' Сopied ... ');
        }else if( typeof alertify  != "undefined" ){
            alertify.success(' Сopied ... ');

        }

    });


    $('pre code').each(function(i, block) { hljs.highlightBlock( block ); });

});


function parseLinks( raw_text ){

    try{

        let reg = new RegExp(/((http|https){1}\:\/\/[a-z-A-Z0-9\_\-\&\?\=\%\/\.]*){1}/g);
        let res = reg.exec( raw_text );
        if( res.length >= 1 )
            raw_text = raw_text.replace( res[0], '<a target="_blank" href="'+res[0]+'">'+res[0]+'</a>' );

    }catch(e){}
    return raw_text;

}

function getQuery( name=false ){

    const data = {};

    location.search.replace('?','').trim().split('&').map((pair)=>{ 
        const P = pair.split('='); 
        data[ P[0] ] = P[1];
    })

    return name ? data[ name ] : data;

}

function __post( _url, _data, cb ){

    try{

        mkWait('show');
        $.ajax({
            url  : _url,
            data : _data,
            type : 'post',
            success : function(json_t){
                mkWait('hide');
                cb(json_t);
            },
            error: function(a,b, error){
                mkWait('hide');
                console.log( 'error:', error );
                cb({code: 500, 'msg': error, data:null});
            }
        });

    }catch(e){
        cb({code: 500, 'msg': error, data:null});
        mkWait('hide');

    }

}


