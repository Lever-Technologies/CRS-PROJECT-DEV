import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { companyModule } from 'src/company/company.module';
import { Team } from './entities/team.entity';
import { TeamResolver } from './team.resolver';
import { TeamService } from './team.service';

@Module({
  imports: [TypeOrmModule.forFeature([Team]), forwardRef(() => companyModule)],
  providers: [TeamResolver, TeamService],
  exports: [TeamService],
})
export class TeamModule {}
