// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';
import autoprefixer from 'autoprefixer';
import tailwindcss from '@tailwindcss/postcss';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ErciApps', // título que aparece en la esquina superior izquierda
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  future: { v4: true },

  url: 'https://sge-erciapps.sytes.net',
  baseUrl: '/',

  organizationName: 'erciapps',
  projectName: 'sge-docu',
  trailingSlash: false,
  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
      onBrokenMarkdownImages: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // 🔌 Plugins
  plugins: [
    '@docusaurus/plugin-ideal-image',
    'docusaurus-plugin-image-zoom',

    // 👉 Alias para que 'react-player' sea la versión lazy (no rompe SSR)
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

    // 🎨 Integración de Tailwind + Autoprefixer
    function tailwindPlugin() {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(tailwindcss);
          postcssOptions.plugins.push(autoprefixer);
          return postcssOptions;
        },
      };
    },
  ],

  // ⚙️ Preset clásico + integración CSS personalizada
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: {
          showReadingTime: true,
          feedOptions: { type: ['rss', 'atom'], xslt: true },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  // 🎨 Configuración del tema
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',

      // 📚 Sidebar
      docs: {
        sidebar: {
          hideable: false,
          autoCollapseCategories: false,
        },
      },

      // 🧭 Tabla de contenidos
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },

      navbar: {
        title: '',
        logo: {
          alt: '',
          src: 'img/ercilogo.png',
          href: 'https://erciapps.sytes.net',
          target: '_self',
          height: 40,
          width: 40,
        },
        items: [
          { to: '/', label: 'Inicio', position: 'left' },
          { to: '/docs/category/teoría', label: 'Teoría', position: 'left' },
          { to: '/docs/category/modulos-odoo', label: 'Modulos', position: 'left' },
          { to: '/docs/category/proyectos', label: 'Proyectos', position: 'left' },
          { to: '/docs/category/docker', label: 'Docker', position: 'left' },
        ],
      },

      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} ErciApps`,
      },

      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['java', 'csharp', 'bash', 'json', 'python'],
      },

      zoom: {
        selector: '.markdown img, .markdown picture img',
        background: {
          light: 'rgb(255, 255, 255)',
          dark: 'rgb(50, 50, 50)',
        },
      },
    }),

  // 🖋️ Fuente moderna
  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap',
  ],
};

export default config;
