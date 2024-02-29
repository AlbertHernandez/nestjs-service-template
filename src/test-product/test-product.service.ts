import { Injectable } from '@nestjs/common';
import { CreateTestProductDto } from './dto/create-test-product.dto';
import { UpdateTestProductDto } from './dto/update-test-product.dto';

@Injectable()
export class TestProductService {
  create(createTestProductDto: CreateTestProductDto) {
    return 'This action adds a new testProduct';
  }

  findAll() {
    return `This action returns all testProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testProduct`;
  }

  update(id: number, updateTestProductDto: UpdateTestProductDto) {
    return `This action updates a #${id} testProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} testProduct`;
  }
}
