export type RetAsyncCatch = (req: any, res: any, next: any) => void;
export const AsyncCatch = (fn: Function) => {
  return (req: any, res: any, next: any): void => {
    fn(req, res, next).catch(next);
  };
};

// module.exports = fn => {
//   return (req, res, next) => {
//     fn(req, res, next).catch(next);
//   };
// };
