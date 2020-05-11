export const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties,
});

export const checkValidity = (value, rules) => {
  const valid = { value: true, message: null };

  if (rules === undefined || !rules) return { value: true, message: null };

  if (rules.required) {
    valid.value = value.trim() !== '' && valid.value;

    if (!valid.value) {
      valid.message = ' is required.';
    } else {
      valid.message = '';
    }
  }

  if (rules.minLength) {
    valid.value = value.length >= rules.minLength && valid.value;

    if (!valid.value) {
      valid.message = ` should be at least ${rules.minLength} charachters.`;
    } else {
      valid.message = '';
    }
  }

  if (rules.isEmail) {
    const pattern = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
    valid.value = pattern.test(value) && valid.value;

    if (!valid.value) {
      valid.message = ' is invalid.';
    } else {
      valid.message = '';
    }
  }
  return valid;
};
