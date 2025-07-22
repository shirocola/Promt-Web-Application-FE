// Validation utilities for forms and data

export const validateEmail = (email) => {
  if (!email) {
    return 'Email is required';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  
  return null;
};

export const validateName = (name, fieldName = 'Name') => {
  if (!name || name.trim() === '') {
    return `${fieldName} is required`;
  }
  
  if (name.trim().length < 2) {
    return `${fieldName} must be at least 2 characters long`;
  }
  
  if (name.trim().length > 50) {
    return `${fieldName} must be less than 50 characters`;
  }
  
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  if (!nameRegex.test(name)) {
    return `${fieldName} can only contain letters, spaces, hyphens, and apostrophes`;
  }
  
  return null;
};

export const validatePosition = (position) => {
  if (!position || position.trim() === '') {
    return 'Position is required';
  }
  
  if (position.trim().length < 2) {
    return 'Position must be at least 2 characters long';
  }
  
  if (position.trim().length > 100) {
    return 'Position must be less than 100 characters';
  }
  
  return null;
};

export const validateSalary = (salary) => {
  if (salary === undefined || salary === null || salary === '') {
    return 'Salary is required';
  }
  
  const numericSalary = Number(salary);
  if (isNaN(numericSalary)) {
    return 'Salary must be a valid number';
  }
  
  if (numericSalary < 0) {
    return 'Salary cannot be negative';
  }
  
  if (numericSalary > 10000000) {
    return 'Salary cannot exceed $10,000,000';
  }
  
  return null;
};

export const validateDate = (date, fieldName = 'Date') => {
  if (!date) {
    return `${fieldName} is required`;
  }
  
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return `Please enter a valid ${fieldName.toLowerCase()}`;
  }
  
  const today = new Date();
  if (dateObj > today) {
    return `${fieldName} cannot be in the future`;
  }
  
  const minDate = new Date('1900-01-01');
  if (dateObj < minDate) {
    return `${fieldName} cannot be before 1900`;
  }
  
  return null;
};

export const validateEmployee = (employee) => {
  const errors = {};
  
  const firstNameError = validateName(employee.firstName, 'First name');
  if (firstNameError) errors.firstName = firstNameError;
  
  const lastNameError = validateName(employee.lastName, 'Last name');
  if (lastNameError) errors.lastName = lastNameError;
  
  const emailError = validateEmail(employee.email);
  if (emailError) errors.email = emailError;
  
  const positionError = validatePosition(employee.position);
  if (positionError) errors.position = positionError;
  
  if (employee.salary !== undefined && employee.salary !== '') {
    const salaryError = validateSalary(employee.salary);
    if (salaryError) errors.salary = salaryError;
  }
  
  if (employee.hireDate) {
    const hireDateError = validateDate(employee.hireDate, 'Hire date');
    if (hireDateError) errors.hireDate = hireDateError;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};