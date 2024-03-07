# Documentación del Módulo de Internacionalización (I18n)

Status: Not started

## **Introducción**

El Módulo de Internacionalización (I18n) en tu aplicación Nest.js te permite manejar la localización y traducción de textos para admitir múltiples idiomas. Este módulo utiliza la biblioteca **`nestjs-i18n`** para proporcionar una forma fácil de internacionalizar tu aplicación.

### **Propósito**

El propósito del Módulo de Internacionalización (I18n) es permitir que tu aplicación admita múltiples idiomas y ofrezca una experiencia localizada a los usuarios.

### **Configuración del Módulo I18n**

Para configurar el módulo de internacionalización en tu aplicación, sigue estos pasos:

1. **Importar el Módulo**: Asegúrate de importar el módulo **`I18nModule`** en el módulo principal de tu aplicación.

```tsx
typescriptCopy code
import { Module } from '@nestjs/common';
import { I18nModule } from 'nestjs-i18n';
import * as path from 'path';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'es',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
  ],
})
export class AppModule {}

```

1. **Configurar el Módulo**: En la configuración del módulo, especifica el idioma predeterminado y la ubicación de los archivos de traducción.
2. **Definir Resolvers**: Opcionalmente, puedes definir resolvers para manejar la detección automática del idioma del usuario.

### **Uso del Módulo I18n en los Controladores**

Una vez configurado el módulo de internacionalización, puedes utilizarlo en tus controladores para traducir los textos. Aquí hay un ejemplo de cómo hacerlo:

```tsx
typescriptCopy code
import { Controller, Get } from '@nestjs/common';
import { I18nContext, I18n } from 'nestjs-i18n';

@Controller('test-product')
export class TestProductController {
  constructor(private readonly testProductService: TestProductService) {}

  @Get('translate')
  testTranslate(@I18n() i18n: I18nContext) {
    return i18n.t(`test.here`);
  }
}

```

En este ejemplo, el método **`testTranslate`** del controlador traduce el texto **`test.here`** utilizando el servicio de internacionalización.

### **Conclusión**

El Módulo de Internacionalización (I18n) en tu aplicación Nest.js te permite proporcionar una experiencia localizada a los usuarios, admitiendo múltiples idiomas y facilitando la traducción de textos. Utiliza este módulo para mejorar la accesibilidad y la usabilidad de tu aplicación en diferentes contextos culturales y lingüísticos.