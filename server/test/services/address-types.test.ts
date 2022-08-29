import app from '../../src/app';

describe('\'addressTypes\' service', () => {
  it('registered the service', () => {
    const service = app.service('address-types');
    expect(service).toBeTruthy();
  });
});
