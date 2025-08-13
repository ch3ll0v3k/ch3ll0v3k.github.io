const REP_ROOT = '/repository';

window.addEventListener('load', function () {

  document.title = 'ch3ll0v3k';

  // ----------------------------------------------------------------
  // side-menu

  if (!$('#sidenav').attr('disabled')) {

    const menu_t = [
      { target: '', icon: 'fa fa-home', href: '/index.html', name: 'Main' },
      { target: '_blank', icon: 'fa fa-globe', href: REP_ROOT + '/comparing-40-evs-of-2022/index.html', name: 'Comparing 40 EVs' },
      // { target: '_blank', icon: 'fa fa-globe', href: REP_ROOT + '/JS-Universe/index.html', name: 'JS-Universe' },
      // { target: '', icon: 'fa fa-info', href: REP_ROOT + '/MiiCanvas/index.html', name: 'MiiCanvas' },
      // { target: '', icon: 'fa fa-list', href: REP_ROOT + '/infinity-data-scroll-feed/index.html', name: 'Infinity scroll feed' },
      // { target: '', icon: 'fa fa-btc', href: REP_ROOT + '/ONTONGCalc/index.html', name: 'ONTONGCalc' },
      // { target: '', icon: 'fa fa-calc', href: REP_ROOT + '/open-ph-meter/pub_html/index.html', name: 'Open-PH-meter' },
      // { target: '', icon: 'fa fa-zoom', href: REP_ROOT + '/deep-zoom/index.html', name: 'Deep-Zoom' },
      // { target: '', icon: 'fa fa-zoom', href: REP_ROOT + '/deep-zoom/index.html', name: 'Deep-Zoom' },
      { target: '', icon: 'fa fa-info', href: REP_ROOT + '/vs-code/index.html', name: 'Vs-Code' },


    ];

    for (let mi in menu_t) {

      let item = menu_t[mi];
      if (location.pathname == '/' + item.href) document.title += ' - ' + item.name;

      $('#sidenav').append(''
        + '<div class="sidenav-item">'
        + '    <i class="sidenav-item-icon ' + item.icon + '"></i>'
        + '    <a target="' + item.target + '" class="sidenav-item-link" href="' + item.href + '">' + item.name + '</a>'
        + '</div>'
      );

    }
  }

  // ----------------------------------------------------------------
  // top-bar

  let top_bar = document.createElement('div');
  top_bar.id = 'top-bar';

  document.body.insertBefore(top_bar, document.getElementById('wrapper'));

  // side-menu collaps => 
  let menu_items_html = ''
    + '<div class="top-bar-btn-item">'
    + '   <a id="side-menu-trigger-btn" data-is-open="true" class="btn btn-primary"> <i class="fa fa-bars"></i> </a>'
    + '</div>'

  let top_bar_t = [
    // { target: '', icon: 'fa fa-home', href:'/index.html', name: 'Main'},
  ];

  for (let i in top_bar_t) {

    let item = top_bar_t[i];

    menu_items_html += ''
      + '<div class="top-bar-item">'
      + '   <a target="' + (item.target) + '" class="' + (item.href) + '"> <i class="fa ' + (item.icon) + '"></i> ' + (item.name) + ' </a>'
      + '</div>'

  }

  top_bar.innerHTML = menu_items_html;

  $('#side-menu-trigger-btn').on('click', function () {

    let sidenav = document.getElementById('sidenav');
    let wrapper = document.getElementById('wrapper');

    if ((this.getAttribute('data-is-open') == 'true' ? true : false)) {
      localStorage.setItem('side-menu-trigger-btn', 'closed');
      this.setAttribute('data-is-open', 'false');
      wrapper.style.marginLeft = '0';
      wrapper.style.width = '100%';
      sidenav.style.width = '0px';

    } else {

      localStorage.setItem('side-menu-trigger-btn', 'open');
      this.setAttribute('data-is-open', 'true');
      wrapper.style.marginLeft = '';
      wrapper.style.width = '';
      sidenav.style.width = '';
    }

  });

  // if( !localStorage.getItem('side-menu-trigger-btn') )
  //     localStorage.setItem('side-menu-trigger-btn','open');

  // if( localStorage.getItem('side-menu-trigger-btn') == 'closed' )
  //     $('#side-menu-trigger-btn').trigger('click');

  $('#side-menu-trigger-btn').trigger('click');

});

