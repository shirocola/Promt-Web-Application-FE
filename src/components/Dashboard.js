import React from 'react';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Employee Management Dashboard</h2>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Employees</h3>
          <p className="stat-number">2</p>
        </div>
        <div className="stat-card">
          <h3>Departments</h3>
          <p className="stat-number">2</p>
        </div>
        <div className="stat-card">
          <h3>New Hires This Month</h3>
          <p className="stat-number">0</p>
        </div>
      </div>
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <button className="btn">Add New Employee</button>
        <button className="btn">View All Employees</button>
        <button className="btn">Generate Report</button>
      </div>
    </div>
  );
};

export default Dashboard;