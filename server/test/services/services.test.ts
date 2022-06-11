import app from '../../src/app';

describe('\'Services\' service', () => {
  it('registered the service', () => {
    const service = app.service('services');
    expect(service).toBeTruthy();
  });
});
