export default async (via: string, message: string, token: string) => {
  const { log } = console;
  log({ via, message, token });
};
