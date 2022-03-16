import Post from './post.service';
import db from '../../models';

describe('Post service _reading in db', () => {
  const postText = ' I am a new post text ';
  let postId: number | null = null;
  beforeAll(async () => {
    await db.sequelize.sync({});
  });

  it('should create a post', async () => {
    const post: any = await Post.createOne({
      postText,
    });
    postId = post.id;
  
    expect(post).toEqual(
      expect.objectContaining({
        postText,
        id: expect.any(Number),
        privacyType: 'public',
      })
    );
  }, 10000);
  it('should find a post by the post id ', async () => {
    const post = await Post.findOne(postId);
    expect(post).toEqual(
      expect.objectContaining({
        postText,
        id: 1,
        privacyType: 'public',
      })
    );
  }, 10000);
});
