import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestProductService } from './test-product.service';
import { CreateTestProductDto } from './dto/create-test-product.dto';
import { UpdateTestProductDto } from './dto/update-test-product.dto';

@Controller('test-product')
export class TestProductController {
  constructor(private readonly testProductService: TestProductService) {}

  @Post()
  create(@Body() createTestProductDto: CreateTestProductDto) {
    return this.testProductService.create(createTestProductDto);
  }

  @Get()
  findAll() {
    return this.testProductService.findAll();
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
