import React from 'react';
import { render } from '@testing-library/react';

// Simple test that doesn't require complex routing
describe('App Component', () => {
  it('App file exists and can be imported', () => {
    // Just verify we can import the App component without errors
    const App = require('../App').default;
    expect(App).toBeDefined();
    expect(typeof App).toBe('function');
  });

  it('App component renders something without router context', () => {
    // Mock all the router dependencies to empty divs
    jest.doMock('react-router-dom', () => ({
      BrowserRouter: ({ children }) => React.createElement('div', { 'data-testid': 'router' }, children),
      Routes: ({ children }) => React.createElement('div', { 'data-testid': 'routes' }, children),
      Route: () => React.createElement('div', { 'data-testid': 'route' }),
    }));

    // Mock CoreUI components
    jest.doMock('@coreui/react', () => ({
      CContainer: ({ children, ...props }) => React.createElement('div', props, children),
      CRow: ({ children, ...props }) => React.createElement('div', props, children),
      CCol: ({ children, ...props }) => React.createElement('div', props, children),
      CHeader: ({ children, ...props }) => React.createElement('header', props, children),
      CHeaderBrand: ({ children, ...props }) => React.createElement('div', props, children),
      CHeaderNav: ({ children, ...props }) => React.createElement('nav', props, children),
    }));

    // Mock the view components
    jest.doMock('../views/EmployeeList', () => () => React.createElement('div', { 'data-testid': 'employee-list' }, 'Employee List'));
    jest.doMock('../views/EmployeeForm', () => () => React.createElement('div', { 'data-testid': 'employee-form' }, 'Employee Form'));

    // Clear module cache to ensure mocks are applied
    jest.resetModules();
    
    const App = require('../App').default;
    
    const { container } = render(React.createElement(App));
    expect(container).toBeDefined();
    expect(container.firstChild).toBeTruthy();
  });
});