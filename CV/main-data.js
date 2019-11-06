const CVData = {

  user: {

    title: 'Personal Information',

    data: {
      Name     : 'Timoschenko Viacheslav Igorevich',
      Email    : 'timoschenko.viacheslav@yandex.com​', 
      Phone    : '+32 (0) 498 40-39-04',
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
      Nederlands  : 'Average',
      Russian     : 'Good',
    },
  },

  programming_skills: {

    title: 'Programming skills',
    data: {
      Databases: [
        'MySQL', 'Postgres', 'MongoDB', '(+NO-SQL)',
      ],
        
      OSs: [
        'Linux ( Debian, Ubuntu, any other: (Debian Based) )',
      ],

      'Main languages/tools stack': [
        'Docker, NodeJS, JS (ECMAScript), (MongoDB, MariaDB)',
        'Sockets: ( Web/JS/Socket.io )',
        'NginX, Apache, ExpressJS ',
        'React-Native, VueJS (2, 3), NuxtJS, Bootstrap',
        'PHP, HTML5, CSS3',
        'Python: (2,3)',
        'GIT (Version control systems)',
      ],

      'Blockchains - (Integration)': [
        'NEM Blockchain: (https://nem.io)',
      ],

      'Other - Languages/Libraries (with less experience)': [
        'telegraf(js)',
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
            'PHP', 'MySQL', 'Linux(Ubuntu)', 'Git', 'Custom UI',
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
            'NodeJS', 'Docker', 'PHP', 'MySQL', 'Linux(Ubuntu)', 'Git',
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
          'React-Native', 'BongoDB', 'NodeJS', 'Docker', 'PHP', 'Linux(Ubuntu)', 'Git',
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
  i18n: ( data, lang )=>{
    try{
      const res = i18nData[ (''+lang).trim().toUpperCase() ][ data ];
      return res || data;
    }catch(e){}
    return data;
  }
}
