import * as winston from 'winston';

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: process.env.CONSOLE_LOG_LEVEL || 'info'
    }),
    new (winston.transports.File)({
      filename: 'app.log',
      level: process.env.LOG_LEVEL || 'debug',
      options: { flags: 'w' }
    })
  ]
});

export class Logger {

  category: string;

  constructor(category: string) {
    this.category = category;
  }

  debug(message: string) {
    logger.log('debug', `[${this.category}] ${message}`);
  }

  info(message: string) {
    logger.log('info', `[${this.category}] ${message}`);
  }

  error(error: Error | string) {
    let message = '';
    if (error instanceof Error) {
      message = error.stack;
    } else {
      message = 'Error: ' + error;
    }

    logger.log('error', `[${this.category}] ${message}`);
  }
}
