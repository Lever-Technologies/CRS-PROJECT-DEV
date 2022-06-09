import {
  ClassSerializerInterceptor,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CompanyService } from 'src/company/company.service';
import { Company } from 'src/company/entities/company.entity';
import teamInput, { teamFilters } from './dto/team.dto';
import { Team } from './entities/team.entity';
import { TeamService } from './team.service';

@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Resolver(Team)
export class TeamResolver {
  constructor(
    private readonly teamService: TeamService,
    private readonly companyService: CompanyService,
  ) {}
  @Query(() => [Team])
  public async teams(@Args('filters') filters: teamFilters): Promise<Team[]> {
    return this.teamService.findAll(filters);
  }
  @Query(() => Team, { nullable: true })
  public async team(@Args('id') id: string): Promise<Team> {
    return this.teamService.findOne(id);
  }

  @Mutation(() => Team)
  public async createTeam(@Args('data') input: teamInput): Promise<Team> {
    const team = new Team();
    team.teamName = input.teamName;
    team.teamLeadName = input.teamLeadName;
    if (input?.company?.connect) {
      team.companyId = input?.company?.connect?.id;
    } else {
      if (!input?.company?.create) {
        throw new Error(
          'Either pass a valid company id for the team or provide a new comany using the create input option',
        );
      }
      const savedCompany = await this.companyService.create(
        input.company.create,
      );
      team.companyId = savedCompany.id;
    }
    return this.teamService.create(team);
  }

  @ResolveProperty()
  public async company(@Parent() parent): Promise<Company> {
    return this.companyService.findOne(parent.companyId);
  }
}
