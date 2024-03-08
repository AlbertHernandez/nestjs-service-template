import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class TranslateService {
    constructor(private readonly i18nService: I18nService) { }

    async translate(key: string, args: any = {}, lang?: string): Promise<string> {
        return this.i18nService.translate(key, {
            lang,
            args,
        });
    }
}