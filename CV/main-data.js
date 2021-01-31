const CVData = {

  user: {

    title: 'Personal Information',

    data: {
      Name     : 'Timoschenko Viacheslav Igorevich',
      Email    : 'timoschenko.viacheslav@yandex.com​', 
      // Phone    : '+32 (0) 498 40-39-04',
      Github   : 'https://ch3ll0v3k.github.io/',
      LinkedIn : 'https://www.linkedin.com/in/timoschenko-viacheslau/',
    },
    meta: {
      photo : 'https://ch3ll0v3k.github.io/CV/Timoschenko-Viacheslav.jpg',
    },

  },

  spoken_language:{
    title: 'Spoken language level',
    data: {
      English     : 'Average',
      Nederlands  : 'Good',
      Russian     : 'Good',
    },
  },

  programming_skills: {

    title: 'Programming skills',
    data: {
      Databases: [
        'MySQL', '<b>PostgreSQL</b>', '<b>MongoDB</b>', '(+NO-SQL)',
      ],
        
      OSs: [
        '<b>Linux</b> ( Debian, Ubuntu, any other: (Debian Based) )',
      ],

      'Main languages/tools stack': [
        '<b>Docker</b>, <b>NodeJS</b>, JS (ECMAScript), (<b>MongoDB</b>, MariaDB, <b>PostgreSQL</b>)',
        'Sockets: ( Web/JS/Socket.io )',
        'NginX, Apache, ExpressJS ',
        'React, <b>React-Native</b>, VueJS (2, 3), NuxtJS, Bootstrap',
        'PHP, HTML5, CSS3',
        'Python: (2,3)',
        'Version control systems: Github, Bitbucket',
      ],

      'Blockchains - (Integration)': [
        'NEM Blockchain: (https://nem.io)',
      ],

      'Other - Languages/Libraries (with less experience)': [
        'Redis',
        'Telegraf(js)',
        'Bash',
        'MQL(4,5) (MetaQuotes)',
        'Java (Android)',
        'ML (BrainJS, FANN(C/C++), KERAS (python), Tensorflow(JS))',
        'C/C++',
        'C#',
      ],

      Tools: ['Any: required by project'],
    },

  },

  work_experience:{
    title: 'Work experience',
    data: [
      {
        'Work period':{ title: 'Work period', data:{from: 'May-2014', upto: 'Apr-2016' }},
        'Company': { title: 'Company', data: 'Zergo.Co' },
        'Position': { title: 'Position', data: 'Leading developer', },
        'description': { 
          title: 'Description',
          EN: `
            Virtual goods trading platform, payments integration and processing.
            Yandex.Money, Qiwi, UniPay, VISA/MasterCard
          `,
          RU: `
            Торговая платформа виртуальных товаров, интеграция и обработка платежей.
            Yandex.Money, Qiwi, UniPay, VISA/MasterCard
          `
        },

        'used': {
          title: 'During development, used',
          data:[
            'PHP', 'MySQL', '<b>Linux</b>(Ubuntu)', 'Git', 'Custom UI',
          ]
        },
      },

      {
        'Work period':{ title: 'Work period', data:{from: 'Aug 2016', upto: 'Feb 2017', }},
        'Company': { title: 'Company', data: 'Freelance' },
        'Position': { title: 'Position', data: 'Freelance', },
        'description': { 
          title: 'Description',
          EN: 'Freelance/Freelance',
          RU: 'Фриланс/Фриланс',
        },
        'used': {
          title: 'During development, used',
          data:[]
        },

      },

      {

        'Work period':{ title: 'Work period', data:{from: 'Sep 2017', upto: 'Apr 2019', }},
        'Company': { title: 'Company', data: 'Fundplatform' },
        'Position': { title: 'Position', data: 'Leading developer', },
        'description': { 
          title: 'Description',
          EN: `
            Investment platform, ICO platform, cryptocurrency integration and processing.
            Trading terminal, custom cryptocurrency wallets, NEM-Blockchain integration.
          `,

          RU: `
            Инвестиционная платформа, платформа ICO, интеграция и обработка криптовалюты.
            Торговый терминал, пользовательские криптовалютные кошельки, интеграция NEM-Blockchain.
          `,
        },

        'used': {
          title: 'During development, used',
          data:[
            '<b>NodeJS</b>', '<b>Docker</b>', 'PHP', 'MySQL', '<b>Linux</b>(Ubuntu)', 'Git',
          ]
        },
      },

      {
        'Work period':{ title: 'Work period', data:{ from: 'Sep 2019', upto: 'Today'}, },
        'Company': { title: 'Company', data: 'LotaSoft' },
        'Position': { title: 'Position', data: 'Leading developer', },
        'description': { 
          title: 'Description',
          EN: `
            Development of a backend for an application for monitoring and managing personal data of horse racing
          `,
          RU: `
            Разработка бэкенда под приложение для мониторинга и управления личными данными лошадиных скачек.
          `,
        },

        'used': {
          title: 'During development, used',
          data:[
          '<b>React-Native</b>', '<b>MongoDB</b>', '<b>NodeJS</b>', '<b>Docker</b>', '<b>Linux</b>(Ubuntu)', 'Git',
          ]
        },
      },

      // {
      //   'Work period':{ title: 'Work period', data:{ from: '', upto: ''}, },
      //   'Company': { title: 'Company', data: '' },
      //   'Position': { title: 'Position', data: 'Leading developer' },
      //   'Description': { title: 'Description', EN: ``, RU: `` },
      //   'used': {
      //     title: 'During development, used',
      //     data:[ ]
      //   },
      // },

    ],

  },

  work_experience_extra:{
    title: 'Other work experience',

    data: [
      { 
        title: 'Poker (Texas-Holdem) Game-Engine',
        description: {
          EN: '<b>Crypto-Poker</b> Game-Engine with integrated, tournaments, free rooms, crypto-currency processing',
          RU: '<b>Crypto-Poker</b> игровой движок со встроенными турнирами, бесплатными комнатами, обработкой криптовалюты',
        }
      },
      { 
        title: 'Telegram (like/clone) messenger',
        description: {
          EN: '<b>Telegram</b> (like/clone) messenger with React-native, (<b>Demo application can be provided upon request.</b>)',
          RU: '<b>Telegram</b> (клон) messenger на React-native, (<b>Демо-приложение может быть предоставлено по запросу</b>)',
        }
      },
      {
        title: '<i class="fa fa-btc"></i> <b>Bitcoin Node-Server</b>',
        description: {
          EN: 'Installation and support of Bitcoin Node-Server (own API gateway)',
          RU: 'Установка и поддержка Bitcoin Node-Server (собственный API шлюз)',
        }
      },
      {
        title: '<i class="fa fa-server"></i> <b> Machine learning - (ML)</b>',
        description: {
          EN: 'Machine learning: https://github.com/ch3ll0v3k/ML.real-time-image.night-vision.js',
          RU: 'Машинное обучение: https://github.com/ch3ll0v3k/ML.real-time-image.night-vision.js',
        }
      },

    ],

  },

  i18n: ( data, lang )=>{
    try{
      const res = i18nData[ (''+lang).trim().toUpperCase() ][ data ];
      return res || data;
    }catch(e){}
    return data;
  }
}
