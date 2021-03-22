import jwt from "jsonwebtoken";
import { promisify } from "util";
import process from "process";
import crypto from "crypto";

import { User } from "../model/User-model";
import { AsyncCatch, RetAsyncCatch } from "../util/Async-catch";
import AppError from "../util/App-error";
import TokenCtrl from "../controller/Token-ctrl";

import ERestrictionRole from "./ERestrictionRole";

class RouteSecurity {
  static Protect(req: any, res: any, next: any): RetAsyncCatch {
    return AsyncCatch(async () => {
      if (
        !req.headers.authorization ||
        req.headers.authorization.startsWith("Bearer")
      ) {
        return next(new AppError("No Auth Info!", 401));
      }

      const token: string | undefined = (req.headers
        .authorization as string).split("Bearer")[1];

      if (!token) {
        return next(new AppError("Login failed!", 401));
      }

      // Vertify token!
      const decodedToken: any = await promisify<string, jwt.Secret>(jwt.verify)(
        token,
        TokenCtrl.jwtSecret
      );

      // Check whether user exists.
      const user: any = await User.findById(decodedToken.id);
      if (!user) {
        return next(new AppError("User not found!", 401));
      }

      if (user.isChangedPasswordAfterSigning(decodedToken.iat)) {
        return next(
          new AppError("User recently cnhange password! please ", 401)
        );
      }

      // Grant access to use protected route.
      // keep req is being noticed of user.
      req.user = user;
      next();
    });
  }

  static RestrictTo(...roles: ERestrictionRole[]) {
    return (req: any, res: any, next: any) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new AppError("You are not authorised to access this action!", 401)
        );
      }
      next();
    };
  }
}

export default RouteSecurity;

// export const protect = AsyncCatch(async (req: any, res: any, next: any) => {
//   let token: string | undefined;
//
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = (req.headers.authorization as string).split("Bearer")[1];
//   }
//
//   console.log(`token is ${token}`);
//   if (!token) {
//     return next(new AppError("Login failed! Please log in to get method", 401));
//   }
//
//   // Verify token
//   const decoded: any = await promisify<string, jwt.Secret>(jwt.verify)(
//     token,
//     process.env.JWT_SECRET!
//   );
//
//   // check if user still exists
//   const user: any = await User.findById(decoded.id);
//   if (!user) {
//     return next(new AppError("User not found!", 401));
//   }
//
//   if (user.isChangedPasswordAfterSigning(decoded.iat)) {
//     return next(
//       new AppError("User recently changed password! Please log in again.", 401)
//     );
//   }
//
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
