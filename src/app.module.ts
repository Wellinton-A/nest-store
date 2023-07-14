import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './users/entity/user.entity'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.localdevelopment'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PWD,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      entities: [UserEntity],
      migrations: [`${__dirname}/migration/{.ts,*.js}`],
      migrationsRun: true,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
