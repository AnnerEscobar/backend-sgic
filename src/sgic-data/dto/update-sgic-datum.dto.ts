import { PartialType } from '@nestjs/mapped-types';
import { CreateSgicDatumDto } from './create-sgic-datum.dto';

export class UpdateSgicDatumDto extends PartialType(CreateSgicDatumDto) {}
