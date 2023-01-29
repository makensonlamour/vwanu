import app from '../../src/app';

describe("'call ' service", () => {
  it.skip('registered the service', () => {
    const service = app.service('call');
    expect(service).toBeTruthy();
  });
});
