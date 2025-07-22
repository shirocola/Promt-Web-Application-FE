// Form helper utilities

export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined || amount === '') {
    return '$0';
  }
  
  const numericAmount = Number(amount);
  if (isNaN(numericAmount)) {
    return '$0';
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numericAmount);
};

export const formatDate = (date) => {
  if (!date) {
    return '';
  }
  
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatName = (firstName, lastName) => {
  const first = firstName ? firstName.trim() : '';
  const last = lastName ? lastName.trim() : '';
  
  if (!first && !last) {
    return '';
  }
  
  return `${first} ${last}`.trim();
};

export const capitalizeWords = (str) => {
  if (!str || typeof str !== 'string') {
    return '';
  }
  
  return str.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const getInitials = (firstName, lastName) => {
  const first = firstName ? firstName.trim().charAt(0).toUpperCase() : '';
  const last = lastName ? lastName.trim().charAt(0).toUpperCase() : '';
  
  return `${first}${last}`;
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') {
    return '';
  }
  
  return input.trim().replace(/[<>]/g, '');
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const createFormData = (formElement) => {
  if (!formElement) {
    return {};
  }
  
  const formData = new FormData(formElement);
  const data = {};
  
  for (let [key, value] of formData.entries()) {
    data[key] = sanitizeInput(value);
  }
  
  return data;
};

export const resetForm = (formElement) => {
  if (formElement) {
    formElement.reset();
  }
};

export const focusFirstError = (errors) => {
  if (!errors || typeof errors !== 'object') {
    return;
  }
  
  const firstErrorField = Object.keys(errors)[0];
  if (firstErrorField) {
    const element = document.querySelector(`[name="${firstErrorField}"]`);
    if (element) {
      element.focus();
    }
  }
};