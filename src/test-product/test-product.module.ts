import { Module } from '@nestjs/common';
import { TestProductService } from './test-product.service';
import { TestProductController } from './test-product.controller';
import { TestProduct } from './entities/test-product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TestProductController],
  providers: [TestProductService],
  imports: [TypeOrmModule.forFeature([TestProduct])],
})
export class TestProductModule { }
