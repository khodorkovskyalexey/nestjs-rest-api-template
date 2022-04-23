import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminRoles, IAM } from 'src/common/decorators';
import { ValidEmailPipe } from 'src/common/pipes';

import { Admin } from '../entities';
import { AdminRole } from '../admins.types';
import { AdminDto, AdminsSignInBodyDto, AuthAdminDto } from '../dtos';
import { AdminRoleGuard } from '../guards';
import { AdminService } from '../services';

@ApiTags('Admins')
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminService: AdminService) {}

  @Post('sign-in')
  @ApiOperation({
    summary: 'Sign in via email/password',
  })
  @ApiBody({ type: AdminsSignInBodyDto })
  @ApiOkResponse({
    type: AuthAdminDto,
  })
  async signIn(@Body() input: AdminsSignInBodyDto): Promise<AuthAdminDto> {
    return this.adminService.signIn(input);
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Retrieve current admin',
  })
  @ApiOkResponse({
    type: AdminDto,
  })
  @AdminRoles(AdminRole.ADMIN)
  @UseGuards(AuthGuard(), AdminRoleGuard)
  async getMe(@IAM() admin: Admin): Promise<Admin> {
    return admin;
  }

  @Get('email-is-uniq')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Check admin email for uniqueness',
  })
  @ApiOkResponse({
    type: Boolean,
  })
  @AdminRoles(AdminRole.ADMIN)
  @UseGuards(AuthGuard(), AdminRoleGuard)
  async emailIsUniq(@Query('email', ValidEmailPipe) email: string): Promise<boolean> {
    return this.adminService.emailIsUniq(email);
  }
}
