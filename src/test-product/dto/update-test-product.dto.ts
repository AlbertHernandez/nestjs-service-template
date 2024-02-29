import { PartialType } from '@nestjs/mapped-types';
import { CreateTestProductDto } from './create-test-product.dto';

export class UpdateTestProductDto extends PartialType(CreateTestProductDto) {}
