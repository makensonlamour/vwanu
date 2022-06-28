import app from '../../src/app';

describe('\'community-Users \' service', () => {
  it('registered the service', () => {
    const service = app.service('community-users');
    expect(service).toBeTruthy();
  });
});
