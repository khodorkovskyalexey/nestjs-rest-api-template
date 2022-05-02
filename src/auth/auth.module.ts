import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminsRepository } from 'src/admins/repositories';
import { UsersRepository } from 'src/users/repositories';

import { JWTConfigService } from '../common/services';
import { JwtStrategy } from './jwt.strategy';
import { AuthNService, AuthZService } from './services';

PassportModule.register({ session: true });

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useClass: JWTConfigService,
    }),
    TypeOrmModule.forFeature([UsersRepository, AdminsRepository]),
  ],
  providers: [JwtStrategy, AuthNService, AuthZService],
  exports: [PassportModule, JwtStrategy, AuthNService, AuthZService],
})
export class AuthModule {}
