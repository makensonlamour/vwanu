// import config from 'config';
import { nanoid } from 'nanoid';
import { Response, Request } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

// Custom requirements
import AppError from '../../errors';
import Log from '../../lib/utils/logger';
import common from '../../lib/utils/common';
// import sendEmail from '../../lib/utils/mailer';
import userService from '../../services/user/dataProvider';
import {
  UserInterface,
  CreateUserInput,
  VerifyUserInput,
  GetUserInput,
  ForgotPasswordInput,
  ResetPasswordInput,
} from '../../schema/user';

const { catchAsync, sendResponse } = common;

const toReturn = (user: UserInterface): Partial<UserInterface> => ({
  id: user.id,
  email: user.email,
  verified: user.verified,
});
export default {
  createOne: catchAsync(
    async (req: Request<{}, {}, CreateUserInput>, res: Response) => {
      try {
        const user: UserInterface = await userService.createUser(
          req.body,
          req.body.password
        );
        Log.info('sent');
        // sendEmail({
        //   to: user.email,
        //   from: config.get<string>('sendEmailFrom') || 'test@example.com',
        //   subject: 'Verify your email',
        //   text: `Activation key: ${user.activationKey}. Id: ${user.id}`,
        // });

        await userService.loginUser(
          user,
          (err: Error | null, token: string | undefined) => {
            if (!token && err)
              throw new AppError(
                err.message,
                StatusCodes.INTERNAL_SERVER_ERROR
              );

            return sendResponse(
              res,
              StatusCodes.CREATED,
              { user: toReturn(user), token },
              ReasonPhrases.CREATED
            );
          }
        );
      } catch (err: Error | null | any) {
        // console.log('Error registering a user');
        throw new AppError(err?.message, StatusCodes.BAD_REQUEST);
      }
    }
  ),
  getOne: catchAsync(async (req: Request<GetUserInput>, res: Response) => {
    try {
      const user: UserInterface = await userService.getUser(req.params.id);

      sendResponse(
        res,
        StatusCodes.OK,
        { user: toReturn(user) },
        ReasonPhrases.OK
      );
    } catch (error) {
      throw new AppError(
        error?.message || ReasonPhrases.NOT_FOUND,
        StatusCodes.NOT_FOUND
      );
    }
  }),
  verifyOne: catchAsync(
    async (req: Request<VerifyUserInput>, res: Response) => {
      const { id } = req.params;
      const { activationKey } = req.params;
      try {
        const user: UserInterface = await userService.getUser(id);
        if (!user)
          throw new AppError(ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND);
        // console.log('Is user verified ', user.verified);
        if (user.verified)
          throw new AppError('User already verified', StatusCodes.CONFLICT);
        if (user.activationKey !== activationKey)
          throw new AppError('Invalid activation key', StatusCodes.BAD_REQUEST);
        await userService.updateUser(user, {
          verified: true,
          activationKey: null,
        });

        // console.log('User updated, is verified now', user.verified);

        return sendResponse(
          res,
          StatusCodes.OK,
          { user: toReturn(user) },
          'user verified'
        );
      } catch (error) {
        throw new AppError(error.message, StatusCodes.BAD_REQUEST);
      }
    }
  ),

  forgotPassword: catchAsync(
    async (req: Request<{}, {}, ForgotPasswordInput>, res: Response) => {
      const { email } = req.body;
      try {
        const user: UserInterface = await userService.findUserByEmail(email);
        if (!user) {
          Log.debug(`User with email address ${email} does not exist`);
          throw new AppError('Invalid email', StatusCodes.NOT_FOUND);
        }

        if (!user.verified) {
          Log.debug(
            `User with email ${email} is still unverified and trying to change password`
          );
          throw new AppError(
            'Must be verified to change password',
            StatusCodes.BAD_REQUEST
          );
        }

        await userService.updateUser(user, { resetPasswordKey: nanoid() });
        Log.info('sent');
        // await sendEmail({
        //   to: user.email,
        //   from: config.get('sendEmailFrom') || 'test@example.com',
        //   subject: 'Reset your password',
        //   text: `Password reset code ${user.resetPasswordKey}, id: ${user.id}`,
        // });
        Log.info(`Password reset email sent to user ${user.id}`);
        sendResponse(
          res,
          StatusCodes.OK,
          {},
          'A reset password email was sent to your email on file'
        );
      } catch (error) {
        throw new AppError(
          `need to take care of ' ${error.message} code:  ${error.code}`,
          StatusCodes.BAD_REQUEST
        );
      }
    }
  ),

  resetPassword: catchAsync(
    async (
      req: Request<
        ResetPasswordInput['params'],
        {},
        ResetPasswordInput['body']
      >,
      res: Response
    ) => {
      const { id, resetPasswordKey } = req.params;
      const { password } = req.body;
      try {
        const user: UserInterface = await userService.getUser(id);
        if (
          !user ||
          !user.resetPasswordKey ||
          user.resetPasswordKey !== resetPasswordKey
        )
          throw new AppError(
            ReasonPhrases.BAD_REQUEST,
            StatusCodes.BAD_REQUEST
          );

        await userService.resetPassword(user.id, password);
        await userService.updateUser(user, { resetPasswordKey: null });

        sendResponse(
          res,
          StatusCodes.OK,
          { user: toReturn(user) },
          ReasonPhrases.ACCEPTED
        );
      } catch (error) {
        // take care of the error
      }
    }
  ),
};
