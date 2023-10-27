import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
require('dotenv').config()
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;
console.log('~~~DB_HOST', DB_HOST, '~~~DB_PORT', DB_PORT, '~~~DB_USERNAME', DB_USERNAME, '~~~DB_PASSWORD', DB_PASSWORD, '~~~DB_DATABASE', DB_DATABASE)
@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres' as 'postgres',
            host: DB_HOST,
            port: Number(DB_PORT),
            username: DB_USERNAME,
            password: DB_PASSWORD,
            database: DB_DATABASE,
            entities: ["dist/**/*.entity.js"],
            synchronize: true // not recommended for production
        };
    }
}