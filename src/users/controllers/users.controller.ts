import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { AdminRole } from 'src/admins/admins.types';
import { LocaleAuthGuard } from 'src/auth/decorators';
import { IAM } from 'src/common/decorators';
import { User } from '../enitities';
import { UserIdGuard } from '../guards/user-id.guard';
import { CreateUserInput, UpdateUserInput, UserSignInInput } from '../inputs';
import { UserService } from '../services';
import { UserRole } from '../user.enums';
import { AuthUserDto } from '../user.types';

@ApiTags('Users')
@Crud({
  model: {
    type: User,
  },
  dto: {
    update: UpdateUserInput,
  },
  routes: {
    only: ['deleteOneBase', 'getOneBase', 'getManyBase', 'updateOneBase'],
    deleteOneBase: {
      decorators: [UseGuards(UserIdGuard), LocaleAuthGuard(UserRole.USER), ApiBearerAuth()],
    },
    getOneBase: {
      decorators: [LocaleAuthGuard(AdminRole.ADMIN), ApiBearerAuth()],
    },
    getManyBase: {
      decorators: [LocaleAuthGuard(AdminRole.ADMIN), ApiBearerAuth()],
    },
    updateOneBase: {
      decorators: [UseGuards(UserIdGuard), LocaleAuthGuard(UserRole.USER), ApiBearerAuth()],
    },
  },
  query: {
    exclude: ['password'],
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

  @Post('sign-up')
  @ApiOperation({ summary: 'Sign-up user' })
  @ApiOkResponse({ type: AuthUserDto })
  @ApiBody({ type: CreateUserInput })
  async signUp(@Body() input: CreateUserInput): Promise<AuthUserDto> {
    return this.service.signUp(input);
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
