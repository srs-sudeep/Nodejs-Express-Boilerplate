// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  mainSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Architecture',
      collapsed: false,
      items: ['architecture/system-design', 'architecture/request-flow', 'architecture/source-tree'],
    },
    {
      type: 'category',
      label: 'Procedures',
      collapsed: false,
      items: ['procedures/environment-setup-e2e', 'procedures/docker-workflows', 'procedures/command-reference'],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: ['guides/api-and-swagger', 'guides/maintaining-documentation'],
    },
  ],
};

export default sidebars;
