import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { User } from '../users/entities/user.entity.js';
import { Account } from '../accounts/entities/account.entity.js';
import { Transaction } from '../transactions/entities/transaction.entity.js';
import { validateEnvironment } from '../config/environment.validation.js';

const currentDirectory = dirname(fileURLToPath(import.meta.url));

const environmentFilePath = fileURLToPath(
  new URL('../../../../.env', import.meta.url),
);

config({ path: environmentFilePath });

const environment = validateEnvironment(process.env);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: environment.POSTGRES_HOST,
  port: environment.POSTGRES_PORT,
  username: environment.POSTGRES_USER,
  password: environment.POSTGRES_PASSWORD,
  database: environment.POSTGRES_DB,
  synchronize: false,
  logging: false,
  migrationsRun: false,
  uuidExtension: 'pgcrypto',
  installExtensions: false,
  entities: [User, Account, Transaction],
  migrations: [join(currentDirectory, 'migrations', '*.{js,ts}')],
});
