export const customerValidation = {
  name: {
    required: 'Customer name is required',
    minLength: {
      value: 3,
      message: 'Name must be at least 3 characters'
    },
    maxLength: {
      value: 100,
      message: 'Name must not exceed 100 characters'
    }
  },
  address: {
    required: 'Customer address is required',
    minLength: {
      value: 10,
      message: 'Address must be at least 10 characters'
    },
    maxLength: {
      value: 500,
      message: 'Address must not exceed 500 characters'
    }
  },
  gst: {
    pattern: {
      value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      message: 'Invalid GST format'
    }
  }
};

export const itemValidation = {
  description: {
    required: 'Item description is required',
    maxLength: {
      value: 200,
      message: 'Description must not exceed 200 characters'
    }
  },
  qty: {
    required: 'Quantity is required',
    min: {
      value: 1,
      message: 'Quantity must be at least 1'
    },
    max: {
      value: 9999,
      message: 'Quantity must not exceed 9999'
    }
  },
  price: {
    required: 'Price is required',
    min: {
      value: 0,
      message: 'Price cannot be negative'
    },
    max: {
      value: 9999999,
      message: 'Price must not exceed 99,99,999'
    }
  },
  totalWithGST: {
    required: 'Total amount is required',
    min: {
      value: 0,
      message: 'Total amount cannot be negative'
    },
    max: {
      value: 9999999,
      message: 'Total amount must not exceed 99,99,999'
    }
  }
};

export const validateGST = (gst) => {
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstRegex.test(gst);
};

export const validatePAN = (pan) => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan);
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};