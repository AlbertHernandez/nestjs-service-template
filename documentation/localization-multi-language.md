# **Módulo de Traducción**

El módulo de traducción encapsula la funcionalidad de internacionalización (i18n) en una aplicación NestJS. Utiliza la biblioteca **`nestjs-i18n`** para manejar las traducciones en diferentes idiomas.

## **Configuración**

El módulo de traducción se configura utilizando el método **`forRoot`** de **`I18nModule`**. Se proporciona la configuración necesaria, como el idioma predeterminado y la ubicación de los archivos de traducción.

```tsx
typescriptCopy code
import { Module } from '@nestjs/common';
import { TranslateService } from './translate.service';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import path from 'path';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'es', // Idioma predeterminado
      loaderOptions: {
        path: path.join(__dirname, '../i18n'), // Ruta de los archivos de traducción
        watch: true, // Observar cambios en los archivos de traducción
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

```

## **Uso del Servicio de Traducción**

El servicio de traducción (**`TranslateService`**) proporciona un método **`translate`** para obtener traducciones en diferentes idiomas.

```tsx
typescriptCopy code
import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class TranslateService {
    constructor(private readonly i18nService: I18nService) { }

    /**
     * Traduce una clave de traducción al idioma especificado.
     * @param key Clave de traducción
     * @param args Argumentos opcionales para la traducción
     * @param lang Idioma al que se traducirá el texto (opcional)
     * @returns La traducción correspondiente a la clave proporcionada
     */
    async translate(key: string, args: any = {}, lang?: string): Promise<string> {
        return this.i18nService.translate(key, {
            lang,
            args,
        });
    }
}

```

## **Ejemplo de Uso**

Para utilizar el servicio de traducción en otro módulo, simplemente inyecte el servicio y llame al método **`translate`** con la clave de traducción deseada.

```tsx
import { Injectable } from "@nestjs/common";
import { TranslateService } from "./translate/translate.service";

@Injectable()
export class SomeService {
  constructor(private readonly translateService: TranslateService) {}

  async someMethod() {
    const translatedMessage =
      await this.translateService.translate("hello_world");
    console.log(translatedMessage); // Salida: "¡Hola Mundo!"
  }
}
```

Con esto, puedes integrar fácilmente la funcionalidad de traducción en tu aplicación NestJS utilizando el módulo de traducción proporcionado.
