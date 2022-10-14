import app from '../../src/app';

describe("'Reaction' service", () => {
  it('registered the service', () => {
    const service = app.service('reactions');
    expect(service).toBeTruthy();
  });
});
