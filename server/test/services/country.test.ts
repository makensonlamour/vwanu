import app from '../../src/app';

describe('\'country\' service', () => {
  it('registered the service', () => {
    const service = app.service('country');
    expect(service).toBeTruthy();
  });
});
