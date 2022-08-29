import app from '../../src/app';

describe('\'street\' service', () => {
  it('registered the service', () => {
    const service = app.service('street');
    expect(service).toBeTruthy();
  });
});
