import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFiles, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BufferedFile } from 'src/minio-client/file.model';
import { ParseFormDataRequestPipe } from 'src/pipes/parse-form-data-request.pipe';
import { RegistrationStatusDto } from 'src/users/dto/registration-status.dto';
import { UserStatus } from 'src/users/entities/user.entity';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { VolunteerDepartmentsDto } from './dto/volunteer-departments.dto';
import { VolunteersService } from './volunteers.service';

@Controller('volunteers')
export class VolunteersController {

  constructor(private readonly service: VolunteersService) { }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'idCard', maxCount: 1 },
    { name: 'idCardSelfie', maxCount: 1 },
    { name: 'medCertificate', maxCount: 1 },
    { name: 'medCertificateSelfie', maxCount: 1 }
  ]))
  async create(
    @Body(new ParseFormDataRequestPipe(), new ValidationPipe())
    createVolunteerDto: CreateVolunteerDto,
    @UploadedFiles() bufferedFile: BufferedFile
  ) {
    return this.service.create(createVolunteerDto, bufferedFile);
  }

  @UseGuards(JwtAuthGuard)
  @Get('approved')
  findAllApproved() {
    return this.service.findAll(UserStatus.APPROVED);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':nationalId')
  findOne(@Param('nationalId') nationalId: number) {
    return this.service.findOne(nationalId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':nationalId')
  remove(@Param('nationalId') nationalId: number) {
    return this.service.remove(nationalId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/verify-registration-status')
  update(@Param('id') id: number, @Body(new ValidationPipe()) verifyStatusDto: RegistrationStatusDto) {
    return this.service.updateStatus(id, verifyStatusDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/training-status')
  updateTrainingStatus(
    @Param('id') id: number,
    @Body(new ValidationPipe()) volunteerDepartmentsDto: VolunteerDepartmentsDto
  ) {
    return this.service.updateTrainingStatus(+id, volunteerDepartmentsDto);
  }

}
