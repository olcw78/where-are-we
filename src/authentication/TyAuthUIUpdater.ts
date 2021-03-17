import { EAuthStatus } from "./EAuthStatus";
/**
 * remote caller for updating the auth UI after by EAuthStatus.
 */
// type TyUpdateAuthUI = (
//   authStatus: EAuthStatus,
//   newAuthUIEl: HTMLElement
// ) => void | unknown;
type TyUpdateAuthUI = (authStatus: EAuthStatus) => void | unknown;

export default TyUpdateAuthUI;
