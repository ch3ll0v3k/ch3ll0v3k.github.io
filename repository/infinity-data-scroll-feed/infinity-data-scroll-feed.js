window.addEventListener('load', function() {

    // const DataBase = [
    //     { title: 'Feet Title', text: 'Feed text', seen_by:1234, created: 12323232323 },
    //     { title: 'Feet Title', text: 'Feed text', seen_by:1234, created: 12323232323 },
    // ];

    const FEED = [
        'lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
        'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
        'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo',
        'consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse',
        'cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non',
        'proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        'et dolore magna aliqua. Ut enim ad minim veniam tempor incididunt ut labore',
    ];


    let timeout_t = null;
    let amount_feeds_to_fetch = 4;
    let global_feed_counter = 3;
    let wrapper = document.getElementById('wrapper');
    let feed_indicator = document.getElementById('update-feed-indicator');
    let main_feed_data_wrapper = document.getElementById('main-feed-data-wrapper');

    screen.availHeight; // SW: Height
    window.innerHeight; // HW: Height

    window.scrollY; // Scrolled from top

    function randInt(min, max){ return Math.floor( Math.random() * (max - min + 1)) + min; }
    function randDate(){ return randInt(1,12)+'-'+randInt(1,31)+'-'+randInt(2000,2021); }
    function randFeedText(){

        let feed_data = '';
        for( let i=0; i < randInt( 2, 12 ); i++ )
            feed_data += FEED[ randInt( 0, FEED.length-1) ]+'. ';

        return feed_data;
    }


    function randFeedImage(){

        let img_i = randInt(0, 35);

        if( img_i <= 26 )
            // return '<img class="body-img body-img-left" src="'+( location.host )+'/repository/infinity-data-scroll-feed/feed-data/imgs/'+img_i+'.jpg"/>';
            return '<img class="body-img '+(randInt(0, 100) >= 50 ? 'body-img-left' : 'body-img-right')+'" src="./feed-data/imgs/'+img_i+'.jpg"/><br/><br/>';

        return '';

    }

    window.addEventListener('scroll', function(){

        // console.log({
        //     scrollY: scrollY, 
        //     SW_H: screen.availHeight, 
        //     R_m: ( screen.availHeight -scrollY ),
        //     R_0: ( screen.availHeight ),
        //     R_p: ( screen.availHeight +scrollY ),
        //     B: document.body.scrollHeight,
        //     B_m: document.body.scrollHeight -scrollY,
        //     B_p: document.body.scrollHeight +scrollY,
        // });

        if( ( screen.availHeight +scrollY ) >= document.body.scrollHeight ){
            fetchDataFeed();
        }

    });

    let is_updatind = false;
    function fetchDataFeed(){
        console.log(' #fetchDataFeed(); ')

        if( is_updatind ) return;
        console.log(' => ');
        is_updatind = true;
        feed_indicator.style.display = 'block';

        // Simulate DB Latency
        setTimeout(function(){

            let new_feeds = '';

            for( let i=0; i<amount_feeds_to_fetch; i++ ){

                new_feeds += ''
                    +'<div class="m-row">'
                    +'    <div class="m-head"> #'+( ++global_feed_counter )+', Lorem ipsum dolor sit amet </div>'
                    +'    <div class="m-row">'
                    +'        '+( randFeedImage() )
                    +'        '+( randFeedText() )
                    +'</div>'
                    +'    <div class="m-footer"> <i class="fa fa-eye"></i> '+randInt(10, 10000)+' <i class="fa fa-calendar"></i> '+randDate()+' </div>'
                    +'</div>'

            }

            main_feed_data_wrapper.innerHTML += new_feeds;

            is_updatind = false;
            feed_indicator.style.display = 'none';

        }, randInt(500, 1600) ); // Network delay

    }


});
