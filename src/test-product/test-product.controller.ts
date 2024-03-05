import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';

import { TestProductService } from './test-product.service';
import { CreateTestProductDto } from './dto/create-test-product.dto';
import { UpdateTestProductDto } from './dto/update-test-product.dto';

@Controller('test-product')
export class TestProductController {
  constructor(private readonly testProductService: TestProductService) { }

  @Get('translate')
  testTranslate(@I18n() i18n: I18nContext) {
    return i18n.t(`test.here`);
  }

  @Get('latency')
  async outputWithLatencyTest(@Body() createTestProductDto: CreateTestProductDto) {

    return this.testProductService.latency();
  }

  @Get()
  findAll() {
    return;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testProductService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestProductDto: UpdateTestProductDto) {
    return this.testProductService.update(+id, updateTestProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testProductService.remove(+id);
  }
}
