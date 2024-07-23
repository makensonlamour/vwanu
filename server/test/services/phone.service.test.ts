// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';


import app from '../../src/app';
import { getRandUsers } from '../../src/lib/utils/generateFakeUser';


/* #endregion */
describe('Phone Service', () => {
  let testServer;
  let testUsers = [];
  const endpoint = '/phone';
  const userEndpoint = '/users';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(async () => {
    testServer = request(app);
    testUsers = await Promise.all(
      getRandUsers(3).map((u) =>
        testServer.post(userEndpoint).send({ ...u, id: undefined })
      )
    );
    testUsers = testUsers.map(testuser => testuser?.body)
  });

  afterAll(async () => {
    await Promise.all(
      testUsers.map(user => testServer
        .delete(`${endpoint}/${user.id}`)
        .set('authorization', user.accessToken)));
  });

  describe('Service is runing', () => {
    it('The service is runing normaly', () => {
      const service = app.service('phone');
      expect(service).toBeTruthy();

    })
  })


  describe('POST /phone', () => {
    it('should return a success message', async () => {
      const user = testUsers[0];
      const countryCode = (await testServer.get('/country?name=Afghanistan').send().set('Authorization', `Bearer ${user.accessToken}`)).body[0].id

      const res = await request(app)
        .post(endpoint)
        .set('Authorization', `Bearer ${user.accessToken}`)
        .send({
          phoneNumber: '1234569890',
          countryCode,
        });
      expect(res.statusCode).toBe(StatusCodes.CREATED);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toMatch(/sent/i);
    });
    it('Should called the database to add a new number', async () => {
      const user = testUsers[0];
      // country code 
      const countryCode = (
        await testServer
          .get('/country?name=Afghanistan')
          .set('Authorization', `Bearer ${user.accessToken}`))
        .body[0].id

      const Sequelize = app.get('sequelizeClient');
      jest.spyOn(Sequelize, 'query');

      const phoneNumber = '1234569850'
      const userId = user.id;
      await request(app)
        .post(endpoint)
        .set('Authorization', `Bearer ${testUsers[0].accessToken}`)
        .send({
          phoneNumber,
          countryCode,
        });

      expect(Sequelize.query).toHaveBeenCalled();
      expect(Sequelize.query).toHaveBeenCalledWith(
        'SELECT fn_add_or_associate_phone(:userId, :phoneNumber, :countryCode) AS verificationCode',
        {
          replacements: { userId, phoneNumber, countryCode },
          type: Sequelize.QueryTypes.SELECT
        }
      );


    });

    it('Should return an error if the phone number is already associated with the user', async () => {
      // user 
      const user = testUsers[0];
      // country code 
      const countryCode = (await testServer.get('/country?name=Afghanistan').send().set('Authorization', `Bearer ${user.accessToken}`)).body[0].id

      const res = await request(app)
        .post(endpoint)
        .set('Authorization', `Bearer ${testUsers[0].accessToken}`)
        .send({
          phoneNumber: '1234569890',
          countryCode,
        });

      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toContain('already');
    });
    it('Should associate same phone with different user', async () => {
      // user 
      const user = testUsers[1];
      // country code 
      const countryCode = (await testServer.get('/country?name=Afghanistan').send().set('Authorization', `Bearer ${user.accessToken}`)).body[0].id

      const res = await request(app)
        .post(endpoint)
        .set('Authorization', `Bearer ${user.accessToken}`)
        .send({
          phoneNumber: '1234569890',
          countryCode,
        });

      expect(res.statusCode).toBe(StatusCodes.CREATED);
      expect(res.body).toHaveProperty('message');
    });
  });
  describe('POST /phone?verify=true', () => {

    it.skip('should return an error if the verification code is incorrect', async () => {
      const sequelize = app.get('sequelizeClient');
      const { UserPhoneVerifications, Phone } = sequelize.models;
      const result = await UserPhoneVerifications.findOne({ where: { user_id: testUsers[0].id, phone_id: 1 } })
      const verificationCode = result.verification_code;
      const wrongVerificationCode = (+verificationCode + 1).toString();


      const phoneNumber = (await Phone.findOne({ where: { id: result.phone_id } })).phone_number;

      const res = await request(app)
        .post(`${endpoint}?verify=true`)
        .set('Authorization', `Bearer ${testUsers[0].accessToken}`)
        .send({
          phoneNumber,
          verificationCode: wrongVerificationCode
        });


      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toMatch(/incorrect/i);
    });
    it.skip('should successfully verify a phone number with correct verification code', async () => {


      const user = (await testServer.post(userEndpoint).send({ ...getRandUsers(1)[0], id: undefined })).body;

      const countryCode = (await testServer.get('/country?name=Afghanistan').send().set('Authorization', `Bearer ${user.accessToken}`)).body[0].id


      await request(app)
        .post(endpoint)
        .set('Authorization', `Bearer ${user.accessToken}`)
        .send({
          phoneNumber: '9934569890',
          countryCode,
        });


      const sequelize = app.get('sequelizeClient');
      const { UserPhoneVerifications, Phone } = sequelize.models;

      const phoneId = (await Phone.findOne({ where: { phone_number: '9934569890' } })).id;

      const result = await UserPhoneVerifications.findOne({ where: { user_id: user.id, phone_id: phoneId } })
      const verificationCode = result.verification_code;


      const res = await request(app)
        .post(`${endpoint}?verify=true`)
        .set('Authorization', `Bearer ${testUsers[0].accessToken}`)
        .send({
          phoneNumber: '9934569890',
          verificationCode
        });


      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toMatch(/incorrect/i);

    });
    it.todo('should return an error if the verification code is expired');
  });





  describe('Patch /phone?action=resendVerification', () => {
    it('should return an error if the phone number is not associated with the user', async () => {



      const res = await request(app)
        .patch(`${endpoint}?action=resendVerification`)
        .set('Authorization', `Bearer ${testUsers[0].accessToken}`)
        .send({ phoneNumber: '1234569f890' });
      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toContain('associated');
    });


    it.skip('should return an error if the phone number is already verified', async () => {
      const res = await request(app)
        .patch(`${endpoint}?action=resendVerification`)
        .set('Authorization', `Bearer ${testUsers[0].accessToken}`)
        .send({ phoneNumber: '1234569890' });


      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toContain('verified');
    });
    it.todo('should successfully resend a verification code to the user');
  });

  describe('Patch /phone?action=updatePrimary', () => {
    it.skip('should return an error if the phone number is not associated with the user', async () => {
      const res = await request(app)
        .patch(`${endpoint}?action=updatePrimary`)
        .set('Authorization', `Bearer ${testUsers[0].accessToken}`)
        .send({ phoneNumber: '1234569890' });


      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toContain('associated');
    }
    );

    it.skip('should successfully set the phone number as the primary number for the user', async () => {
      const sequelize = app.get('sequelizeClient');

      jest.spyOn(sequelize, 'query');
      await request(app)
        .patch(`${endpoint}?action=updatePrimary`)
        .set('Authorization', `Bearer ${testUsers[0].accessToken}`)
        .send({ phoneNumber: '1234569890' });



      expect(sequelize.query).toHaveBeenCalled();



    }
    );
  });









  describe('DELETE /phone', () => { });
  describe('GET /phone', () => {
    it.todo('should return the phone number associated with the user');
    it.skip('should return an error if the phone number is already the primary number', async () => {
      const sequelize = app.get('sequelizeClient');
      const { UserPhones } = sequelize.models;
      const primaryPhone = (await UserPhones.findOne({ where: { user_id: testUsers[0].id, is_primary: true } })).phone_number;
      const res = await request(app)
        .get(`${endpoint}?primary_number=true`)
        .set('Authorization', `Bearer ${testUsers[0].accessToken}`)
        .send({ phoneNumber: primaryPhone });

      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toContain('primary');

    });

  });


});
