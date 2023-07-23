import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './users/entities/user.entity'
import { StateModule } from './state/state.module'
import { CityModule } from './city/city.module'
import { AddressModule } from './address/address.module'
import { AddressEntity } from './address/entities/address.entity'
import { CityEntity } from './city/entities/city.entity'
import { StateEntity } from './state/entities/state.entity'
import { CacheModule } from './cache/cache.module';
import { AuthModule } from './auth/auth.module';

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
      entities: [UserEntity, AddressEntity, CityEntity, StateEntity],
      migrations: [`${__dirname}/migration/{.ts,*.js}`],
      migrationsRun: true,
    }),
    UsersModule,
    StateModule,
    CityModule,
    AddressModule,
    CacheModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
