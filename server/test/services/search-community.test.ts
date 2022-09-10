import app from '../../src/app';

describe('\'search-community\' service', () => {
  it('registered the service', () => {
    const service = app.service('search-community');
    expect(service).toBeTruthy();
  });
});
