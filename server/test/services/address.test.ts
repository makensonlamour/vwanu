/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
/** Local dependencies */
import app from '../../src/app';
import {
  getRandUsers,
  getRandUser,
} from '../../src/lib/utils/generateFakeUser';

describe("'address' service", () => {
  // eslint-disable-next-line no-unused-vars

  let testUsers;
  let testServer;
  let fakeCountries;
  let fakeStates;
  let fakeCities;
  let addressTypes;
  const userEndpoint = '/users';

  beforeAll(async () => {
    await app.get('sequelizeClient').sync({ force: true });
    testServer = request(app);
    // Creating test users
    testUsers = await Promise.all(
      getRandUsers(2).map((user) =>
        testServer.post(userEndpoint).send({ ...user, id: undefined })
      )
    );
    testUsers = testUsers.map((testUser) => testUser.body);

    // creating fake countries City, AddressTypes and States

    const { Country, State, City, AddressTypes } =
      app.get('sequelizeClient').models;

    const countries = [
      { name: 'Honduras', initials: 'HN' },
      { name: 'Nicaragua', initials: 'NI' },
    ];

    const states = [
      { name: 'Honduras_state', initials: 'HN_S', areaCode: '504' },
      { name: 'Nicaragua_state', initials: 'NI_S', areaCode: '505' },
    ];

    const cities = [{ name: 'Honduras_City' }, { name: 'Nicaragua_state' }];

    addressTypes = await Promise.all(
      ['Home', 'Work', 'Other'].map((description) =>
        AddressTypes.create({ description })
      )
    );

    fakeCountries = await Promise.all(
      countries.map((country) => Country.create(country))
    );
    fakeStates = await Promise.all(
      states.map((state, idx) =>
        State.create({
          ...state,
          CountryId: fakeCountries[idx].id,
        })
      )
    );
    fakeCities = await Promise.all(
      cities.map((city, idx) =>
        City.create({ ...city, StateId: fakeStates[idx].id })
      )
    );
  }, 100000);

  afterAll(async () => {
    await Promise.all(
      testUsers.map((user) =>
        testServer
          .delete(`${userEndpoint}/${user.id}`)
          .set('authorization', ` ${user.accessToken}`)
      )
    );
  });

  it('registered the service', () => {
    const service = app.service('address');
    expect(service).toBeTruthy();
  });

  it('Should be able to register an address for a user', async () => {
    const address = {
      street: '123 Fake Street',
      city: fakeCities[0].id,
      state: fakeStates[0].id,
      country: fakeCountries[0].id,
      zip: '12345',
      addressType: addressTypes[0].id,
      latitude: '123.123',
      longitude: '123.123',
      streetType: 'Street',
    };

    const newUser = { ...getRandUser(), address, id: undefined };
    const { body: userWithAddress } = await testServer
      .post(userEndpoint)
      .send(newUser);

    const { body: addressFromDB } = await testServer
      .get(`${userEndpoint}/${userWithAddress.id}`)
      .set('authorization', testUsers[0].accessToken);

    expect(addressFromDB.Addresses[0]).toMatchObject({
      id: expect.any(String),
      // street: address.street,
      country: fakeCountries[0].name,
      state: fakeStates[0].name,
      city: fakeCities[0].name,
      addressType: addressTypes[0].description,
    });
    // expect(body).toEqual(address);
  });

  it('should be able to register a user then patch an address', async () => {
    const address = {
      // street: '123 Fake Street',
      city: fakeCities[0].id,
      state: fakeStates[0].id,
      country: fakeCountries[0].id,
      addressType: addressTypes[0].id,
      streetType: 'Street',
    };

    const newUser = { ...getRandUser(), id: undefined };
    const { body: userWithAddress, statusCode } = await testServer
      .post(userEndpoint)
      .send(newUser);

    expect(statusCode).toBe(201);

    // Patch address to user authenticated
    const { statusCode: patchStatusCode } = await testServer
      .patch(`${userEndpoint}/${userWithAddress.id}`)
      .set('authorization', userWithAddress.accessToken)
      .send({ address });

    expect(patchStatusCode).toBe(200);

    const { body: addressFromDB } = await testServer
      .get(`${userEndpoint}/${userWithAddress.id}`)
      .set('authorization', testUsers[0].accessToken);

    expect(addressFromDB.Addresses[0]).toMatchObject({
      id: expect.any(String),
      // street: null,
      country: fakeCountries[0].name,
      state: fakeStates[0].name,
      city: fakeCities[0].name,
      addressType: addressTypes[0].description,
    });
  });
  it.todo('Should be able to get all addresses of a user');
  it.todo("Should be able to update an user's address");
  it.todo("Should be able to delete an user's address");
  it.todo("User's address should show show user's basic attributes");
  it.todo(
    'address must contain address type , user details , and address information'
  );
});

// describe('User Address', () => {
//   let countries;
//   let states;
//   let cities;
//   beforeAll(async () => {
//     await sequelize.sync({ force: true });
//     countries = await Promise.all(
//       [
//         { name: 'Katchopa', initials: 'kp' },
//         { name: 'Boyo', initials: 'by' },
//       ].map((c) => testServer.post('/countries').send(c))
//     );
//   });
//   it('should create users with address', async () => {
//     console.log(countries[0].body);
//     const responses = await Promise.all(
//       getRandUsers(2).map((u) => {
//         const user = u;
//         delete user.id;
//         return testServer.post(endpoint).send({ ...user, interests });
//       })
//     );
//     responses.forEach(({ statusCode }) => {
//       expect(statusCode).toBe(201);
//     });
//   });
//   it.todo('Each users have an address');
//   it.todo('User has an address');
//   it.todo('User can add an address');
//   it.todo('User can update his address');
//   it.todo('User can delete his address');
// });
