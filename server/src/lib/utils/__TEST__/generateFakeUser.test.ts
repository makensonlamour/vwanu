import {
  getRandUser,
  getRandUsers,
  generateFakeEmail,
} from '../generateFakeUser';

describe(' Fake users generator ', () => {
  test('should generate a random email', () => {
    const randomEmail1 = generateFakeEmail();
    const randomEmail2 = generateFakeEmail();

    const randomEmails = [randomEmail1, randomEmail2];

    expect(
      ['.', '@', 'inbox'].every((substring) =>
        randomEmails.every((email) => email.includes(substring))
      )
    ).toBe(true);
    expect(randomEmail1 !== randomEmail2).toBeTruthy();
  });
  test('should generate a random user ', () => {
    const randomUser1 = getRandUser();
    const randomUser2 = getRandUser();

    const randomUsers = [randomUser1, randomUser2];
    expect(randomUser1.id !== randomUser2.id).toBeTruthy();
    expect(
      randomUsers.every((rand) =>
        expect(rand).toMatchObject({
          id: expect.any(Number),
          email: expect.stringContaining('@'),
          gender: expect.any(String),
          ip_address: expect.any(String),
          password: expect.any(String),
          passwordConfirmation: expect.any(String),
          deviceId: expect.any(String),
        })
      )
    );
  });

  test('should generate 4 random users ', () => {
    const randomUsers = getRandUsers(4);

    expect(randomUsers.every((user, idx) => user !== randomUsers[idx - 1]));
    expect(randomUsers.length).toEqual(4);
    expect(
      randomUsers.every((rand) =>
        expect(rand).toMatchObject({
          id: expect.any(Number),
          email: expect.any(String),
          gender: expect.any(String),
          ip_address: expect.any(String),
          password: expect.any(String),
          passwordConfirmation: expect.any(String),
          deviceId: expect.any(String),
        })
      )
    );
  });
});
