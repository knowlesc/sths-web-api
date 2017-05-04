import * as sqlite3 from 'sqlite3';
import { Logger } from '../common/logger';

const log = new Logger('DB');

export class DB {
  private static db: sqlite3.Database;

  static instance(): sqlite3.Database {
    if (!this.db) {
      this.init();
    }

    return this.db;
  }

  static init() {
    const dbPath = process.env.NODE_ENV === 'test' ?
      process.env.TEST_DB_PATH : process.env.DB_PATH;

    if (!dbPath) {
      throw new Error('DB_PATH or TEST_DB_PATH environment variable not set correctly.');
    }

    this.db = new sqlite3.Database(dbPath);
  }

  static get(query: string): Promise<{}> {
    log.debug(query);

    const promise = new Promise((resolve, reject) => {
      this.instance().get(query, (err, row) => {
        if (err) {
          log.error(err);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });

    return promise;
  }

  static all(query: string): Promise<{}[]> {
    log.debug(query);

    return new Promise((resolve, reject) => {
      this.instance().all(query, (err, rows) => {
        if (err) {
          log.error(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}
