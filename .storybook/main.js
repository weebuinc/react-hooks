/** @type { import('@storybook/web-components-webpack5').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.mdx','../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links'],
  framework: {
    name: '@storybook/web-components-webpack5',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  }
};
export default config;