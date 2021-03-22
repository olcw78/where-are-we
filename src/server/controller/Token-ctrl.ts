import jwt from "jsonwebtoken";

class TokenCtrl {
  static readonly jwtSecret: string = process.env.JWT_SECRET!;
  static readonly jwtExpiresIn: string = process.env.JWT_EXPIRES_IN!;

  private static SignAndGetToken(id: string): string {
    return jwt.sign({ id }, TokenCtrl.jwtSecret, {
      expiresIn: TokenCtrl.jwtExpiresIn,
    });
  }

  public static CreateAndSendToken(
    user: any,
    statusCode: number,
    response: any
  ): any {
    const token: string = TokenCtrl.SignAndGetToken(user._id);
    const expiresIn = parseInt(this.jwtExpiresIn);
    const msToDay: number = 24 * 60 * 60 * 1000;
    const cookieOption = {
      expires: new Date(Date.now() + expiresIn * msToDay),
      // httpOnly: true,
    };

    // if (process.env.NODE_ENV === "production") {
    //   cookieOptions.secure = true;
    // }

    response.cookie("jwt", token, cookieOption);

    // Remove the password from the output.
    user.password = undefined;

    return response.status(statusCode).json({
      status: "success",
      token,
      data: { user },
    });
  }
}

export default TokenCtrl;
