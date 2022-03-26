/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */

import httpMocks from 'node-mocks-http';
// import { StatusCodes } from 'http-status-codes';

// Core imports
import * as Post from './post.controller';
import db from '../../models';

describe('Controller post ', () => {
  const request = httpMocks.createRequest({
    method: 'POST',
    body: { postText: 'hello' },
  });

  beforeAll(async () => {
    await db.sequelize.sync({});
  });
  const response = httpMocks.createResponse({});

  it.skip('should create a post with just text', async () => {
    await Post.createOne(request, response, null);

    //  expect(response.statusCode).toBe(StatusCodes.CREATED);
    expect(response._isJSON()).toBe(true);
  });
  it.todo('should create a post with one Image');
  it.todo('should create a post with multiple image');
  it.todo('should create a post  and associate it with a user');
  it.todo('should create a post and associate it with page ');
  it.todo('should create a post and associate it with an event');
  it.todo('should retrieve a post with an id');
  it.todo('should retrieve post base on the userId ');
  it.todo('should retrieve a post base on the eventId');
  it.todo('should retrieve a post base on the pageId ');
  it.todo('should update a post');
});
