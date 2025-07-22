import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

// Mock the child components to avoid complex routing setup in basic tests
jest.mock('../components/Dashboard', () => {
  return function MockDashboard() {
    return <div data-testid="dashboard">Dashboard Component</div>;
  };
});

jest.mock('../components/EmployeeList', () => {
  return function MockEmployeeList() {
    return <div data-testid="employee-list">Employee List Component</div>;
  };
});

jest.mock('../components/EmployeeForm', () => {
  return function MockEmployeeForm() {
    return <div data-testid="employee-form">Employee Form Component</div>;
  };
});

const AppWithRouter = () => (
  <MemoryRouter>
    <App />
  </MemoryRouter>
);

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<AppWithRouter />);
    
    expect(screen.getByText('Promt Employee Management')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<AppWithRouter />);
    
    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Employees' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Add Employee' })).toBeInTheDocument();
  });

  it('has proper navigation structure', () => {
    render(<AppWithRouter />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Promt Employee Management');
  });

  it('renders main content container', () => {
    render(<AppWithRouter />);
    
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass('container');
  });
});