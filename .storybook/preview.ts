import type { Preview } from '@storybook/react-vite';
import React from 'react';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },
    // Add viewport parameters for responsive design
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
      },
    },
    // Configure docs page
    docs: {
      story: {
        inline: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      // Create a safe wrapper that handles React 19 context issues
      try {
        return React.createElement(
          'div',
          { 
            style: { 
              padding: '1rem',
              minHeight: '100px',
              position: 'relative'
            } 
          },
          React.createElement(Story, context.args)
        );
      } catch (error) {
        console.error('Story rendering error:', error);
        return React.createElement(
          'div',
          { style: { color: 'red', padding: '1rem' } },
          `Error rendering story: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    },
  ],
  tags: ['autodocs'],
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;