import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthToken } from 'src/auth/auth.types';
import { AuthNService } from 'src/auth/services';
import { AuthAdmin } from '../admins.types';
import { AdminsSignInBodyDto } from '../dtos';
import { AdminsRepository } from '../repositories';

@Injectable()
export class AdminService {
  constructor(
    private readonly authService: AuthNService,
    @InjectRepository(AdminsRepository)
    private readonly repository: AdminsRepository,
  ) {}

  async signIn(input: AdminsSignInBodyDto): Promise<AuthAdmin> {
    const admin = await this.repository.findByCredentialsOrFail(input.email, input.password);

    let token: AuthToken;

    try {
      token = this.authService.createJwtToken(admin.id, admin.role as any);
    } catch (error) {
      throw new HttpException('Something went wrong, try again later', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return {
      user: admin,
      token,
    };
  }

  async emailIsUniq(email: string): Promise<boolean> {
    const admin = await this.repository.findOne({
      where: {
        email,
      },
      select: ['id'],
    });
    return !admin;
  }
}
