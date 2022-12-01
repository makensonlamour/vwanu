/* eslint-disable no-underscore-dangle */
/* eslint-disable lines-between-class-members */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import registerService from '../../src/services';

// custom dependencies
import app from '../../src/app';

const mockedApp = {
  configure: jest.fn(),
};

export default class Service {
  _testServer;
  _endpoint;

  constructor(endpoint) {
    this._endpoint = endpoint;
    this._testServer = request(app);
  }

  /**
   *
   * @param details - The details of the resource to be created
   * @param token - the token of the user who is creating the resource
   * @returns - the server response
   */
  create(details, token) {
    return this._testServer
      .post(this._endpoint)
      .send(details)
      .set('authorization', token);
  }

  getList(token, query = null) {
    const endpoint = query ? `${this._endpoint}?${query}` : this._endpoint;

    return this._testServer.get(endpoint).set('authorization', token);
  }

  get(id, token) {
    return this._testServer
      .get(`${this._endpoint}/${id}`)
      .set('authorization', token);
  }

  patch(id, details, token) {
    return this._testServer
      .patch(`${this._endpoint}/${id}`)
      .send(details)
      .set('authorization', token);
  }

  /**
   *
   * @param id - id of the resource to be deleted
   * @param token - The token of the user who is deleting the resource
   * @returns - The response from the server
   */
  delete(id, token) {
    return this._testServer
      .delete(`${this._endpoint}/${id}`)
      .set('authorization', token);
  }
}

describe('Services', () => {
  it('should register all services', () => {
    // @ts-ignore
    registerService(mockedApp);
    expect(mockedApp.configure).toHaveBeenCalled();
  });
});
