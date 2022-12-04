import associateWithForumInterest from '../../../../src/services/discussion/hooks/associateWithForumInterest';

const mockedModels = {
  Discussion_ForumCategory: {
    findOrCreate: jest.fn(),
  },
};
const mockedContext = {
  result: { id: 1 },
  app: {
    get: jest.fn(),
  },
};
mockedContext.app.get.mockReturnValue({
  models: mockedModels,
});

describe('Attach forum discussion to forum interests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should not run if the CategoryId id not present ', async () => {
    const context = { ...mockedContext, data: {} };
    // @ts-ignore
    const result = await associateWithForumInterest(context);
    expect(mockedContext.app.get).not.toHaveBeenCalled();
    expect(result).toEqual(context);
  });

  it('should associate the discussion with the forum through the discussion interest table', async () => {
    const context = { ...mockedContext, data: { CategoryId: 1 } };

    // @ts-ignore
    const result = await associateWithForumInterest(context);
    expect(result).toEqual(context);
    expect(mockedContext.app.get).toHaveBeenCalled();
  });
});
