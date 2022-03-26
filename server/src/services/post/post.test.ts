import { Op } from '@sequelize/core';

import Post from './post.service';
import db from '../../models';

describe('Post service _reading in database', () => {
  const postText = ' I am a new post text ';
  let postId: number | null = null;
  const or = 'original from post 1';

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

    const postWithImage: any = await Post.createOne(
      { postText, Media: [{ original: or }, { original: or + 200 }] },
      { include: [db.Media] }
    );
    expect(postWithImage.Media).toBeDefined();
    expect(postWithImage.Media[0].tiny).toBeDefined();
    expect(postWithImage.Media.length).toEqual(2);
  });
  it('should find the Media', async () => {

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

  it('should find a post by any passed criteria ', async () => {
    const post: any = await Post.findMany(
      {
        [Op.and]: [
          { UserId: { [Op.not]: null } },
          { postText },
          { id: { [Op.gt]: 1 } },
        ],
      },
      { include: [{ model: db.Media }] }
    );

    expect(Array.isArray(post.rows)).toBeTruthy();
  }, 10000);
});
