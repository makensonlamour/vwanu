import app from '../../src/app';

describe('\'workplace \' service', () => {
  it('registered the service', () => {
    const service = app.service('workplace');
    expect(service).toBeTruthy();
  });
});
