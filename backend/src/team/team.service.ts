import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { teamFilters } from './dto/team.dto';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly TeamRepository: Repository<Team>,
  ) {}

  async create(createTeamInput: Team): Promise<Team> {
    return await this.TeamRepository.save(createTeamInput);
  }

  async findAll(filters: teamFilters): Promise<Array<Team>> {
    return await this.TeamRepository.find({
      where: { ...filters },
      relations: ['companyConnection'],
    });
  }

  async findOne(id: string): Promise<Team> {
    const Team = await this.TeamRepository.findOne(id, {
      relations: ['companyConnection'],
    });
    if (!Team) {
      throw new NotFoundException(`Team #${id} not found`);
    }
    return Team;
  }
}
