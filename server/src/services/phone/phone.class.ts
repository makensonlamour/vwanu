/* eslint-disable import/prefer-default-export */
import { Params } from '@feathersjs/feathers';
import { BadRequest, NotFound, GeneralError } from '@feathersjs/errors';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { StatusCodes } from 'http-status-codes';

import { Application } from '../../declarations';

export class Phone extends Service {
  app;

  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }

  async updatePrimaryPhone(userId, phoneId) {

    const sequelize = this.app.get('sequelizeClient');

    return sequelize.query(
      'SELECT fn_update_primary_phone(:userId, :phoneId) AS status',
      {
        replacements: { userId, phoneId },
        type: sequelize.QueryTypes.SELECT
      }
    ).then(result => result[0])
      .catch(err => { throw new BadRequest(err.message); });
  }

  async resendVerification(userId, phoneNumber) {

    const sequelize = this.app.get('sequelizeClient');
    return sequelize.query(
      'SELECT fn_get_phone_verification_code(:userId, :phoneNumber) AS verificationCode',
      {
        replacements: { userId, phoneNumber },
        type: sequelize.QueryTypes.SELECT
      }
    ).then(result => result[0])
      .catch(err => { throw new BadRequest(err.message); });
  }

  // POST: Add a new phone or verify an existing one
  async create(data, params: Params) {
    const sequelize = this.app.get('sequelizeClient');

    if (params?.query && params?.query?.verify) {
      // Handle verification logic
      const { UserId: userId, phoneNumber, verificationCode } = data;
      return sequelize.query(
        'SELECT fn_verify_user_phone_code(:userId, :phoneNumber, :verificationCode) AS status',
        {
          replacements: { userId, phoneNumber, verificationCode },
          type: sequelize.QueryTypes.SELECT
        }
      ).then(result => result[0])
        .catch(err => {
          throw new BadRequest(err.message);
        });
    }

    // Handle adding a new phone
    const { UserId: userId, phoneNumber, countryCode } = data;

    return sequelize.query(
      'SELECT fn_add_or_associate_phone(:userId, :phoneNumber, :countryCode) AS verificationCode',
      {
        replacements: { userId, phoneNumber, countryCode },
        type: sequelize.QueryTypes.SELECT
      }
    ).then(result => result[0]).catch(err => {
      const Err = err.code === StatusCodes.INTERNAL_SERVER_ERROR ? GeneralError : BadRequest;
      throw new Err((err.message))
    });

  }

  // GET: Retrieve phone details
  async find(params: Params) {
    const { sequelize } = this.app.get('sequelizeClient');
    const { UserId: userId, phoneNumber } = params.query;
    return sequelize.query(
      'SELECT * FROM get_phone_details(:userId, :phoneNumber)',
      {
        replacements: { userId, phoneNumber },
        type: sequelize.QueryTypes.SELECT
      }
    ).then(result => result[0])
      .catch((err: Error) => { throw new NotFound(err.message); });
  }

  // PATCH: Update phone details
  async patch(id, data, params: Params) {

    const { UserId: userId, phoneNumber } = data;
    switch (params.query.action) {
      case 'updatePrimary':
        return this.updatePrimaryPhone(userId, phoneNumber);
      case 'resendVerification':
        return this.resendVerification(userId, phoneNumber)
      default:
        throw new BadRequest('Please specify an action')
    }
  }

  // DELETE: Remove a phone association
  async remove(id, params: Params) {
    const { sequelize } = this.app.get('sequelizeClient');
    const { UserId: userId } = params;
    const { phoneNumber } = params.query;
    return sequelize.query(
      'SELECT delete_phone_association(:userId, :phoneNumber) AS status',
      {
        replacements: { userId, phoneNumber },
        type: sequelize.QueryTypes.SELECT
      }
    ).then(result => result[0])
      .catch(err => { throw new BadRequest(err.message); });
  }
}
