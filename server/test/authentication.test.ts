/* eslint-disable arrow-body-style */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import puppeteer from 'puppeteer-core';
// import { executablePath } from 'puppeteer';

/* #region  Custom dependencies */
import app from '../src/app';
import { getRandUser } from '../src/lib/utils/generateFakeUser';

/* #endregion */

const userEndpoint = '/users';
const endpoint = '/authentication';

const createUser = (server, userObject: any) => {
  const user = userObject;
  delete user?.id;
  return server.post(userEndpoint).send(userObject);
};

describe('Authentication service', () => {
  let testServer;
  let testUsers;

  console.log(testUsers);
  beforeAll(async () => {
    await app.get('sequelizeClient').sync({ logged: false });
    testServer = request(app);
    testUsers = (
      await testServer
        .post(userEndpoint)
        .send({ ...getRandUser(), id: undefined })
    ).body;
  }, 20000);

  it('registered the service', () => {
    expect(app.service('authentication')).toBeTruthy();
  });

  it.skip('should create a new user and authenticate with user and Password', async () => {
    const userObject = getRandUser();
    const { body: newUser, statusCode } = await createUser(
      testServer,
      userObject
    );

    expect(statusCode).toBe(StatusCodes.CREATED);

    // Loging in with the new user
    const { body: loginResponse, statusCode: loginStatusCode } =
      await testServer.post(endpoint).send({
        strategy: 'local',
        email: newUser.email,
        password: userObject.password,
      });

    expect(loginStatusCode).toBe(StatusCodes.CREATED);
    expect(loginResponse).toHaveProperty('accessToken');
  });

  it.skip('should create a new user and authenticate with GOOGLE', async () => {
    (async () => {
      const browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true,

        executablePath:
          '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',

        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      const page = await browser.newPage();

      await page.goto('http://localhost:4000/oauth/google');

      // Type into search box.
      await page.type('input[type="email"]', 'vwanuht@gmail.com');
      const button = await page.waitForSelector('button');
      console.log(button);
      await button.click();
      // await page.$x(`/*[@id="identifierNext"]/div/button`)[0].click();

      // // Wait for suggest overlay to appear and click "show all results".
      // const allResultsSelector = '.devsite-suggest-all-results';
      // await page.waitForSelector(allResultsSelector);
      // await page.click(allResultsSelector);

      // // Wait for the results page to load and display the results.
      // const resultsSelector = '.gsc-results .gs-title';
      // await page.waitForSelector(resultsSelector);

      // // Extract the results from the page.

      // const links = await page.evaluate((resultsSelector) => {
      //   return [...document.querySelectorAll(resultsSelector)].map((anchor) => {
      //     const title = anchor.textContent.split('|')[0].trim();
      //     return `${title} - ${anchor}`;
      //   });
      // }, resultsSelector);

      // Print all the files.
      // console.log(links.join('\n'));

      // await browser.close();
    })();
    const { body: loginResponse, statusCode: loginStatusCode } =
      await testServer.post(endpoint).send({
        strategy: 'facebook',
        email: 'khahmzkkzf_1667091515@tfbnw.net',
        password: 'Mark#1234567890',
      });

    console.log('loginResponse', loginResponse);

    expect(loginStatusCode).toBe(StatusCodes.CREATED);
    expect(loginResponse).toHaveProperty('accessToken');
  });
});
