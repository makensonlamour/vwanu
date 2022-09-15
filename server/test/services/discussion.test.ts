import app from '../../src/app';

describe("'discussion ' service", () => {
  it('registered the service', () => {
    const service = app.service('discussion');

    expect(service).toBeTruthy();
  });
});
