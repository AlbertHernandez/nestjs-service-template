import { Module } from '@nestjs/common';
import { TranslateService } from './translate.service';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import path from 'path';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: process.env.FALLBACK_LANGUAGE || 'es',
      loaderOptions: {
        path: path.join(__dirname, '../../locale'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
  ],
  providers: [TranslateService],
  exports: [TranslateService],
})
export class TranslateModule { }
