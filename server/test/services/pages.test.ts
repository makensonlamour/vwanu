import app from '../../src/app';

describe('\'pages\' service', () => {
  it('registered the service', () => {
    const service = app.service('pages');
    expect(service).toBeTruthy();
  });
});
