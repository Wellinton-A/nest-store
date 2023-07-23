import { AddressEntity } from 'src/address/entities/address.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number

  @Column({ nullable: false })
  name: string

  @Column()
  phone: string

  @Column({ nullable: false })
  email: string

  @Column({ nullable: false })
  cpf: string

  @Column({ name: 'hashedpassword', nullable: false })
  hashedpassword: string

  @Column({ nullable: false })
  salt: string

  @Column({ name: 'type_user', nullable: false })
  type_user: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  UpdatedAt: Date

  @OneToMany(() => AddressEntity, (address) => address.user)
  addresses?: AddressEntity[]
}
