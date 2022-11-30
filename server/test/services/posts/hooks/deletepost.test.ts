/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import deletePost from '../../../../src/services/posts/hooks/deletePost';
// custom dependencies
import {
  getRandUser,
  getRandUsers,
} from '../../../../src/lib/utils/generateFakeUser';

// jest.mock('../../../../src/services/posts/hooks/deletePost');
function getMockContext(contextDetails) {
  const user = contextDetails?.user || getRandUser();
  return {
    params: {
      User: user,
    },
    id: contextDetails?.id || 1,
    service: {
      _get: jest.fn(),
    },
  };
}
const generateFakePost = (postDetails) => ({
  UserId: postDetails?.UserId || getRandUser().id,
  PostId: postDetails?.PostId || null,
  id: postDetails?.id || 1,
  postText: postDetails.postText || 'postText',
  wallId: postDetails?.wallId || null,
});
describe('Deleting post', () => {
  beforeAll(async () => {});
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should delete a post when the delete request comes from the post creator', async () => {
    const user = await getRandUser();
    const post = generateFakePost({ UserId: user.id });
    const context = getMockContext({ user, id: post.id });
    context.service._get.mockResolvedValueOnce(post);
    // @ts-ignore
    const returnContext = await deletePost(context);
    expect(context.service._get.mock.calls.length).toBe(1);
    expect(returnContext).toEqual(context);
  });

  it('should delete a comment when the delete request comes from the original post creator', async () => {
    const users = await getRandUsers(2);
    const post = generateFakePost({ UserId: users[0].id, id: 2 });
    const comment = generateFakePost({
      UserId: users[1].id,
      PostId: post.id,
      id: 3,
      postText: 'I am a comment',
    });
    const context = getMockContext({ user: users[0], id: comment.id });
    context.service._get.mockResolvedValueOnce(comment);
    context.service._get.mockResolvedValueOnce(post);
    // @ts-ignore
    const returnContext = await deletePost(context);
    expect(context.service._get.mock.calls.length).toBe(2);
    // The  argument of the first call to the function was the commentId
    expect(context.service._get.mock.calls[0][0]).toBe(comment.id);

    // The  argument of the second call to the function was the postId
    expect(context.service._get.mock.calls[1][0]).toBe(post.id);
    expect(returnContext).toEqual(context);
  });
  it('should delete a post if the delete request comes from the owner of the wall where the post is added', async () => {
    const users = await getRandUsers(2);
    const post = generateFakePost({ UserId: users[1].id, wallId: users[0].id });
    const context = getMockContext({ user: users[0], id: post.id });
    context.service._get.mockResolvedValueOnce(post);
    // @ts-ignore
    const returnContext = await deletePost(context);
    expect(context.service._get.mock.calls.length).toBe(1);
    expect(returnContext).toEqual(context);
  });
  /** Should not */
  it('should not delete a post if the delete request comes from someone else', async () => {
    const users = await getRandUsers(2);
    const post = generateFakePost({ UserId: users[0].id, id: 2 });
    const context = getMockContext({ user: users[1], id: post.id });
    context.service._get.mockResolvedValueOnce(post);
    // @ts-ignore
    await expect(deletePost(context)).rejects.toThrow();
    expect(context.service._get.mock.calls.length).toBe(1);
  });
  it('should not delete a comment if the delete request comes from someone else not the original poster', async () => {
    const users = await getRandUsers(3);
    const post = generateFakePost({ UserId: users[0].id, id: 2 });
    const comment = generateFakePost({
      UserId: users[1].id,
      PostId: post.id,
      id: 3,
      postText: 'I am a comment',
    });
    const context = getMockContext({ user: users[2], id: comment.id });
    context.service._get.mockResolvedValueOnce(comment);
    context.service._get.mockResolvedValueOnce(post);
    // @ts-ignore
    await expect(deletePost(context)).rejects.toThrow();
    expect(context.service._get.mock.calls.length).toBe(2);
  });
});
