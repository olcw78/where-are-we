import { EAuthStatus } from "./EAuthStatus";
import TyUserLoginResult from "./TyUserLoginResult";
/**
 * remote caller for updating the auth UI after by EAuthStatus.
 */
// type TyUpdateAuthUI = (
//   authStatus: EAuthStatus,
//   newAuthUIEl: HTMLElement
// ) => void | unknown;

type TyUpdateAuthUI = (
  authStatus: EAuthStatus,
  loginResult?: TyUserLoginResult
) => void | unknown;

export default TyUpdateAuthUI;
