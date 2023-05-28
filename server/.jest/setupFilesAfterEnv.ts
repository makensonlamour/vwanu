import { IMessenger } from '../src/schema/email.schema';

class MockMessenger implements IMessenger {
  constructor() {
    // console.log('MockMessenger constructor');
  }
  // @ts-ignore
  sendTemplate = jest.fn().mockResolvedValue({ ok: true });
  // @ts-ignore
  send = jest.fn().mockResolvedValue({ ok: true });
}

// @ts-ignore
jest.mock('../src/lib/utils/outReach', () => ({
  __esModule: true,
  EmailerService: () => new MockMessenger(),
}));
