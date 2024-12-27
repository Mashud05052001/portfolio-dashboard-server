import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import { jwtHelper } from '../utils/jwtToken';
import catchAsync from '../utils/catchAsync';
import { User } from '../modules/user/user.model';

const auth = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = (req?.headers?.authorization as string)?.split(' ')[1];
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Token is missing!');
    }
    const decoded = jwtHelper.verifyAccessToken(token) as JwtPayload;
    const user = await User.findOne({
      email: decoded?.email,
      role: decoded?.role,
    });
    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access');
    }
    req.user = decoded as JwtPayload;
    next();
  },
);

export default auth;
