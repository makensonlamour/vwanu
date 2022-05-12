// const { mkdir, writeFile } = require('fs').promises;
// const os = require('os');
// const path = require('path');
// const app = require('../src/app');
// import app from '../src/app';
// import request from 'supertest';

// const puppeteer = require('puppeteer');

// const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

import app from '../src/app';

export default async function (globalConfig, projectConfig) {
  const sequelize = app.get('sequelizeClient');
  await sequelize.sync({ alter: true });
  
  globalThis.__SEQUELIZE__ = sequelize;
}
