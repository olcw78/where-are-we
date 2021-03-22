import { User } from "../model/User-model";
import { AsyncCatch, RetAsyncCatch } from "../util/Async-catch";

import AppError from "../util/App-error";
import TokenCtrl from "./Token-ctrl";

class AuthCtrl {
  Signup(req: any, res: any, next: any): RetAsyncCatch {
    return AsyncCatch(async () => {
      const user = await User.create({
        id: req.body.id,
        username: req.body.username,
        email: req.body.email,
        phoneNum: req.body.phonenum,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        // passwordChangedAt: req.body.passwordChangedAt,
      });

      if (!user) {
        return next(new AppError("user creation failed!", 400));
      }

      TokenCtrl.CreateAndSendToken(user, 201, res);
    });
  }

  Login(req: any, res: any, next: any): RetAsyncCatch {
    return AsyncCatch(async () => {
      const { id, email, pw } = req.body;

      // Check whether user exists and pw is correct
      let noEmpty = (id ?? email) !== "";
      noEmpty = pw !== "";

      if (!noEmpty) {
        return next(new AppError("Provide (email or id and password!", 400));
      }

      // look up the user with id or email
      let user: any = await User.findOne({ email })?.select("+password");
      if (!user) {
        user = await User.findOne({ id })?.select("+password");
      }

      if (!user || !(await user.isCorrectPassword(pw, user.password))) {
        return next(new AppError("Inccrect Email/Id or password!", 401));
      }

      TokenCtrl.CreateAndSendToken(user, 200, res);
    });
  }
}

export default AuthCtrl;

// const SignAndGetToken = (id: string): string =>
//   jwt.sign({ id }, process.env.JWT_SECRET!, {
//     expiresIn: process.env.JWT_EXPIRES_IN!,
//   });
//
// const createAndSendToken = (user: any, statusCode: number, res: any): any => {
//   const token = SignAndGetToken(user._id);
//
//   const expiresIn = parseInt(process.env.JWT_EXPIRES_IN!);
//   const cookieOptions = {
//     expires: new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000),
//     // httpOnly: true,
//   };
//
//   // if (process.env.NODE_ENV === "production") {
//   //   cookieOptions.secure = true;
//   // }
//
//   res.cookie("jwt", token, cookieOptions);
//
//   // Remove the password from the output
//   user.password = undefined;
//
//   return res.status(statusCode).json({
//     status: "success",
//     token,
//     data: { user },
//   });
// };

// export const signup = AsyncCatch(async (req: any, res: any, _: any) => {
//   const user = await User.create({
//     id: req.body.id,
//     username: req.body.username,
//     email: req.body.email,
//     phoneNum: req.body.phonenum,
//     password: req.body.password,
//     passwordConfirm: req.body.passwordConfirm,
//     // passwordChangedAt: req.body.passwordChangedAt,
//   });

//   if (!user) {
//     return new AppError("user created failed!", 400);
//   }

//   createAndSendToken(user, 201, res);
// });

// export const login = AsyncCatch(async (req: any, res: any, next: any) => {
//   console.log("log in!", req.body);
//   const { id, email, pw: password } = req.body;

//   // Check if user exists and password is correct
//   let isGoodtoGo = (id ?? email) !== "";
//   isGoodtoGo = password !== "";

//   if (!isGoodtoGo) {
//     return next(
//       new AppError("Please provide (email or id) and password!", 400)
//     );
//   }

//   // Check if user exists and password is correct
//   let user: any = await User.findOne({ email })?.select("+password");
//   if (!user) {
//     user = await User.findOne({ id })?.select("+password");
//   }

//   if (!user || !(await user.isCorrectPassword(password, user.password))) {
//     return next(new AppError("Incorrect Email or password!", 401));
//   }

//   createAndSendToken(user, 200, res);
// });

// export const protect = AsyncCatch(async (req: any, res: any, next: any) => {
//   let token: string | undefined;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = (req.headers.authorization as string).split("Bearer")[1];
//   }

//   console.log(`token is ${token}`);
//   if (!token) {
//     return next(new AppError("Login failed! Please log in to get method", 401));
//   }

//   // Verify token
//   const decoded: any = await promisify<string, jwt.Secret>(jwt.verify)(
//     token,
//     process.env.JWT_SECRET!
//   );

//   // check if user still exists
//   const user: any = await User.findById(decoded.id);
//   if (!user) {
//     return next(new AppError("User not found!", 401));
//   }

//   if (user.isChangedPasswordAfterSigning(decoded.iat)) {
//     return next(
//       new AppError("User recently changed password! Please log in again.", 401)
//     );
//   }

//   // Grant access to protected router
//   req.user = user;
//   next();
// });

// export const restrictTo = (...roles: string[]) => {
//   return (req: any, res: any, next: any) => {
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new AppError("You are not authorized to access this action!", 401)
//       );
//     }
//     next();
//   };
// };

// module.exports.signup = signup;
// module.exports.login = login;
// module.exports.protect = protect;
// module.exports.restrictTo = restrictTo;
