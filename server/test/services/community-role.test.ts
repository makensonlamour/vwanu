import app from '../../src/app';

describe('\'community-role\' service', () => {
  it('registered the service', () => {
    const service = app.service('community-role');
    expect(service).toBeTruthy();
  });
});
