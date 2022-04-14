import config from 'config';
import { nanoid } from 'nanoid';
import { Op } from '@sequelize/core';
import { Response, Request } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

// Custom requirements
import db from '../../models';
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
import { ConfirmAccount, ResetPassword } from '../../seed/emailTemplates';

const { catchAsync, sendResponse } = common;

const excludes = { exclude: ['password', 'activationKey', 'resetPasswordKey'] };
const toReturn = (user: any): Partial<UserInterface> => ({
  id: user.id,
  email: user.email,
  verified: user.verified,
  firstName: user.firstName,
  lastName: user.lastName,
  avatar: user.avatar,
  coverPicture: user.coverPicture,
  profilePicture: user.profilePicture,
  backgroundImage: user.backgroundImage,
  backgroundImageStatus: user.backgroundImageStatus,
  address: user.address,
  working: user.working,
  workingLink: user.workingLink,
  about: user.about,
  school: user.school,
  gender: user.gender,
  birthday: user.birthday,
  country: user.country,
  countryId: user.countryId,
  website: user.website,
  facebook: user.facebook,
  google: user.google,
  twitter: user.twitter,
  linkedin: user.linkedin,
  youtube: user.youtube,
  vk: user.vk,
  instagram: user.instagram,
  qq: user.qq,
  wechat: user.wechat,
  discord: user.discord,
  mailru: user.mailru,
  language: user.language,
  followPrivacy: user.followPrivacy,
  friendPrivacy: user.friendPrivacy,
  postPrivacy: user.postPrivacy,
  messagePrivacy: user.messagePrivacy,
  lastSeenPrivacy: user.lastSeenPrivacy,
  active: user.active,
  admin: user.admin,
  interestedBy: user.interestedBy,
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

        const link = `${config.get('BASE_URL')}/verify-email/${user.id}/${
          user.activationKey
        }`;

        try {
          await sendEmail({
            to: user.email,
            from: config.get('sendEmailFrom'),
            subject: ConfirmAccount.subject,
            html: ConfirmAccount.body.replace(/\{link}/g, link),
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

  getProfile: catchAsync(async (req: Request, res: Response) => {
    const user = await userService.getUser(req.user.id, {
      attributes: excludes,
    });
    if (!user)
      throw new AppError('Your profile was not found', StatusCodes.NOT_FOUND);
    sendResponse(res, StatusCodes.OK, { user }, ReasonPhrases.OK);
  }),

  getOne: catchAsync(async (req: Request<GetUserInput>, res: Response) => {
    try {
      const requesterID = req.user.id.toString();
      const requestingID = req.params.id.toString();

      if (requesterID === requestingID)
        throw new AppError(
          'You cannot visit your one profile',
          StatusCodes.UNAUTHORIZED
        );
      const users = await db.User.findAll({
        where: { id: { [Op.or]: [requestingID, requesterID] } },
        include: [{ model: db.User, as: 'Visitor' }],
      });

      const requester = users.find(
        (user) => user.id.toString() === requesterID
      );
      const requesting = users.find(
        (user) => user.id.toString() === requestingID
      );

      await requesting.addVisitor(requester);
      sendResponse(
        res,
        StatusCodes.OK,
        { user: toReturn(requesting) },
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
      const { id } = req.user;
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

  updateOne: catchAsync(async (req: Request, res: Response) => {
    const noneModifiable = ['password', 'activationKey', 'resetPasswordKey'];

    const hasUnacceptable = noneModifiable.some((unacceptable) => {
      if (Object.prototype.hasOwnProperty.call(req.body, unacceptable))
        return true;
      return false;
    });

    if (hasUnacceptable)
      throw new AppError('The data provided are not accepted', 400);

    const data = req.body;
    const documentFiles = (req as MulterRequest).files;
    if (documentFiles?.profilePicture || documentFiles?.coverPicture) {
      const photosArray = ['profilePicture', 'coverPicture'];
      photosArray.forEach((photoGroup) => {
        if (documentFiles[photoGroup])
          data[photoGroup] = documentFiles[photoGroup][0].path;
      });
    }
    const user = await userService.getUser(req.params.id);
    if (!user)
      throw new AppError(ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND);

    await userService.updateUser(user, { ...data });

    sendResponse(res, StatusCodes.OK, { user: toReturn(user) }, 'we are good ');
  }),

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
            `User with email ${email} is still unverified cannot change his password`
          );
          throw new AppError(
            'Must be verified to change password',
            StatusCodes.BAD_REQUEST
          );
        }

        await userService.updateUser(user, { resetPasswordKey: nanoid() });

        const link = `${config.get('BASE_URL')}/reset-password/${user.id}/${
          user.resetPasswordKey
        }`;

        try {
          await sendEmail({
            to: user.email,
            from: config.get('sendEmailFrom'),
            subject: ResetPassword.subject,
            html: ResetPassword.body.replace(/\{link}/g, link),
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
  addOrRemoveFollowing: catchAsync(async (req, res) => {
    const { id, friendId } = req.params;
    const { action } = req.query;
    const user: any = await userService.getUser(id, {
      include: [
        {
          model: db.User,
          as: 'friends',
          attributes: ['id', 'firstName', 'lastName'],
        },
        {
          model: db.User,
          as: 'friendsRequest',
          attributes: ['id', 'firstName', 'lastName'],
        },
        {
          model: db.User,
          as: 'Following',
          attributes: ['id', 'firstName', 'lastName'],
        },
        {
          model: db.User,
          as: 'Follower',
          attributes: ['id', 'firstName', 'lastName'],
        },
      ],
    });
    const friend: any = await userService.getUser(friendId);
    if (!user || !friend)
      throw new AppError(
        'The friend or user are not found ',
        StatusCodes.NOT_FOUND
      );

    const alreadyFollowing = await user.hasFollowing(user);
    let alreadyFiends = await Promise.all([
      friend.hasFriend(user),
      user.hasFriend(friend),
    ]);
    alreadyFiends = alreadyFiends[0] && alreadyFiends[1];

    if (action === 'follow') {
      if (alreadyFollowing)
        throw new AppError(
          'You are already following this person',
          StatusCodes.BAD_REQUEST
        );

      if (alreadyFiends)
        throw new AppError(
          'They are already friends meaning you are following each and other',
          StatusCodes.BAD_REQUEST
        );
      await user.addFollower(user);
      await friend.addFollowing(friend);
    }
    const newU = await user.reload();
    sendResponse(res, StatusCodes.OK, { user: newU }, 'okd');
  }),
  addOrRemoveFollower: catchAsync(async (req, res) => {
    const { id, friendId } = req.params;
    const { action } = req.query;
    const user: any = await userService.getUser(id, {
      include: [
        {
          model: db.User,
          as: 'friends',
          attributes: ['id', 'firstName', 'lastName'],
        },
        {
          model: db.User,
          as: 'friendsRequest',
          attributes: ['id', 'firstName', 'lastName'],
        },
        {
          model: db.User,
          as: 'Following',
          attributes: ['id', 'firstName', 'lastName'],
        },
      ],
    });
    const friend: any = await userService.getUser(friendId);
    if (!user || !friend)
      throw new AppError(
        'The friend or user are not found ',
        StatusCodes.NOT_FOUND
      );

    const alreadyFollowing = await user.hasFollowing(user);
    let alreadyFiends = await Promise.all([
      friend.hasFriend(user),
      user.hasFriend(friend),
    ]);
    alreadyFiends = alreadyFiends[0] && alreadyFiends[1];

    if (action === 'follow') {
      if (alreadyFollowing)
        throw new AppError(
          'You are already following this person',
          StatusCodes.BAD_REQUEST
        );

      if (alreadyFiends)
        throw new AppError(
          'They are already friends meaning you are following each and other',
          StatusCodes.BAD_REQUEST
        );
      await friend.addFollower(user);
      await user.addFollowing(friend);
    }
    const newU = await user.reload();
    sendResponse(res, StatusCodes.OK, { user: newU }, 'okd');
  }),
  addOrRemoveFriendRequest: catchAsync(async (req: Request, res: Response) => {
    const { id, friendId } = req.params;
    const { action } = req.query;

    const requester: any = await userService.getUser(id, {
      include: [
        {
          model: db.User,
          as: 'friends',
          attributes: ['id', 'firstName', 'lastName'],
        },
        {
          model: db.User,
          as: 'friendsRequest',
          attributes: ['id', 'firstName', 'lastName'],
        },
      ],
    });
    const friend: any = await userService.getUser(friendId);

    if (!requester || !friend)
      throw new AppError(
        'The friend or user are not found ',
        StatusCodes.NOT_FOUND
      );
    let alreadyFiends = await Promise.all([
      friend.hasFriend(requester),
      requester.hasFriend(friend),
    ]);
    alreadyFiends = alreadyFiends[0] && alreadyFiends[1];
    if (alreadyFiends)
      throw new AppError('They are already friends', StatusCodes.BAD_REQUEST);
    const requestedFriendship = await friend.hasFriendsRequest(requester);

    if (action === 'add-friend') {
      if (requestedFriendship)
        throw new AppError(
          'You already requested to be friends',
          StatusCodes.BAD_REQUEST
        );
      await friend.addFriendsRequest(requester);
    } else if (action === 'remove-friend') {
      await friend.removeFriendsRequest(requester);
    }

    const newU = await requester.reload();
    sendResponse(res, StatusCodes.OK, { user: newU }, 'okd');
  }),
  addOrRemoveFriend: catchAsync(async (req: Request, res: Response) => {
    const { id, friendId } = req.params;
    const { action } = req.query;

    const user: any = await userService.getUser(id, {
      include: [
        {
          model: db.User,
          as: 'friends',
          attributes: ['id', 'firstName', 'lastName'],
        },
      ],
    });
    const friend: any = await userService.getUser(friendId);

    if (!user || !friend)
      throw new AppError(
        'The friend or user are not found ',
        StatusCodes.NOT_FOUND
      );

    const hasRequest = await user.hasFriendsRequest(friend);
    if (!hasRequest)
      throw new AppError('There is no friend request', StatusCodes.BAD_REQUEST);
    let alreadyFiends = await Promise.all([
      friend.hasFriend(user),
      user.hasFriend(friend),
    ]);
    alreadyFiends = alreadyFiends[0] && alreadyFiends[1];
    if (action === 'add-friend') {
      if (alreadyFiends)
        throw new AppError('They are already friends', StatusCodes.BAD_REQUEST);

      await user.addFriend(friend);
      await friend.addFriend(user);
      await user.addFollowing(friend);
      await friend.addFollowing(user);
      await user.addFollower(friend);
      await friend.addFollower(user);
    } else {
      if (!alreadyFiends)
        throw new AppError(
          'You cannot unfriend , you have not been friend',
          StatusCodes.BAD_REQUEST
        );
      await user.removeFriend(friend);
      await friend.removeFriend(user);
    }
    const newU = await user.reload();

    sendResponse(res, StatusCodes.OK, { user: newU }, 'okd');
  }),

  getTimeline: catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.id;

    const user: any = await userService.getUser(userId);
    const followings = await user.getFollowing();
    const followingIds = followings.map((following) => following.id);

    followingIds.push(userId);

    const posts = await db.Post.findAll({
      where: { UserId: { [Op.or]: followingIds } },
      include: [{ model: db.Post, as: 'Comments' }],
    });

    sendResponse(
      res,
      StatusCodes.OK,
      { posts, pages: [], groups: [] },
      ReasonPhrases.OK
    );
  }),
};
