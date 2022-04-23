import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Admin } from 'src/admins/entities';
import { AuthToken, JwtPayload } from 'src/auth/auth.types';
import { User } from 'src/users/enitities';

import { TOKEN_TYPE } from '../auth.enums';

@Injectable()
export class AuthNService {
  private tokenExpiresIn: number;

  constructor(private readonly jwtService: JwtService, readonly configService: ConfigService) {
    this.tokenExpiresIn = this.configService.get<number>('jwt.expiresIn');
  }

  createJwtToken(id: string, tokenType: TOKEN_TYPE): AuthToken {
    const expiration = new Date();
    expiration.setTime(this.tokenExpiresIn * 1000 + expiration.getTime());

    const payload = { id, expiration, tokenType } as JwtPayload;

    return this.jwtService.sign(payload);
  }

  createAuthTokenOrFail(user: Admin | User): AuthToken {
    try {
      let tokenType: TOKEN_TYPE;
      if (user instanceof Admin) {
        tokenType = TOKEN_TYPE.admin;
      }
      if (user instanceof User) {
        tokenType = TOKEN_TYPE.user;
      }
      const token = this.createJwtToken(user.id, tokenType);
      return token;
    } catch (error) {
      throw new HttpException('Something went wrong, try again later', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async verifyTokenAsync(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync(token);
  }
}
