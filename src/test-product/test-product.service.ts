import { Injectable } from '@nestjs/common';
import { CreateTestProductDto } from './dto/create-test-product.dto';
import { UpdateTestProductDto } from './dto/update-test-product.dto';
import { TranslateService } from '@src/translate/translate.service';


@Injectable()
export class TestProductService {
  constructor(
    private readonly translateService: TranslateService
  ) { }


  async create(createTestProductDto: CreateTestProductDto) {
    const translatedMessage = await this.translateService.translate('test.click', { args: {} }, 'es');

    return translatedMessage;
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
