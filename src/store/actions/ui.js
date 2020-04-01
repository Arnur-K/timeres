import { TOGGLE_USER_MODAL } from "./actionTypes";

export const toggleUserModal = isBtn => ({
  type: TOGGLE_USER_MODAL,
  isBtn: isBtn
});
