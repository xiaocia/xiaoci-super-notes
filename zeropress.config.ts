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
  title: '小慈的笔记',
  description: '了解真相,你才能获得真正的自由.',
}

export default config
