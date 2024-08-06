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
  description: '我们都是自由哒!',
}

export default config
