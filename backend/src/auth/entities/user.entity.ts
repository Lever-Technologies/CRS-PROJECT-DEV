import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'id of the user', nullable: true })
  id: string;
  @Column()
  @Field(() => String, { description: ' name of the user' })
  name: string;
  @Column()
  @Field(() => String, { description: 'email of the user' })
  email: string;
  @Exclude()
  @Column({ nullable: true })
  @Field(() => String, {
    description: '[password] of the user',
    nullable: true,
  })
  password: string;
  @Column({ nullable: true })
  @Field(() => Date, { description: 'last login of the user', nullable: true })
  lastLoginAt: Date;
}
