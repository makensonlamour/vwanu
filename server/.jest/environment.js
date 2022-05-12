const { readFile } = require('fs').promises;
const os = require('os');
const path = require('path');
const app = require('../src/app');
const request = require('supertest');
// const puppeteer = require('puppeteer');
const NodeEnvironment = require('jest-environment-node');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');
// @ts-ignore
class PuppeteerEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();
    // get the wsEndpoint
    const wsEndpoint = await readFile(path.join(DIR, 'wsEndpoint'), 'utf8');
    if (!wsEndpoint) {
      throw new Error('wsEndpoint not found');
    }

    // await app.get('sequelizeClient').sync({ alter: true });
    // const testServer = request(app);

    // connect to puppeteer
    this.global.__BROWSER_GLOBAL__ = JSON.parse(wsEndpoint);
    this.global.__APP__ = 'app';
    this.global.__SERVER__ = 'testServer';
  }

  async teardown() {
    await super.teardown();
  }

  getVmContext() {
    return super.getVmContext();
  }
}

module.exports = PuppeteerEnvironment;
