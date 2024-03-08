import { Module } from '@nestjs/common';
import { TestProductService } from './test-product.service';
import { TestProductController } from './test-product.controller';
import { TranslateService } from '@src/translate/translate.service';
import { TranslateModule } from '@src/translate/translate.module';

@Module({
  imports: [TranslateModule],
  controllers: [TestProductController],
  providers: [TestProductService, TranslateService],
})
export class TestProductModule { }
