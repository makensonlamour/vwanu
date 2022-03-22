import Post from './post.service';
import db from '../../models';

describe('Post service _reading in db', () => {
  const postText = ' I am a new post text ';
  let postId: number | null = null;
  const or = 'original from post';

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

  it('should create a post with Media', async () => {
    const postWithImage = await db.Post.create(
      { postText, Media: [{ original: or }, { original: or + 200 }] },
      { include: [db.Media] }
    );

    expect(postWithImage.Media).toBeDefined();
    expect(postWithImage.Media.length).toEqual(2);
  });
  it('should find the media', async () => {
    const media = await db.Media.findOne({ where: { original: or + 200 } });
    expect(media).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        original: expect.any(String),
      })
    );
  });

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
