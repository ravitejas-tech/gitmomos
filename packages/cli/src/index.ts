#!/usr/bin/env node
import { Command } from 'commander';
import { intro, outro } from '@clack/prompts';
import pc from 'picocolors';
import { loginCommand } from './commands/login.cmd';
import { syncCommand } from './commands/sync.cmd';
import { statusCommand } from './commands/status.cmd';
import { reportCommand } from './commands/report.cmd';
import { loadEnv } from './utils/config';

// Load environment variables early
loadEnv();

// @ts-ignore
import pkg from '../package.json';
import { addCommand } from './commands/add.cmd';

const program = new Command();

program
    .name('gitmomos')
    .description('Fresh daily work reports, served hot from your git logs.')
    .version(pkg.version);

program
    .command('login')
    .description('Log in to your gitmomos account')
    .action(async () => {
        intro(pc.magenta(' gitmomos '));
        await loginCommand();
        outro(pc.green('Login process complete!'));
    });

program
    .command('add')
    .description('Track a new project')
    .argument('<name>', 'Project name')
    .action(async (name) => {
        intro(pc.magenta(' gitmomos '));
        await addCommand(name);
        outro(pc.green('Project added successfully!'));
    });

program
    .command('sync')
    .description('Sync your latest commits')
    .action(async () => {
        intro(pc.magenta(' gitmomos '));
        await syncCommand();
        outro(pc.green('Sync process complete!'));
    });

program
    .command('status')
    .description('Check sync status')
    .action(async () => {
        intro(pc.magenta(' gitmomos '));
        await statusCommand();
        outro(pc.green('Status check complete!'));
    });

program
    .command('report')
    .description('View your AI work report')
    .action(async () => {
        intro(pc.magenta(' gitmomos '));
        await reportCommand();
        outro(pc.green('Report fetch complete!'));
    });

program.parse();
