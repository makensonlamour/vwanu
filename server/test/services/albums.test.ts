import app from '../../src/app';

describe('\'albums \' service', () => {
  it('registered the service', () => {
    const service = app.service('albums');
    expect(service).toBeTruthy();
  });
});
