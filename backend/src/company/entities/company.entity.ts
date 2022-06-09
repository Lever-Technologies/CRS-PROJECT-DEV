import { ObjectType, Field } from '@nestjs/graphql';
import { Team } from 'src/team/entities/team.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'id of the company' })
  id: string;
  @Column()
  @Field(() => String, { description: 'name of the company' })
  companyName: string;
  @Column()
  @Field(() => String, { description: 'companyCEO of the company' })
  companyCEO: string;
  @Column()
  @Field(() => String, { description: 'address of the company' })
  companyAddress: string;
  @Column({ nullable: true })
  @Field(() => Date, {
    description: 'Inception Date  of the company',
    nullable: true,
  })
  inceptionDate: Date;

  @Field(() => [Team])
  teams: Team[];

  @OneToMany(() => Team, (team) => team.companyConnection)
  teamConnection: Promise<Team[]>;
}
