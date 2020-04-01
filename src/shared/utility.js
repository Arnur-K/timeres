export const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties
});

export const checkValidity = (value, rules) => {
  let valid = { value: true, message: null };

  if (rules === undefined || !rules) return { value: true, message: null };

  if (rules.required) {
    valid.value = value.trim() !== "" && valid.value;
    valid.message = !valid.value ? "is required." : null;
  }

  if (rules.maxLength) {
    valid.value = value.length <= rules.maxLength && valid.value;
    valid.message = !valid.value
      ? `must not be longer than ${rules.maxLength} charachters.`
      : null;
  }

  if (rules.minLength) {
    valid.value = value.length >= rules.minLength && valid.value;
    valid.message = !valid.value
      ? `should be at least ${rules.minLength} charachters.`
      : null;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    valid.value = pattern.test(value) && valid.value;
    valid.message = !valid.value ? "is invalid." : null;
  }
  return valid;
};
