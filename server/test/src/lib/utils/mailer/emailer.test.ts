import Mailer from '../../../../../src/lib/utils/mailer';
import { getRandUser } from '../../../../../src/lib/utils/generateFakeUser';

// Mock sendgrid
jest.mock('@sendgrid/mail', () => ({
  __esModule: true,
  default: {
    send: (m) => Promise.resolve(m),
    setApiKey: jest.fn(),
  },
}));
// eslint-disable-next-line import/order, import/first
import sendGridMail from '@sendgrid/mail';

jest.spyOn(sendGridMail, 'send');

describe('Should send an email to a user', () => {
  it('Should send an an email to a user', async () => {
    const recipient = { ...getRandUser(), id: undefined };
    const msg = {
      to: recipient.email,
      subject: 'Test email',
      text: 'Test email',
      html: 'Test email',
    };

    Mailer.sendEmail(msg);
    expect(sendGridMail.send).toHaveBeenCalledTimes(1);
    await expect(Mailer.sendEmail(msg)).resolves.not.toThrowError();
  });

  it('should send a template to a user', async () => {
    const recipient = { ...getRandUser(), id: undefined };
    const msg = {
      to: recipient.email,
      subject: 'Test email',
      text: 'Test email',
      html: 'Test email',
      templateId: 'd-123',
      personalizations: [{ dynamic_template_data: { name: 'test' } }],
    };
    await expect(Mailer.sendTemplate(msg)).resolves.not.toThrowError();
  });
});
