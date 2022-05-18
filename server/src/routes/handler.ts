import authRoute from './auth';
import userRoute from './user/user.routes';
import profileRoute from './profile';
import postRoute from './post';
import commentRoute from './Comments';
import reactionRoute from './reaction/reaction.routes';

export default (app) => {
  app.use('/api/auth', authRoute);
  app.use('/api/user', userRoute);
  app.use('/api/post', postRoute);
  app.use('/api/profile', profileRoute);
  app.use('/api/comment', commentRoute);
  app.use('/api/reaction', reactionRoute);
};
