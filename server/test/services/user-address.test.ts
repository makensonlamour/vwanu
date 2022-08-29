import app from '../../src/app';

describe('\'userAddress\' service', () => {
  it('registered the service', () => {
    const service = app.service('user-address');
    expect(service).toBeTruthy();
  });
});
