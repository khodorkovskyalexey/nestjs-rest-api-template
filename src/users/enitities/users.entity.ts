import * as crypto from 'crypto';

import { Base } from 'src/common/entities/base.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { AuthProvider, UserRole } from '../types/enums';

const tableName = 'users';

@Entity({
  name: tableName,
})
@Unique('USER_PHONE_UNIQ', ['phone'])
@Unique('USER_EMAIL_UNIQ', ['email'])
export class User extends Base {
  static tableName = tableName;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @BeforeInsert()
  @BeforeUpdate()
  updateEmail() {
    this.email = this.email.toLowerCase();
  }

  @Column({ type: 'text' })
  email: string;

  @BeforeInsert()
  hashPasswordBeforeInsert() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }

  @BeforeUpdate()
  hashPasswordBeforeUpdate() {
    if (this.password) {
      this.password = crypto.createHmac('sha256', this.password).digest('hex');
    }
  }

  @Column({ type: 'text', select: false })
  password: string;

  @Column({ type: 'text', nullable: true })
  phone?: string;

  @Column({ type: 'text', nullable: true })
  firstName?: string;

  @Column({ type: 'text', nullable: true })
  lastName?: string;

  @Column({ type: 'text', nullable: true })
  avatar?: string;

  @Column({
    type: 'enum',
    enum: AuthProvider,
    default: AuthProvider.LOCALE,
  })
  authProvider: AuthProvider;
}
