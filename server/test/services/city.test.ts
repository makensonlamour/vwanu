import app from '../../src/app';

describe('\'city \' service', () => {
  it('registered the service', () => {
    const service = app.service('city');
    expect(service).toBeTruthy();
  });
});
