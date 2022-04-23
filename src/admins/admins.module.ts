import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/users/repositories';
import { AdminsController } from './controllers';
import { AdminsRepository } from './repositories';
import { AdminService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([AdminsRepository, UsersRepository])],
  controllers: [AdminsController],
  providers: [AdminService],
})
export class AdminsModule {}
