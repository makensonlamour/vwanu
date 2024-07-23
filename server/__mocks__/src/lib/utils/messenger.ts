
export default jest.fn(() => ({
    notifier: jest.fn(() => Promise.resolve('message sent'))
}));