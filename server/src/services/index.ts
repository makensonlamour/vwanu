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

import korem from './korem/korem.service';

import blogKorem from './blog-korem/blog-korem.service';

import services from './services/services.service';

import communityUsers from './community-users/community-users.service';

import communityRole from './community-role/community-role.service';

import communityInvitationRequest from './community-invitation-request/community-invitation-request.service';

import registration from './communityRegistration/communityRegistration.service';

import communityJoin from './community-join/community-join.service';

import conversation from './conversation/conversation.service';

import message from './message/message.service';

import convesationUsers from './convesation-users/convesation-users.service';

import country from './country/country.service';

import state from './state/state.service';

import city from './city/city.service';

import street from './street/street.service';

import address from './address/address.service';

import addressTypes from './address-types/address-types.service';

import userAddress from './user-address/user-address.service';

import searchBlog from './search-blog/search-blog.service';

import searchCommunity from './search-community/search-community.service';

import forumCategories from './forum-categories/forum-categories.service';
import call from './call/call.service';

import templates from './templates/templates.service';

export default function (app: Application): void {
  app.configure(search);
  app.configure(call);
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
  app.configure(korem);
  app.configure(blogKorem);
  app.configure(services);
  app.configure(communityUsers);
  app.configure(communityRole);
  app.configure(communityInvitationRequest);
  app.configure(registration);
  app.configure(communityJoin);
  app.configure(conversation);
  app.configure(message);
  app.configure(convesationUsers);
  app.configure(country);
  app.configure(state);
  app.configure(city);
  app.configure(street);
  app.configure(address);
  app.configure(addressTypes);
  app.configure(userAddress);
  app.configure(searchBlog);
  app.configure(searchCommunity);
  app.configure(forumCategories);
  app.configure(templates);
}
