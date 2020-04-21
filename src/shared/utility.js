import store from '../store/store';

let lang = null;

store.subscribe(() => {
  lang = store.getState().ui.lang;
});

export const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties,
});

export const checkValidity = (value, rules) => {
  const valid = { value: true, message: null };

  if (rules === undefined || !rules) return { value: true, message: null };

  if (rules.required) {
    valid.value = value.trim() !== '' && valid.value;

    if (!valid.value && lang === 'en') {
      valid.message = ' is required.';
    } else if (!valid.value && lang === 'ru') {
      valid.message = ', требуется';
    } else {
      valid.message = '';
    }
  }

  if (rules.minLength) {
    valid.value = value.length >= rules.minLength && valid.value;

    if (!valid.value && lang === 'en') {
      valid.message = ` should be at least ${rules.minLength} charachters.`;
    } else if (!valid.value && lang === 'ru') {
      valid.message = `, требуемое количество симвоов ${rules.minLength}.`;
    } else {
      valid.message = '';
    }

    /* valid.message = !valid.value
      ? lang === 'en'
        ? ` should be at least ${rules.minLength} charachters.`
        : `, требуемое количество симвоов ${rules.minLength}.`
      : null; */
  }

  if (rules.isEmail) {
    const pattern = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
    valid.value = pattern.test(value) && valid.value;

    if (!valid.value && lang === 'en') {
      valid.message = ' is invalid.';
    } else if (!valid.value && lang === 'ru') {
      valid.message = ' недействительный.';
    } else {
      valid.message = '';
    }
  }
  return valid;
};
