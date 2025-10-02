import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  viteFinal: async (config) => {
    // Configure server options for deployment
    config.server = {
      ...config.server,
      host: true, // Allow external connections
      allowedHosts: [
        'localhost',
        '127.0.0.1',
        'storybook.ticketbayglobal.com'
      ]
    };
    
    // Ensure preview configuration for deployment
    config.preview = {
      ...config.preview,
      host: true,
      allowedHosts: [
        'localhost',
        '127.0.0.1',
        'storybook.ticketbayglobal.com'
      ]
    };

    return config;
  }
};
export default config;