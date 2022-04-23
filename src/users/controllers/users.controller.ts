import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { AdminRole } from 'src/admins/admins.types';
import { LocaleAuthGuard } from 'src/auth/decorators';
import { IAM } from 'src/common/decorators';
import { User } from '../enitities';
import { UniqEmailGuard, UniqPhoneGuard } from '../guards';
import { CreateUserInput, UpdateUserInput, UserSignInInput } from '../inputs';
import { UserModel } from '../models';
import { UserService } from '../services';
import { UserRole } from '../types/enums';
import { AuthUserDto } from '../types/types';

@ApiTags('Users')
@Crud({
  model: {
    type: User,
  },
  dto: {
    create: CreateUserInput,
    update: UpdateUserInput,
  },
  routes: {
    only: ['createOneBase', 'deleteOneBase', 'getOneBase', 'getManyBase', 'updateOneBase'],
    deleteOneBase: {
      decorators: [LocaleAuthGuard(UserRole.USER), ApiBearerAuth()],
    },
    getOneBase: {
      decorators: [LocaleAuthGuard(AdminRole.ADMIN), ApiBearerAuth()],
    },
    getManyBase: {
      decorators: [LocaleAuthGuard(AdminRole.ADMIN), ApiBearerAuth()],
    },
    updateOneBase: {
      decorators: [UseGuards(UniqEmailGuard, UniqPhoneGuard), LocaleAuthGuard(UserRole.USER), ApiBearerAuth()],
    },
    createOneBase: {
      decorators: [UseGuards(UniqEmailGuard, UniqPhoneGuard)],
    },
  },
  serialize: {
    create: UserModel,
    update: UserModel,
    get: UserModel,
    getMany: UserModel,
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
})
@Controller('users')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}

  @Post('sign-in')
  @ApiOperation({ summary: 'Sign-in user' })
  @ApiOkResponse({ type: AuthUserDto })
  @ApiBody({ type: UserSignInInput })
  async signIn(@Body() input: UserSignInInput): Promise<AuthUserDto> {
    return this.service.signIn(input.email, input.password);
  }

  @Get('me')
  @ApiOperation({ summary: 'Retrieve current user' })
  @ApiOkResponse({ type: User })
  @ApiBearerAuth()
  @LocaleAuthGuard(UserRole.USER)
  async getMe(@IAM() user: User): Promise<User> {
    return user;
  }
}
