import { UserConfig } from 'zeropress'

const config: UserConfig = {
  themeConfig: {
    nav: [
      {
        img: '/logo.jpg',
        link: '/',
        position: 'left',
      },
      {
        dark: true,
      },
      {
        logo: 'github',
        link: 'https://github.com/houhongxu/hhxpress',
      },
    ],
  },
  title: '小慈的超级无敌好懂讲解'
}

export default config
