import Post from './post.service';
import db from '../../models';
import { PostInterface } from '../../schema/post';

describe('Post service _reading in db__', () => {
  const postText = ' I am a new post text ';
  let postId: number | null = null;
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  it('should create a post', async () => {
    const post: PostInterface = await Post.createOne({
      userId: 89,
      postText,
    });
    postId = post.id;
    expect(post).toEqual(
      expect.objectContaining({
        postText,
        id: expect.any(Number),
        private: false,
      })
    );
  });
  it('should find a post by the post id ', async () => {
    const post = await Post.findOne(postId);
    expect(post).toEqual(
      expect.objectContaining({
        postText,
        id: 1,
        private: false,
      })
    );
  });
});
