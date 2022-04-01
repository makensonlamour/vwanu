/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { jest } from '@jest/globals';
import httpMocks from 'node-mocks-http';
import { StatusCodes } from 'http-status-codes';
import requireLogin from '.';

const next = jest.fn();

const res = httpMocks.createResponse();
describe('Require Login Middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should not allow connection without a token', () => {
    const req = httpMocks.createRequest({});
    requireLogin(req, res, next);
    expect(next).toBeCalledWith({
      message: 'Missing Authentication token',
      status: StatusCodes.BAD_REQUEST,
    });

    expect(next.mock.calls.length).toBe(1);
  });
  it('should not allow connection with invalid token', () => {
    const req = httpMocks.createRequest({
      headers: {
        'x-auth-token': 'randomWordsForToken',
      },
    });

    requireLogin(req, res, next);
    expect(next.mock.calls.length).toBe(1);
    expect(next).toBeCalledWith({
      message: 'jwt malformed',
      status: StatusCodes.UNAUTHORIZED,
    });
  });
  it('should not allow connection with an expired token', () => {
    const req = httpMocks.createRequest({
      headers: {
        'x-auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxfSwiaWF0IjoxNjQ4NTQ1OTEzLCJleHAiOjE2NDg1NDk1MTN9.EfaS1NKsglfU4yJrnvxccAiJe5uknfl5u8HcRjs2UXQ',
      },
    });

    requireLogin(req, res, next);
    expect(next.mock.calls.length).toBe(1);
    expect(next).toBeCalledWith({
      message: 'invalid signature',
      status: StatusCodes.UNAUTHORIZED,
    });
  });
});
