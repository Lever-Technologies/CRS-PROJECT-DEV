import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { CreateCompanyInput } from 'src/company/dto/company.dto';

@InputType()
class teamCompanyConnectInput {
  @IsString()
  @Field()
  readonly id: string;
}

@InputType()
class teamCompanyInput {
  @ValidateNested()
  @Type(() => teamCompanyConnectInput)
  @Field({ nullable: true })
  readonly connect: teamCompanyConnectInput;
  @ValidateNested()
  @Type(() => CreateCompanyInput)
  @Field({ nullable: true })
  readonly create: CreateCompanyInput;
}

@InputType()
class teamInput {
  @IsString()
  @Field()
  readonly teamName: string;
  @IsString()
  @Field()
  readonly teamLeadName: string;
  @ValidateNested()
  @Type(() => teamCompanyInput)
  @Field({ nullable: true })
  readonly company: teamCompanyInput;
}

@InputType()
export class teamFilters {
  @IsString()
  @Field(() => String, { nullable: true })
  public readonly companyId: string;
}

export default teamInput;
