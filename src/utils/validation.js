/**
 * Validation Utilities
 * Helper functions for validating form inputs
 */

/**
 * Validates email address format
 * @param {String} email - Email address to validate
 * @returns {Boolean} True if valid, false otherwise
 */
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Validates phone number format (basic validation)
 * Allows formats like: (123) 456-7890, 123-456-7890, 1234567890
 * @param {String} phone - Phone number to validate
 * @returns {Boolean} True if valid, false otherwise
 */
export const validatePhone = (phone) => {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return re.test(String(phone));
};

/**
 * Validates required fields in a form object
 * @param {Object} formData - Form data object
 * @param {Array} requiredFields - Array of field names that are required
 * @returns {Object} { isValid: boolean, errors: Object }
 */
export const validateForm = (formData, requiredFields) => {
  const errors = {};
  
  requiredFields.forEach(field => {
    if (!formData[field] || formData[field].trim() === '') {
      // Convert camelCase to Title Case for error message
      const fieldName = field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      errors[field] = `${fieldName} is required`;
    }
  });

  // Specific validation for email if present
  if (formData.email && !validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Specific validation for phone if present
  if (formData.phone && !validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
