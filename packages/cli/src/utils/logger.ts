import pc from 'picocolors';

export const logger = {
    info: (msg: string) => console.log(pc.blue('INFO: ') + msg),
    success: (msg: string) => console.log(pc.green('SUCCESS: ') + msg),
    error: (msg: string) => console.log(pc.red('ERROR: ') + msg),
    warn: (msg: string) => console.log(pc.yellow('WARN: ') + msg),
};
