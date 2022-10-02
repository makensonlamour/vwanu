import app from '../../src/app';

describe('\'forumCategories \' service', () => {
  it('registered the service', () => {
    const service = app.service('forum-categories');
    expect(service).toBeTruthy();
  });
});
