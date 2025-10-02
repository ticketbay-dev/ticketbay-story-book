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
    "options": {
      strictMode: false, // Disable strict mode to prevent React 19 context issues
    }
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
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

    // Configure resolve for React 19 compatibility
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        // Ensure React is properly resolved
        'react': 'react',
        'react-dom': 'react-dom',
      },
      dedupe: ['react', 'react-dom'],
    };

    // Configure optimizeDeps for React 19
    config.optimizeDeps = {
      ...config.optimizeDeps,
      include: [
        ...(config.optimizeDeps?.include ?? []),
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
      ],
      exclude: [
        ...(config.optimizeDeps?.exclude ?? []),
      ],
    };

    // Configure esbuild for React 19
    config.esbuild = {
      ...config.esbuild,
      jsx: 'automatic',
      jsxImportSource: 'react',
    };

    // Add define for React 19 compatibility
    config.define = {
      ...config.define,
      'process.env.NODE_ENV': JSON.stringify('development'),
      global: 'globalThis',
    };

    return config;
  }
};
export default config;