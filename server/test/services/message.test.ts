import app from '../../src/app';

describe("'message' service", () => {
  it('registered the service', () => {
    const service = app.service('message');
    expect(service).toBeTruthy();
  });
  it.todo('a user should be able to create a message in a conversation');
  it.todo('should be able to send media in a conversation');
  it.todo('should be able to update a conversation');
  it.todo('should be able to mark a conversation as read or received');
});
