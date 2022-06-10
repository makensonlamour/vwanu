import { Application } from '../declarations';
/** Local dependencies */
import post from './posts/posts.service';
import users from './users/users.service';
import search from './search/search.service';
import mailer from './mailer/mailer.service';
import friend from './friends/friends.service';
import comments from './comments/comments.service';
import followers from './followers/followers.service';
import userVisitors from './userVisitors/user-visitors.service';
import friendRequest from './friendRequest/friendRequests.service';
import refreshTokens from './refresh-tokens/refresh-tokens.service';
import emailTemplate from './email-template/email-template.service';
import undesiredFriend from './undesiredFriends/undesiredFriends.service';
import authmanagementService from './authmanagement/authmanagement.service';
import reaction from './reactions/reaction.service';

import timeline from './timeline/timeline.service';

import groups from './groups/groups.service';

import blogs from './blogs/blogs.service';

import timelineBlogs from './timeline-blogs/timeline-blogs.service';

import albums from './albums/albums.service';

import notification from './notification/notification.service';

import interests from './interests/interests.service';
import medias from './medias/medias.service';

import communities from './communities/communities.service';

import discussion from './discussion/discussion.service';

import blogResponse from './blog-response/blog-response.service';

export default function (app: Application): void {
  app.configure(search);
  app.configure(post);
  app.configure(users);
  app.configure(friend);
  app.configure(mailer);
  app.configure(timeline);
  app.configure(comments);
  app.configure(followers);
  app.configure(refreshTokens);
  app.configure(emailTemplate);
  app.configure(userVisitors);
  app.configure(friendRequest);
  app.configure(undesiredFriend);
  app.configure(authmanagementService);
  app.configure(groups);
  app.configure(blogs);
  app.configure(timelineBlogs);
  app.configure(albums);
  app.configure(notification);
  app.configure(reaction);
  app.configure(interests);
  app.configure(medias);
  app.configure(communities);
  app.configure(discussion);
  app.configure(blogResponse);
}
