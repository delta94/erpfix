module.exports = [
  {
    key: 'administrator',
    name: 'Administrator',
    multilevel: true,
    icon: 'ios-paper-outline',
    child: [
      {
        key: 'level_1',
        keyParent: 'administrator',
        name: 'Setting Awal',
        link: '/#',
        child: [
          {
            key: 'sub_menu_1',
            name: 'Setting Nama dan Logo',
            link: '/fix/sample-page'
          },
          {
            key: 'sub_menu_1',
            name: 'Setting Perusahaan',
            link: '/#'
          },
        ]
      },
      {
        key: 'level_2',
        keyParent: 'administrator',
        name: 'Tool',
        child: [
          {
            key: 'sub_menu_1',
            name: 'Bahasa',
            link: '/#'
          },
          {
            key: 'sub_menu_1',
            name: 'Role User',
            link: '/#'
          },
        ]
      },
      {
        key: 'level_3',
        keyParent: 'administrator',
        name: 'Sistem',
        child: [
          {
            key: 'sub_menu_1',
            name: 'Menu Manager',
            link: '/#'
          },
          {
            key: 'sub_menu_1',
            name: 'Report Manager',
            link: '/#'
          },
        ]
      },
    ]
  },
  {
    key: 'master_data',
    name: 'Master Data',
    icon: 'ios-paper-outline',
    child: [
      {
        key: 'level_1',
        name: 'Area',
        link: '/fix/f1/area'
      },
      {
        key: 'level_2',
        name: 'Bank',
        link: '/fix/f1/bank'
      },
      {
        key: 'level_2',
        name: 'Branch',
        link: '/fix/f1/branch'
      },
      {
        key: 'level_2',
        name: 'City',
        link: '/fix/f1/city'
      },
      {
        key: 'level_2',
        name: 'Color',
        link: '/fix/f1/color'
      },
      {
        key: 'level_2',
        name: 'Country',
        link: '/fix/f1/country'
      },
    ]
  },
  {
    key: 'finance',
    name: 'Finannce',
    icon: 'ios-paper-outline',
    child: [
      {
        key: 'level_1',
        name: 'Cash Receipt (CR)',
        link: '/fix/f2/CR'
      },
      {
        key: 'level_2',
        name: 'Cash Delivery (CD)',
        link: '/fix/f2/CD'
      },
    ]
  }
];
