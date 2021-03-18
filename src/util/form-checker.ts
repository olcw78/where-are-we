class FormChecker {
  /**
   * email within a general email format.
   * e.g. highp@naver.com
   *      james1231@gmail.com
   *      louis90@protonmail.ch
   *      ..
   * @param comparer
   * @returns
   */
  static isValidEmail(comparer: string): boolean {
    const regex = /^[a-zA-Z0-9.-]+@[a-zA-Z0-9]+.[com|net|ch|kr|gg|.]+$/;
    return regex.test(comparer);
  }
  /**
   * user name within a general name (english/korean/french).
   *  e.g. 김첨지
   *       James bordin
   *       Eloïse lefevre
   *       Jean françois
   * @param comparer
   * @returns
   */
  static isValidUserName(comparer: string): boolean {
    const regex = /^[a-zA-Z가-힣 éÉèÈçÇàÀâÂêÊîÎôÔûÛïÏ]$/;
    return regex.test(comparer);
  }
  /**
   * phone number within a usual korean format.
   * e.g. 010-2232-4215
   *      02-232-4590
   *      031-234-1508
   * @param comparer
   * @returns
   */
  static isValidPhoneNumber(
    comparer: string,
    withNationalCode: boolean = false
  ): boolean {
    const regex = withNationalCode
      ? /^+[0-9]{3}{2,3}-[0-9]{3,4}-[0-9]{3,4}$/
      : /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{3,4}$/;
    return regex.test(comparer);
  }
  /**
   * password wihtin a permission.
   * lowercase letters (o)
   * uppercase letters (o)
   * numbers (o)
   * korean letters (x)
   * french letters with accents / Les lettres avec l'accent (x)
   * special characters (! @ # ^ & *, the other else not permitted) (o | x)
   * space/blank (x)
   * @param comparer
   */
  static isValidPassword(comparer: string): boolean {
    const regex = /^[a-zA-Z0-9!@#^&*]$/;
    return regex.test(comparer);
  }
}
