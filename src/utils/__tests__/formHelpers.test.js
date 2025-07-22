import {
  formatCurrency,
  formatDate,
  formatName,
  capitalizeWords,
  getInitials,
  sanitizeInput,
  debounce,
  createFormData,
  resetForm,
  focusFirstError
} from '../formHelpers';

// Mock DOM methods for testing
Object.defineProperty(document, 'querySelector', {
  value: jest.fn(),
  writable: true
});

describe('Form Helper Utilities', () => {
  describe('formatCurrency', () => {
    it('should format valid numbers as currency', () => {
      expect(formatCurrency(50000)).toBe('$50,000');
      expect(formatCurrency(1234.56)).toBe('$1,235');
      expect(formatCurrency(0)).toBe('$0');
      expect(formatCurrency('75000')).toBe('$75,000');
    });

    it('should handle edge cases', () => {
      expect(formatCurrency(null)).toBe('$0');
      expect(formatCurrency(undefined)).toBe('$0');
      expect(formatCurrency('')).toBe('$0');
      expect(formatCurrency('invalid')).toBe('$0');
    });

    it('should round decimals to whole numbers', () => {
      expect(formatCurrency(1234.67)).toBe('$1,235');
      expect(formatCurrency(999.4)).toBe('$999');
    });
  });

  describe('formatDate', () => {
    it('should format valid dates', () => {
      expect(formatDate('2023-01-15')).toBe('January 15, 2023');
      expect(formatDate('2023-12-31')).toBe('December 31, 2023');
      expect(formatDate(new Date('2023-06-15'))).toBe('June 15, 2023');
    });

    it('should handle invalid dates', () => {
      expect(formatDate('invalid-date')).toBe('');
      expect(formatDate('')).toBe('');
      expect(formatDate(null)).toBe('');
      expect(formatDate(undefined)).toBe('');
    });
  });

  describe('formatName', () => {
    it('should format names correctly', () => {
      expect(formatName('John', 'Doe')).toBe('John Doe');
      expect(formatName('  Mary  ', '  Jane  ')).toBe('Mary Jane');
      expect(formatName('Alice', '')).toBe('Alice');
      expect(formatName('', 'Smith')).toBe('Smith');
    });

    it('should handle edge cases', () => {
      expect(formatName('', '')).toBe('');
      expect(formatName(null, null)).toBe('');
      expect(formatName(undefined, undefined)).toBe('');
      expect(formatName('   ', '   ')).toBe('');
    });
  });

  describe('capitalizeWords', () => {
    it('should capitalize words correctly', () => {
      expect(capitalizeWords('john doe')).toBe('John Doe');
      expect(capitalizeWords('MARY JANE')).toBe('Mary Jane');
      expect(capitalizeWords('software engineer')).toBe('Software Engineer');
      expect(capitalizeWords('the quick brown fox')).toBe('The Quick Brown Fox');
    });

    it('should handle edge cases', () => {
      expect(capitalizeWords('')).toBe('');
      expect(capitalizeWords(null)).toBe('');
      expect(capitalizeWords(undefined)).toBe('');
      expect(capitalizeWords(123)).toBe('');
    });

    it('should handle single words', () => {
      expect(capitalizeWords('hello')).toBe('Hello');
      expect(capitalizeWords('WORLD')).toBe('World');
    });
  });

  describe('getInitials', () => {
    it('should get initials correctly', () => {
      expect(getInitials('John', 'Doe')).toBe('JD');
      expect(getInitials('Mary', 'Jane')).toBe('MJ');
      expect(getInitials('alice', 'smith')).toBe('AS');
    });

    it('should handle missing names', () => {
      expect(getInitials('John', '')).toBe('J');
      expect(getInitials('', 'Doe')).toBe('D');
      expect(getInitials('', '')).toBe('');
      expect(getInitials(null, null)).toBe('');
    });

    it('should handle whitespace', () => {
      expect(getInitials('  John  ', '  Doe  ')).toBe('JD');
      expect(getInitials('   ', 'Doe')).toBe('D');
    });
  });

  describe('sanitizeInput', () => {
    it('should remove dangerous characters', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe('scriptalert("xss")/script');
      expect(sanitizeInput('Hello <world>')).toBe('Hello world');
      expect(sanitizeInput('Test > input')).toBe('Test  input');
    });

    it('should trim whitespace', () => {
      expect(sanitizeInput('  hello world  ')).toBe('hello world');
      expect(sanitizeInput('\n\ttest\n\t')).toBe('test');
    });

    it('should handle non-string inputs', () => {
      expect(sanitizeInput(123)).toBe('');
      expect(sanitizeInput(null)).toBe('');
      expect(sanitizeInput(undefined)).toBe('');
      expect(sanitizeInput({})).toBe('');
    });
  });

  describe('debounce', () => {
    jest.useFakeTimers();

    it('should debounce function calls', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn('test1');
      debouncedFn('test2');
      debouncedFn('test3');

      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);

      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('test3');
    });

    it('should reset timer on new calls', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn('test1');
      jest.advanceTimersByTime(50);
      debouncedFn('test2');
      jest.advanceTimersByTime(50);

      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(50);

      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('test2');
    });

    afterEach(() => {
      jest.clearAllTimers();
    });
  });

  describe('createFormData', () => {
    it('should create data object from form element', () => {
      const mockFormData = new Map([
        ['firstName', '  John  '],
        ['lastName', '  Doe  '],
        ['email', 'john@example.com']
      ]);

      const mockForm = {
        elements: []
      };

      // Mock FormData constructor
      global.FormData = jest.fn().mockImplementation(() => ({
        entries: () => mockFormData.entries()
      }));

      const result = createFormData(mockForm);

      expect(result).toEqual({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com'
      });
    });

    it('should handle missing form element', () => {
      const result = createFormData(null);
      expect(result).toEqual({});
    });
  });

  describe('resetForm', () => {
    it('should call reset on form element', () => {
      const mockForm = {
        reset: jest.fn()
      };

      resetForm(mockForm);

      expect(mockForm.reset).toHaveBeenCalledTimes(1);
    });

    it('should handle missing form element', () => {
      expect(() => resetForm(null)).not.toThrow();
      expect(() => resetForm(undefined)).not.toThrow();
    });
  });

  describe('focusFirstError', () => {
    beforeEach(() => {
      document.querySelector.mockClear();
    });

    it('should focus on first error field', () => {
      const mockElement = {
        focus: jest.fn()
      };

      document.querySelector.mockReturnValue(mockElement);

      const errors = {
        firstName: 'Required',
        lastName: 'Too short'
      };

      focusFirstError(errors);

      expect(document.querySelector).toHaveBeenCalledWith('[name="firstName"]');
      expect(mockElement.focus).toHaveBeenCalledTimes(1);
    });

    it('should handle missing errors', () => {
      expect(() => focusFirstError(null)).not.toThrow();
      expect(() => focusFirstError({})).not.toThrow();
    });

    it('should handle missing element', () => {
      document.querySelector.mockReturnValue(null);

      const errors = {
        firstName: 'Required'
      };

      expect(() => focusFirstError(errors)).not.toThrow();
    });
  });
});