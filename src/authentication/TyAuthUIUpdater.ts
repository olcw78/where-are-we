import { EAuthStatus } from "./EAuthStatus";
import TyUserLoginData from "./login/TyUserLoginData";
/**
 * remote caller for updating the auth UI after by EAuthStatus.
 */
// type TyUpdateAuthUI = (
//   authStatus: EAuthStatus,
//   newAuthUIEl: HTMLElement
// ) => void | unknown;

type TyUpdateAuthUI = (
  authStatus: EAuthStatus,
  loginResult?: TyUserLoginData
) => void | unknown;

export default TyUpdateAuthUI;
