import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { loginValidationSchema } from './user.validation';
import catchAsync from '../../utils/catchAsync';
import { TUser } from './user.interface';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { bcryptHelper } from '../../utils/bcryptPassword';
import sendResponse from '../../utils/sendResponse';
import { jwtHelper, TJwtPayload } from '../../utils/jwtToken';
import config from '../../config';

const router = Router();

router.post(
  '/login',
  validateRequest(loginValidationSchema),
  catchAsync(async (req, res) => {
    const payload = req?.body as Pick<TUser, 'email' | 'password'>;

    const isExist = await User.findOne({ email: payload?.email }).select(
      '+password',
    );
    if (!isExist) {
      throw new AppError(httpStatus?.BAD_REQUEST, 'Email not found.');
    }

    const isPasswordMatched =
      await bcryptHelper?.compareHashedPasswordWithPlainText(
        payload?.password,
        isExist?.password,
      );

    if (!isPasswordMatched) {
      throw new AppError(httpStatus.BAD_REQUEST, `Wrong Password`);
    }
    const jwtPayload: TJwtPayload = {
      email: isExist?.email,
      role: 'Admin',
    };
    const accessToken = jwtHelper.createJwtAccessToken(jwtPayload);
    const refreshToken = jwtHelper.createJwtRefreshToken(jwtPayload);
    res.cookie('refreshToken', refreshToken, {
      secure: config.node_env === 'production',
      httpOnly: true,
      sameSite: true,
      maxAge: 1000 * 60 * 60 * 24 * 90,
    });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User logged in successfully',
      data: accessToken,
    });
  }),
);

export const AuthRoutes = router;
