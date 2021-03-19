class FormChecker {
  /**
   * (throw error)
   * prevent whitespace(blank) of comparer target string.
   * @param comparer
   */
  private static checkEmpty(comparer: string | null): void {
    if (comparer === "undefined") {
      throw new Error(`Form is empty: ${comparer}`);
    }
    if (FormChecker.isEmpty(comparer!)) {
      throw new Error(`Form is empty: ${comparer}`);
    }
  }

  static isEmpty(comparer: string): boolean {
    return comparer === "";
  }
  /**
   * ID within a general id format.
   * e.g. english letters (lowercase, uppercase) (o)
   *      numbers (o)
   *      korean letters (x)
   *      french letters / Les lettres français avec l'accent (x)
   *      special characters (x)
   * @param comparer
   * @returns
   */
  static isValidID(comparer: string | null): boolean {
    FormChecker.checkEmpty(comparer);
    const regex = /[\w\d\S]{4,}/;
    return regex.test(comparer!);
  }
  /**
   * email within a general email format.
   * e.g. highp@naver.com
   *      james1231@gmail.com
   *      louis90@protonmail.ch
   *      ..
   * @param comparer
   * @returns
   */
  static isValidEmail(comparer: string | null): boolean {
    FormChecker.checkEmpty(comparer);
    const regex = /[\w\d\S.-]+@\w\d\S]+.[com|net|ch|kr|gg|.]+/;
    return regex.test(comparer!);
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
  static isValidUserName(comparer: string | null): boolean {
    FormChecker.checkEmpty(comparer);
    //éÉèÈçÇàÀâÂêÊîÎôÔûÛïÏ
    const regex = /[\D\w\s]{2,}/;
    return regex.test(comparer!);
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
    comparer: string | null,
    withNationalCode: boolean = false
  ): boolean {
    FormChecker.checkEmpty(comparer);
    const regex = withNationalCode
      ? /+[\d]{2,3}[\d]{3,4}[\d]{3,4}/
      : /[\d]{2,3}[\d]{3,4}[\d]{3,4}/;
    return regex.test(comparer!);
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
  static isValidPassword(comparer: string | null): boolean {
    FormChecker.checkEmpty(comparer);
    const regex = /[\w\d!@#^&*]{8,}/;
    return regex.test(comparer!);
  }
}

export default FormChecker;
