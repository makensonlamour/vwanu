import app from '../../src/app';

describe('\'state \' service', () => {
  it('registered the service', () => {
    const service = app.service('state');
    expect(service).toBeTruthy();
  });
});
