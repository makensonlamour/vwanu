import app from '../../src/app';

describe('\'timelineBlogs\' service', () => {
  it('registered the service', () => {
    const service = app.service('timeline-blogs');
    expect(service).toBeTruthy();
  });
});
