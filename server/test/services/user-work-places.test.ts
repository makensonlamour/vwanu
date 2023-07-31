import app from '../../src/app';

describe('\'userWorkPlaces\' service', () => {
  it('registered the service', () => {
    const service = app.service('user-work-places');
    expect(service).toBeTruthy();
  });
});
