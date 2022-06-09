import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { Company } from './entities/company.entity';
import {
  companyFilters,
  CreateCompanyInput,
  UpdateCompanyInput,
} from './dto/company.dto';
import {
  ClassSerializerInterceptor,
  forwardRef,
  Inject,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { TeamService } from 'src/team/team.service';
import { Team } from 'src/team/entities/team.entity';

@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Resolver(() => Company)
export class CompanyResolver {
  constructor(
    private readonly CompanyService: CompanyService,
    private readonly teamService: TeamService,
  ) {}

  @Mutation(() => Company)
  createCompany(
    @Args('createCompanyInput') createCompanyInput: CreateCompanyInput,
  ) {
    return this.CompanyService.create(createCompanyInput);
  }

  @Query(() => [Company], { name: 'Companys' })
  findAll(@Args('filters') filters: companyFilters) {
    return this.CompanyService.findAll(filters);
  }

  @Query(() => Company, { name: 'Company' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.CompanyService.findOne(id);
  }
  @ResolveProperty()
  public async teams(@Parent() parent): Promise<Team[]> {
    const teamArray = this.teamService.findAll({ companyId: parent.id });
    return teamArray;
  }
}
