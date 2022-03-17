import config from 'config';
import { nanoid } from 'nanoid';
import { Response, Request } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';


// Custom requirements
import AppError from '../../errors';
import Log from '../../lib/utils/logger';
import common from '../../lib/utils/common';
import sendEmail from '../../lib/utils/mailer';
import userService from '../../services/user/dataProvider';
import {
  UpUserInterface as UserInterface,
  CreateUserInput,
  VerifyUserInput,
  GetUserInput,
  ForgotPasswordInput,
  ResetPasswordInput,
} from '../../schema/user';

const template = {
  subject: 'I am sub',
  body: "from '../../seed/emailTemplates/confirmAccount.json' {link};",
};

const { catchAsync, sendResponse } = common;

const toReturn = (user: any): Partial<UserInterface> => ({
  id: user.id,
  email: user.email,
  activationKey: user.activationKey,
  resetPasswordKey: user.resetPasswordKey,
  verified: user.verified,
  firstName: user.firstName,
  lastName: user.lastName,
  avatar: user.avatar,
  coverPicture: user.coverPicture,
  profilePicture: user.profilePicture,
  backgroundImage: user.backgroundImage,
  //   // user.backgroundImageStatus,
  address: user.address,
  //   // user.working,
  //   // user.workingLink,
  //   // user.about,
  //   // user.school,
  gender: user.gender,
  birthday: user.birthday,
  //   // user.countryId,
  //   // user.website,
  //   // user.facebook,
  //   // user.google,
  //   // user.twitter,
  //   // user.linkedin,
  //   // user.youtube,
  //   // user.vk,
  //   // user.instagram,
  //   // user.qq,
  //   // user.wechat,
  //   // user.discord,
  //   // user.mailru,
  language: user.language,
  //   // user.followPrivacy,
  //   // user.friendPrivacy,
  //   // user.postPrivacy,
  //   // user.messagePrivacy,
  //   // user.lastSeenPrivacy,
  active: user.active,
  admin: user.admin,
});


interface MulterRequest extends Request {
  files: any;
}
export default {
  createOne: catchAsync(
    async (
      req: Request<CreateUserInput['params'], {}, CreateUserInput['body']>,
      res: Response
    ) => {
      try {
        const { password, ...data } = req.body;
        const documentFiles = (req as MulterRequest).files;

        console.log('Checking for pictures ');
        if (documentFiles?.profilePicture || documentFiles?.coverPicture) {

          const photosArray = ['profilePicture', 'coverPicture'];
          photosArray.forEach((photoGroup) => {
            if (documentFiles[photoGroup])
              data[photoGroup] = documentFiles[photoGroup][0].path;
          });

        }
        const user: UserInterface = await userService.createUser(
          data,
          password
        );

        const link = `https://test.com/verify/${user.id}/${user.activationKey}`;

        try {
          await sendEmail({
            to: user.email,
            from: config.get('sendEmailFrom') || 'test@example.com',
            subject: template.subject,
            html: template.body.replace(/\{link}/g, link),
          });
        } catch (error) {
          Log.error(
            `Error sending email  when creating user code: ${error.code} message: ${error.message}`
          );
        } finally {
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
        }
      } catch (err: Error | null | any) {
        Log.error(err);
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

        // eslint-disable-next-line global-require
        // const template = require('../../seed/emailTemplates/confirmAccount.json');
        const link = `https://test.com/verify/${user.id}/${user.resetPasswordKey}`;
        try {
          await sendEmail({
            to: user.email,
            from: config.get('sendEmailFrom'),
            subject: template.subject,
            html: template.body.replace(/\{link}/g, link),
          });
        } catch (error) {
          Log.error(
            `Error sending email  when forgot user password: ${error.code} message: ${error.message}`
          );
        } finally {
          Log.info(`Password reset email sent to user ${user.id}`);
          sendResponse(
            res,
            StatusCodes.OK,
            {},
            'A reset password email was sent to your email on file'
          );
        }
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
