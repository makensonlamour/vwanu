import app from '../../src/app';

describe("'country' service", () => {
  it('registered the service', () => {
    const service = app.service('country');
    expect(service).toBeTruthy();
  });

  it('should return a list of countries', async () => {
    const result = await app.service('country').find();
    expect(result).toBeTruthy();

    // {
    //   id: expect.any(String),
    //   name: expect.any(String),
    //   initials: expect.any(String),
    //   createdAt: expect.any(String),
    //   updatedAt: expect.any(String)
    // }
  });
});
