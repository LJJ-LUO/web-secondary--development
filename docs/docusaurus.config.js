const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
  module.exports = {
    title: "填报设计二次开发组件",
    tagline: "✏️🎈✏️",
    url: "https://your-docusaurus-test-site.com",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/favicon.ico",
    organizationName: "facebook", // Usually your GitHub org/user name.
    projectName: "docusaurus", // Usually your repo name.

    presets: [
      [
        "@docusaurus/preset-classic",
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            path: "docs",
            sidebarPath: require.resolve("./sidebars.js"),
            // Please change this to your repo.
            editUrl:
              "https://github.com/facebook/docusaurus/edit/main/website/",
          },
          reporting: {
            showReadingTime: true,
            // Please change this to your repo.
            editUrl:
              "https://github.com/facebook/docusaurus/edit/main/website/blog/",
          },
          theme: {
            customCss: require.resolve("./src/css/custom.css"),
          },
        }),
      ],
    ],

    plugins: [
      [
        "@docusaurus/plugin-content-docs",
        {
          id: "reporting",
          path: "reporting",
          routeBasePath: "reporting",
          sidebarPath: require.resolve("./sidebars.js"),
        },
      ],
      [
        "@docusaurus/plugin-content-docs",
        {
          id: "docs-system",
          path: "docs-system",
          routeBasePath: "docs-system",
          sidebarPath: require.resolve("./sidebars.js"),
        },
      ],
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        navbar: {
          title: "SDATA",
          logo: {
            alt: "SDATA Logo",
            src: "img/logo.png",
          },
          items: [
            {
              type: "doc",
              docId: "快速开始",
              position: "left",
              label: "文档",
            },

            {
              to: "/reporting/Intro", // ./reporting/Intro.md
              label: "填报",
              position: "left",
              activeBaseRegex: `/reporting/`,
            },
            {
              to: "/docs-system/Intro", // ./docs-system/Intro.md
              label: "My System",
              position: "left",
              activeBaseRegex: `/docs-system/`,
            },
            {
              href: "http://10.15.111.1:32666/open/sdata-plugin",
              label: "Gitlab",
              position: "right",
            },
          ],
        },
        footer: {
          style: "dark",
          links: [
            {
              title: "Docs",
              items: [
                {
                  label: "文档",
                  to: "/docs/快速开始",
                },
              ],
            },
            {
              title: "Community",
              items: [
                {
                  label: "Stack Overflow",
                  href: "https://stackoverflow.com/questions/tagged/docusaurus",
                },
                {
                  label: "Discord",
                  href: "https://discordapp.com/invite/docusaurus",
                },
                {
                  label: "Twitter",
                  href: "https://twitter.com/docusaurus",
                },
              ],
            },
            {
              title: "More",
              items: [
                {
                  label: "Gitlab",
                  href: "http://10.15.111.1:32666/open/om-datareporting-plugin-react-boilerplate",
                },
              ],
            },
          ],
          copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
        },
        prism: {
          theme: lightCodeTheme,
          darkTheme: darkCodeTheme,
        },
      }),
  }
);
