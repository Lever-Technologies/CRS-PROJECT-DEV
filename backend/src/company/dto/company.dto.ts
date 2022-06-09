import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCompanyInput {
  @IsString()
  @Field(() => String, { description: 'company name' })
  public readonly companyName: string;
  @IsString()
  @Field(() => String, { description: 'companyCEO of the company' })
  public readonly companyCEO: string;
  @IsString()
  @Field(() => String, { description: 'address of the company' })
  public readonly companyAddress: string;
  @IsOptional()
  @Field(() => Date, {
    description: 'Inception Date of the  Company',
    nullable: true,
  })
  public readonly inceptionDate: Date;
}

@InputType()
export class UpdateCompanyInput extends PartialType(CreateCompanyInput) {
  @IsString()
  @Field(() => String)
  public readonly companyId: string;
}

@InputType()
export class companyFilters {
  @IsString()
  @Field(() => String, { nullable: true })
  public readonly companyName: string;
}
