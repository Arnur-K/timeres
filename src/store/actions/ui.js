import { TOGGLE_USER_MODAL, TOGGLE_LANGUAGE } from './actionTypes';

export const toggleUserModal = (isBtn) => ({
  type: TOGGLE_USER_MODAL,
  isBtn,
});

export const toggleLanguage = (lang) => ({
  type: TOGGLE_LANGUAGE,
  lang,
});
