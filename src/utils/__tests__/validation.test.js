import {
  validateEmail,
  validateName,
  validatePosition,
  validateSalary,
  validateDate,
  validateEmployee
} from '../validation';

describe('Validation Utilities', () => {
  describe('validateEmail', () => {
    it('should validate correct email formats', () => {
      expect(validateEmail('test@example.com')).toBeNull();
      expect(validateEmail('user.name@domain.co.uk')).toBeNull();
      expect(validateEmail('test+tag@example.org')).toBeNull();
    });

    it('should reject invalid email formats', () => {
      expect(validateEmail('invalid-email')).toBe('Please enter a valid email address');
      expect(validateEmail('test@')).toBe('Please enter a valid email address');
      expect(validateEmail('@example.com')).toBe('Please enter a valid email address');
      expect(validateEmail('test@.com')).toBe('Please enter a valid email address');
    });

    it('should require email to be provided', () => {
      expect(validateEmail('')).toBe('Email is required');
      expect(validateEmail(null)).toBe('Email is required');
      expect(validateEmail(undefined)).toBe('Email is required');
    });
  });

  describe('validateName', () => {
    it('should validate correct names', () => {
      expect(validateName('John')).toBeNull();
      expect(validateName('Mary-Jane')).toBeNull();
      expect(validateName("O'Connor")).toBeNull();
      expect(validateName('Jean Baptiste')).toBeNull();
    });

    it('should reject names that are too short', () => {
      expect(validateName('J')).toBe('Name must be at least 2 characters long');
      expect(validateName(' A ')).toBe('Name must be at least 2 characters long');
    });

    it('should reject names that are too long', () => {
      const longName = 'a'.repeat(51);
      expect(validateName(longName)).toBe('Name must be less than 50 characters');
    });

    it('should reject names with invalid characters', () => {
      expect(validateName('John123')).toBe('Name can only contain letters, spaces, hyphens, and apostrophes');
      expect(validateName('John@Doe')).toBe('Name can only contain letters, spaces, hyphens, and apostrophes');
    });

    it('should require name to be provided', () => {
      expect(validateName('')).toBe('Name is required');
      expect(validateName('   ')).toBe('Name is required');
      expect(validateName(null)).toBe('Name is required');
    });

    it('should use custom field name in error messages', () => {
      expect(validateName('', 'First name')).toBe('First name is required');
      expect(validateName('A', 'Last name')).toBe('Last name must be at least 2 characters long');
    });
  });

  describe('validatePosition', () => {
    it('should validate correct positions', () => {
      expect(validatePosition('Software Engineer')).toBeNull();
      expect(validatePosition('Product Manager')).toBeNull();
      expect(validatePosition('UX/UI Designer')).toBeNull();
    });

    it('should reject positions that are too short', () => {
      expect(validatePosition('A')).toBe('Position must be at least 2 characters long');
    });

    it('should reject positions that are too long', () => {
      const longPosition = 'a'.repeat(101);
      expect(validatePosition(longPosition)).toBe('Position must be less than 100 characters');
    });

    it('should require position to be provided', () => {
      expect(validatePosition('')).toBe('Position is required');
      expect(validatePosition('   ')).toBe('Position is required');
      expect(validatePosition(null)).toBe('Position is required');
    });
  });

  describe('validateSalary', () => {
    it('should validate correct salaries', () => {
      expect(validateSalary(50000)).toBeNull();
      expect(validateSalary('75000')).toBeNull();
      expect(validateSalary(0)).toBeNull();
      expect(validateSalary(1000000)).toBeNull();
    });

    it('should reject negative salaries', () => {
      expect(validateSalary(-1000)).toBe('Salary cannot be negative');
      expect(validateSalary('-500')).toBe('Salary cannot be negative');
    });

    it('should reject extremely high salaries', () => {
      expect(validateSalary(20000000)).toBe('Salary cannot exceed $10,000,000');
    });

    it('should reject non-numeric salaries', () => {
      expect(validateSalary('abc')).toBe('Salary must be a valid number');
      expect(validateSalary('50k')).toBe('Salary must be a valid number');
    });

    it('should require salary to be provided', () => {
      expect(validateSalary('')).toBe('Salary is required');
      expect(validateSalary(null)).toBe('Salary is required');
      expect(validateSalary(undefined)).toBe('Salary is required');
    });
  });

  describe('validateDate', () => {
    it('should validate correct dates', () => {
      expect(validateDate('2023-01-15')).toBeNull();
      expect(validateDate('2020-12-31')).toBeNull();
      expect(validateDate('1950-06-15')).toBeNull();
    });

    it('should reject future dates', () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);
      const futureDateString = futureDate.toISOString().split('T')[0];
      
      expect(validateDate(futureDateString)).toBe('Date cannot be in the future');
    });

    it('should reject dates before 1900', () => {
      expect(validateDate('1899-12-31')).toBe('Date cannot be before 1900');
    });

    it('should reject invalid date formats', () => {
      expect(validateDate('invalid-date')).toBe('Please enter a valid date');
      expect(validateDate('2023-13-45')).toBe('Please enter a valid date');
    });

    it('should require date to be provided', () => {
      expect(validateDate('')).toBe('Date is required');
      expect(validateDate(null)).toBe('Date is required');
    });

    it('should use custom field name in error messages', () => {
      expect(validateDate('', 'Hire date')).toBe('Hire date is required');
      expect(validateDate('invalid', 'Birth date')).toBe('Please enter a valid birth date');
    });
  });

  describe('validateEmployee', () => {
    const validEmployee = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      position: 'Software Engineer',
      department: 'Engineering',
      salary: 75000,
      hireDate: '2023-01-15'
    };

    it('should validate a complete valid employee', () => {
      const result = validateEmployee(validEmployee);
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('should validate employee with minimal required fields', () => {
      const minimalEmployee = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        position: 'Software Engineer'
      };
      
      const result = validateEmployee(minimalEmployee);
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('should return errors for invalid fields', () => {
      const invalidEmployee = {
        firstName: '',
        lastName: 'D',
        email: 'invalid-email',
        position: '',
        salary: -1000,
        hireDate: 'invalid-date'
      };

      const result = validateEmployee(invalidEmployee);
      expect(result.isValid).toBe(false);
      expect(result.errors.firstName).toBe('First name is required');
      expect(result.errors.lastName).toBe('Last name must be at least 2 characters long');
      expect(result.errors.email).toBe('Please enter a valid email address');
      expect(result.errors.position).toBe('Position is required');
      expect(result.errors.salary).toBe('Salary cannot be negative');
      expect(result.errors.hireDate).toBe('Please enter a valid hire date');
    });

    it('should skip validation for optional empty fields', () => {
      const employeeWithEmptyOptionals = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        position: 'Software Engineer',
        salary: '',
        hireDate: ''
      };

      const result = validateEmployee(employeeWithEmptyOptionals);
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('should validate optional fields when provided', () => {
      const employeeWithInvalidOptionals = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        position: 'Software Engineer',
        salary: 'invalid',
        hireDate: 'invalid'
      };

      const result = validateEmployee(employeeWithInvalidOptionals);
      expect(result.isValid).toBe(false);
      expect(result.errors.salary).toBe('Salary must be a valid number');
      expect(result.errors.hireDate).toBe('Please enter a valid hire date');
    });
  });
});