import * as fs from 'fs';
import * as sqlite3 from 'sqlite3';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const dbPath = process.env.TEST_DB_PATH;
if (!dbPath) {
  throw new Error('TEST_DB_PATH not set.');
}

const testDataPath = path.join(__dirname, 'scripts/generate-test-data.sql');
const dbExists = fs.existsSync(dbPath);

if (dbExists) {
  console.log(`Deleting existing database from ${dbPath}`);
  fs.unlinkSync(dbPath);
}

const db = new sqlite3.Database(dbPath);
const sql = fs.readFileSync(testDataPath).toString();

console.log(`Populating database with test data from ${testDataPath}.`);
db.exec(sql, () => {
  console.log('Done populating database.');
});
