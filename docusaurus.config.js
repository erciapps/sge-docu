// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ErciApps',  // se mostrará en la esquina arriba izq.
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  future: { v4: true },

  url: 'https://sge-erciapps.sytes.net',
  baseUrl: '/',

  organizationName: 'erciapps',
  projectName: 'sge-docu',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: { defaultLocale: 'en', locales: ['en'] },

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: './sidebars.js',
         // editUrl:
           // 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: { type: ['rss', 'atom'], xslt: true },
         // editUrl:
        //    'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: { customCss: './src/css/custom.css' },
      }),
    ],
  ],
    // 👉 Alias para que 'react-player' sea la versión lazy (no rompe SSR)
  plugins: [
    function aliasReactPlayer() {
      return {
        name: 'alias-react-player-lazy',
        configureWebpack() {
          return {
            resolve: {
              alias: {
                'react-player': require.resolve('react-player/lazy'),
              },
            },
          };
        },
      };
    },
  ],

  themeConfig: ({
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'ErciApps',   // texto que aparece
      logo: {
        alt: 'ErciApps',
        src: 'img/logo.svg',
        href: 'https://erciapps.sytes.net', // aquí fuerzas el destino
      },
      items: [
        { to: '/', label: 'Inicio', position: 'left' },
          {to: '/docs/category/tema-1', label: 'Tema 1', position: 'left'},
          
        
      ],
    },
    footer: {
      style: 'dark',
      
      copyright: `Copyright © ${new Date().getFullYear()} ErciApps`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },      zoom: {
        selector: '.markdown :not(em) > img',
        background: {
          light: 'rgb(255, 255, 255)',
          dark: 'rgb(50, 50, 50)'
        },
        config: {
          // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
        }
      }
  }),
};

export default config;