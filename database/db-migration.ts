import { DbMigration } from 'my-migrator';
import mysql from 'mysql2/promise';
import path from 'path';

export class MigrationRunner {
  async runMigration() {
    const dbUrl = new URL(process.env.MYSQL_URL!);

    const pool = mysql.createPool({
      host: dbUrl.hostname,
      port: Number(dbUrl.port),
      user: dbUrl.username,
      password: dbUrl.password,
      database: dbUrl.pathname.replace('/', ''),
      multipleStatements: false,
    });

    const migrationDir = path.join(process.cwd(), 'database/migrations');
    const migration = new DbMigration(pool, migrationDir);

    await migration.run();
    await pool.end();
  }
}
