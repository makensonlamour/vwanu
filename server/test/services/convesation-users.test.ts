import app from '../../src/app';

describe('\'conversation-users \' service', () => {
  it('registered the service', () => {
    const service = app.service('conversation-users');
    expect(service).toBeTruthy();
  });
});
