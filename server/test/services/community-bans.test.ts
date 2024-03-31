import app from '../../src/app';

describe('\'community_bans \' service', () => {
  it('registered the service', () => {
    const service = app.service('community-bans');
    expect(service).toBeTruthy();
  });
});
