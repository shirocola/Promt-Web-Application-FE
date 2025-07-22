import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../Dashboard';

describe('Dashboard Component', () => {
  it('renders without crashing', () => {
    render(<Dashboard />);
    
    expect(screen.getByText('Employee Management Dashboard')).toBeInTheDocument();
  });

  it('displays dashboard statistics', () => {
    render(<Dashboard />);
    
    expect(screen.getByText('Total Employees')).toBeInTheDocument();
    expect(screen.getByText('Departments')).toBeInTheDocument();
    expect(screen.getByText('New Hires This Month')).toBeInTheDocument();
  });

  it('displays quick action buttons', () => {
    render(<Dashboard />);
    
    expect(screen.getByText('Quick Actions')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add New Employee' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'View All Employees' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Generate Report' })).toBeInTheDocument();
  });

  it('has proper structure with CSS classes', () => {
    const { container } = render(<Dashboard />);
    
    expect(container.querySelector('.dashboard')).toBeInTheDocument();
    expect(container.querySelector('.dashboard-stats')).toBeInTheDocument();
    expect(container.querySelector('.quick-actions')).toBeInTheDocument();
  });
});