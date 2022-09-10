import app from '../../src/app';

describe('\'search-blog \' service', () => {
  it('registered the service', () => {
    const service = app.service('search-blog');
    expect(service).toBeTruthy();
  });
});
