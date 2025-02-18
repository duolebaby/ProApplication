import chalk from 'chalk';
import { readdirSync } from 'fs';
import path, { join } from 'path';
const isDev = process.env.NODE_ENV === 'development'

const headPkgList = [];
// utils must build before core
// runtime must build before renderer-react
const pkgList = readdirSync(join(__dirname, '../../packages')).filter(
  (pkg) => pkg.charAt(0) !== '.' && !headPkgList.includes(pkg),
);
const alias = pkgList.reduce((pre, pkg) => {
  pre[`@vis/${pkg}`] = join(__dirname, '../../packages', pkg, 'src');
  return {
    ...pre,
  };
}, {});

console.log(`🌼 alias list \n${chalk.blue(Object.keys(alias).join('\n'))}`);
// const isProduction = process.env.NODE_ENV === 'production';
const tailPkgList = pkgList
  .map((path) => [join(__dirname,'../../packages/', path, 'src')])
  .reduce((acc, val) => acc.concat(val), []);
const isDeploy = process.env.SITE_DEPLOY === 'TRUE';
const chartMenus = {
  title: '图表',
  children: ['charts', ...readdirSync(join(__dirname, '../../packages/charts/src')).filter(
    (pkg) => pkg.charAt(0) !== '.' && pkg.split('.').length <= 1,
  ).map(i => i + '/README.md')],
}
const componentMenus = {
  title: '其他组件',
  children: ['components', ...readdirSync(join(__dirname, '../../packages/components/src')).filter(
    (pkg) => pkg.charAt(0) !== '.' && pkg.split('.').length <= 1,
  ).map(i => i + '/README.md')],
}

export default {
  title: 'yourname',
  mode: 'site',
  logo: '/icon.png',
  // extraBabelPlugins: [],
  metas: [
    {
      property: 'og:site_name',
      content: 'VisNext',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent',
    },
    {
      name: 'theme-color',
      content: '#1890ff',
    },
  ],
  alias,
  headScripts: ['https://gw.alipayobjects.com/os/antfincdn/fdj3WlJd5c/darkreader.js'],
  externals: { darkreader: 'window.DarkReader' },
  resolve: {
    includes: [...tailPkgList, join(__dirname, '../../docs')],
  },
  analytics: false,
  history: { type: 'hash' },
  targets: {
    chrome: 80,
    firefox: false,
    safari: false,
    edge: false,
    ios: false,
  },
  theme: {
    '@s-site-menu-width': '258px',
    '@root-entry-name': 'variable',
  },
  locales: [
    ['zh-CN', '中文']
  ],
  ignoreMomentLocale: true,
  menus: {
    '/components': [
      {
        title: '架构设计',
        children: ['schema'],
      },
      {
        title: '工具 & 装饰',
        children: ['test', 'decorator','utils', 'common'],
      },
      chartMenus,
      componentMenus,
    ],
  },
  // ssr: isDeploy ? {} : undefined,
  webpack5: {},
  exportStatic: {},
  mfsu: !isDeploy ? {} : undefined,
  outputPath: isDev ? undefined : 'build-docs',
  publicPath: isDev ? undefined : '/build-docs/'
};
