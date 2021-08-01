import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { Doctor } from './entities/doctor.entity';
import { SpecializedField } from './entities/specializedField.entity';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private doctorsRepository: Repository<Doctor>,
    @InjectRepository(SpecializedField)
    private expertiseRepository: Repository<SpecializedField>,
  ) { }

  async create(createDoctorDto: CreateDoctorDto) {
    try {
      const connection = getConnection();
      const saveDoctor = new Doctor();
      const saveObject = Object.assign(saveDoctor, createDoctorDto);
      await connection.manager.save(saveObject);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('ผู้ใช้นี้ได้ลงทะเบียนแล้ว');
      }
      throw new InternalServerErrorException(error.code);
    }
  }

  findAll(): Promise<Doctor[]> {
    return this.doctorsRepository.find({
      relations: ['specializedField'],
      order: {
        updatedTime: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Doctor> {
    const doctors = await this.doctorsRepository.findOne(id, {
      relations: ['specializedField']
    });
    if (!doctors) {
      return {} as Doctor;
    }
    return doctors;
  }

  async remove(id: number): Promise<void> {
    await this.doctorsRepository.delete(id);
  }
}
