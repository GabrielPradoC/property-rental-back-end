// Libs
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import bcrypt from 'bcrypt';

// Enums
import { EnumRoles } from '../../common/enums';

@Entity()
export class User {
  @PrimaryColumn({
    generated: 'uuid',
  })
  public id: string;

  @Column({ length: 255, type: 'char' })
  public name: string;

  @Column()
  public phoneNumber: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @Column({ type: 'enum', enum: EnumRoles, default: EnumRoles.USER })
  public role: EnumRoles;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @BeforeInsert()
  private async beforeInsert(): Promise<void> {
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS ?? 10);

    this.password = await bcrypt.hash(this.password, saltRounds);
  }
}
