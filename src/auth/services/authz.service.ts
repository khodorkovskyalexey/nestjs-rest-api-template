import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/admins/entities';
import { AdminsRepository } from 'src/admins/repositories';
import { JwtPayload } from 'src/auth/auth.types';
import { User } from 'src/users/enitities';
import { UsersRepository } from 'src/users/repositories';

import { TOKEN_TYPE } from '../auth.enums';

@Injectable()
export class AuthZService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(AdminsRepository)
    private readonly adminsRepository: AdminsRepository,
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async verifyTokenAsync(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync(token);
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    return this.usersRepository.findOne({
      where: { id: payload.id },
    });
  }

  async validateAdmin(payload: JwtPayload): Promise<Admin> {
    return this.adminsRepository.findOne({
      where: { id: payload.id },
    });
  }

  async validate(payload: JwtPayload) {
    switch (payload.tokenType) {
      case TOKEN_TYPE.user:
        return this.validateUser(payload);

      case TOKEN_TYPE.admin:
        return this.validateAdmin(payload);

      default:
        throw new Error(`Invalid token type ${payload.tokenType}`);
    }
  }
}
