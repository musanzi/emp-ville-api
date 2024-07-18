import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>
  ) {}

  async create(dto: CreateDepartmentDto): Promise<{ data: Department }> {
    try {
      const data = await this.departmentRepository.save(dto);
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de l'ajout du département");
    }
  }

  async findAll(): Promise<{ data: Department[] }> {
    const data = await this.departmentRepository.find();
    return { data };
  }

  async findOne(id: number): Promise<{ data: Department }> {
    try {
      const data = await this.departmentRepository.findOneOrFail({
        where: { id }
      });
      return { data };
    } catch {
      throw new BadRequestException('Département introuvable');
    }
  }

  async update(id: number, dto: UpdateDepartmentDto): Promise<{ data: Department }> {
    try {
      await this.findOne(id);
      await this.departmentRepository.update(id, dto);
      return await this.findOne(id);
    } catch {
      throw new BadRequestException('Erreur lors de la mise à jour du département');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.findOne(id);
      await this.departmentRepository.delete(id);
    } catch {
      throw new BadRequestException('Département introuvable');
    }
  }
}
