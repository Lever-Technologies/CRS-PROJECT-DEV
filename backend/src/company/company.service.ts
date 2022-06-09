import { Injectable, NotFoundException } from '@nestjs/common';
import {
  companyFilters,
  CreateCompanyInput,
  UpdateCompanyInput,
} from './dto/company.dto';
import { Company } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly CompanyRepository: Repository<Company>,
  ) {}

  async create(createCompanyInput: CreateCompanyInput): Promise<Company> {
    const Company = this.CompanyRepository.create(createCompanyInput);
    return await this.CompanyRepository.save(Company);
  }

  async findAll(filters: companyFilters): Promise<Array<Company>> {
    return await this.CompanyRepository.find({
      where: { ...filters },
      relations: ['teamConnection'],
    });
  }

  async findOne(id: string): Promise<Company> {
    const Company = await this.CompanyRepository.findOne(id, {
      relations: ['teamConnection'],
    });
    if (!Company) {
      throw new NotFoundException(`Company #${id} not found`);
    }
    return Company;
  }
}
