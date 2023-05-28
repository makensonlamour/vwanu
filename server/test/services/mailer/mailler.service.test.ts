
import app from '../../../src/app';
import { generateFakeEmail } from '../../../src/lib/utils/generateFakeUser';

const userEmail = generateFakeEmail();
const template = {
  subject: 'subject',
  body: '<p>This is the body of a great email</p> {link}',
};

describe('Mailer', () => {
  
  it.skip('should send an email', async () => {
    const result = await app.service('mailer').create({
      to: userEmail,
      subject: template.subject,
      html: template.body,
    });

    expect(result.response).toEqual(expect.stringContaining('250'));
    expect(result.accepted).toEqual(expect.arrayContaining([userEmail]));

    // const res = await axios.get(endpoint);
    // const inbox = res.data;
    // expect(inbox.result).toEqual('success');
    // expect(inbox.emails[0].html).toEqual(
    //   expect.stringContaining('This is the body of a great email')
    // );
  }, 40000);
});
