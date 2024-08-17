import { PartialType } from '@nestjs/mapped-types';
import { CreateSgicCaso } from './create-sgic-caso.dto';

export class UpdateSgicDatumDto extends PartialType(CreateSgicCaso) {}
