import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminsRepository } from 'src/admins/repositories';
import { UserController } from './controllers';
import { User } from './enitities';
import { UsersRepository } from './repositories';
import { UserService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([AdminsRepository, UsersRepository, User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UsersModule {}
