const crypto = require('crypto');

import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Base } from 'src/common/entities';
import { AdminRole } from '../admins.types';

const tableName = 'admins';

@Entity({
  name: tableName,
})
@Unique('ADMIN_EMAIL_UNIQ', ['email'])
export class Admin extends Base {
  static tableName = tableName;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: AdminRole,
    default: AdminRole.ADMIN,
  })
  role: AdminRole;

  @BeforeInsert()
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

  @Column({ type: 'text' })
  firstName: string;

  @Column({ type: 'text' })
  lastName: string;
}
