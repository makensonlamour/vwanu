/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import config from 'config';
import ChanceJS from 'chance';
import sendEmail from './mailer';

const chance = new ChanceJS();
const NAMESPACE = config.get('TEST_MAIL_NAMESPACE');
const API_KEY = config.get('TEST_MAIL_API_KEY');
const startTimestamp = Date.now();
const TAG = chance.string({
  length: 12,
  pool: 'abcdefghijklmnopqrstuvwxyz0123456789',
});
const template = {
  subject: 'subject',
  body: '<p>This is the body of a great email</p> {link}',
};
const testmailURL = `https://api.testmail.app/api/json?apikey=${API_KEY}&namespace=${NAMESPACE}`;
const endpoint = `${testmailURL}&tag=${TAG}&timestamp_from=${startTimestamp}&livequery=true`;
const userEmail = `${NAMESPACE}.${TAG}@inbox.testmail.app`;

describe('Mailer', () => {
  it.skip('should send an email', (done) => {
    try {
      sendEmail({
        to: userEmail,
        from: config.get('sendEmailFrom'),
        subject: template.subject,
        html: template.body,
      }).then((info: any) => {
        axios.get(endpoint).then((res) => {
          const inbox = res.data;
          expect(inbox.result).toEqual('success');
          expect(inbox.emails[0].html).toEqual(
            expect.stringContaining('This is the body of a great email')
          );
          expect(info.response).toEqual(expect.stringContaining('250'));
          done();
        });
      });
    } catch (error) {
      done(error);
    }
  }, 40000);
});
