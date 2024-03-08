import { PartialType } from '@nestjs/swagger';
import { CreateTestProductDto } from './create-test-product.dto';

export class UpdateTestProductDto extends PartialType(CreateTestProductDto) {}
