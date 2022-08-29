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
      getRandUsers(2).map((user) => testServer.post(userEndpoint).send(user))
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

    const newUser = { ...getRandUser(), address };
    const { body } = await testServer.post(userEndpoint).send(newUser);
    console.log(body);
    // console.log(body.errors[0].instance);

    // expect(body).toEqual(address);
  });
  it.todo('Should be able to get all addresses of a user');
  it.todo("Should be able to update an user's address");
  it.todo("Should be able to delete an user's address");
  it.todo("User's address should show show user's basic attributes");
  it.todo(
    'address must contain address type , user details , and address information'
  );
});
