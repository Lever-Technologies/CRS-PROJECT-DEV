import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Company } from 'src/company/entities/company.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'id of the team' })
  id: string;
  @Column()
  @Field(() => String, { description: 'name of the team' })
  teamName: string;
  @Column()
  @Field(() => String, { description: 'teamLeadName of the team' })
  teamLeadName: string;

  @Column('uuid')
  @Field(() => String, { description: 'companyid of the team' })
  companyId: string;

  @Field(() => Company)
  company: Company;

  @ManyToOne(() => Company, (company) => company.teamConnection, {
    primary: true,
    cascade: ['update', 'remove'],
  })
  @JoinColumn({ name: 'companyId' })
  companyConnection: Promise<Company>;
}
