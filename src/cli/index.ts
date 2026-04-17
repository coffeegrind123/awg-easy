#!/usr/bin/env node

// ! Auto Imports are not supported in this file

import { defineCommand, runMain } from 'citty';

import packageJson from '../package.json';
import dbAdminReset from './admin/reset';
import clientsList from './clients/list';
import clientsQr from './clients/qr';

const main = defineCommand({
  meta: {
    name: 'wg-easy',
    version: packageJson.version,
    description: 'Command Line Interface',
  },
  subCommands: {
    'db:admin:reset': dbAdminReset,
    'clients:list': clientsList,
    'clients:qr': clientsQr,
  },
});

runMain(main);
