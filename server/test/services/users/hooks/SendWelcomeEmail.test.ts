import SendWelcomeEmail from '../../../../src/services/users/hook/SendWelcomeEmail';

import { getRandUser } from '../../../../src/lib/utils/generateFakeUser';

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

// Mock Emailer
jest.mock('../../../../src/lib/utils/mailer', () => ({
  __esModule: true,
  default: {
    sendTemplate: () => Promise.resolve(),
  },
}));
// eslint-disable-next-line import/order, import/first
import Emailer from '../../../../src/lib/utils/mailer';

jest.spyOn(Emailer, 'sendTemplate');
function getMockContext(contextDetails) {
  const user = contextDetails?.user || getRandUser();
  return {
    app: {
      service: (name) => {
        console.log(name);
        return {
          _get: () =>
            Promise.resolve({ templateId: 'test', subject: 'welcome' }),
        };
      },
    },
    data: user,
    params: {
      User: user,
    },
    id: contextDetails?.id || 1,
    service: {
      _get: jest.fn(),
    },
  };
}
const WELCOME_TEMPLATE_ID = 'test';
describe('SendWelcomeEmail', () => {
  beforeAll(async () => {});
  afterEach(() => {
    jest.clearAllMocks();
  });
  it.skip('should send a welcome email to a user', async () => {
    const user = getRandUser();

    const context = getMockContext({ user });
    // @ts-ignore
    await SendWelcomeEmail(context);
    expect(Emailer.sendTemplate).toHaveBeenCalledTimes(1);

    expect(Emailer.sendTemplate).toHaveBeenCalledWith({
      to: user.email,
      subject: 'welcome',
      templateId: WELCOME_TEMPLATE_ID,
      personalizations: [
        {
          dynamic_template_data: {
            fullName: `${user.firstName} ${user.lastName}`,
          },
        },
      ],
    });
  });
});
