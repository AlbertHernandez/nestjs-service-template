## **Plantilla de Servicio NestJS de Komvoy ⭐**

Este repositorio proporciona una plantilla robusta para el desarrollo de servicios basados en NestJS, incorporando las mejores prácticas y características esenciales requeridas para aplicaciones listas para producción.

A continuación se presenta un menú de enlaces a la documentación de los diferentes módulos incluidos en esta plantilla:

- [Configuración Global](./documentation/config-module.md)
- [Correo Electrónico](./documentation/email-service.md)
- [Carga de Archivos](./documentation/files-upload.md)
- [Internacionalización (I18n)](./documentation/localization-multi-language.md)
- [Autenticación](./documentation/authentication.md)
- [Autorización](./documentation/authorization.md)
- [Registro de Errores con Sentry](./documentation/sentry-logger.md)
- [Caching con Redis](./documentation/redis.md)

### Funcionalidades Incluidas:

- Dockerización completa para entornos de desarrollo y producción.
- Utiliza SWC para una compilación y ejecución de pruebas más rápida.
- Integración con Fastify para un mejor rendimiento web.
- Uso de Husky para mantener la calidad del código y las convenciones.
- Separación de pruebas de código de producción.
- Pruebas unitarias y de extremo a extremo con Vitest y Supertest.
- Cobertura combinada de pruebas unitarias y de extremo a extremo.
- Alias de ruta personalizados para una importación más limpia.
- CI/CD con GitHub Actions para garantizar la calidad del código y detectar vulnerabilidades.

### Configuración Global

- **Gestión de Variables de Entorno:** Administra eficientemente las variables de entorno para la configuración global de la aplicación.
- **Configuración de TypeORM:** Configura TypeORM para interacciones fluidas con la base de datos.

### Correo Electrónico

- **Integración con Nodemailer:** Integra y configura Nodemailer para enviar correos electrónicos dentro de la aplicación. Admite servicios de correo electrónico configurables mediante variables de entorno.

### Carga de Archivos

- **Subida de Archivos:** Simplifica la subida de archivos con capacidades de filtrado y procesamiento previo al almacenamiento.

### Internacionalización (I18n)

- **Localización y Traducción:** Habilita la localización y traducción de textos de la aplicación para admitir varios idiomas utilizando nestjs-i18n.

### Prueba de Producto

- **Endpoints de Pruebas de Producto:** Proporciona endpoints para probar implementaciones y funcionalidades durante el desarrollo de la aplicación.

### Autenticación

- **Autenticación de Usuarios:** Autentica usuarios utilizando Tokens de Seguridad JSON (JWT) para la seguridad. Incluye confirmación de correo electrónico y estrategia de autenticación Google OAuth2.0.

### Autorización

- **Autorización de Usuarios:** Define y verifica las capacidades de los usuarios, permitiendo la gestión de roles y acceso a recursos según las reglas establecidas.

### Registro de Errores con Sentry

- **Registro de Errores con Sentry:** Integra y configura Sentry para el registro de errores dentro de la aplicación. Captura y envía automáticamente excepciones y errores a la plataforma Sentry para su análisis y seguimiento.

### Cache Manager con Redis

El módulo de Cache Manager con Redis en Nest.js permite almacenar datos en caché de forma eficiente utilizando una base de datos Redis. Esta funcionalidad mejora el rendimiento y la escalabilidad de la aplicación al reducir la carga en la base de datos principal mediante el almacenamiento temporal de datos en memoria.

### **Uso**

Siga las instrucciones a continuación para utilizar las funcionalidades y estructura proporcionadas por esta plantilla:

1. Clone este repositorio.
2. Cree un archivo **`.env`** basado en el **`.env.example`** proporcionado.
3. Utilice Docker para entornos de desarrollo y producción:
   - Modo de Desarrollo: **`docker-compose up -d my-service-dev`**
   - Modo de Producción: **`docker-compose up -d my-service-production`**
4. Depure la aplicación configurando su IDE en consecuencia, con soporte para recarga en caliente.
5. Acceda al punto de control de salud (**`http://localhost:3000/health`**) para verificar la funcionalidad del servicio.
6. Ejecute pruebas utilizando **`npm run test`**, **`npm run test:unit`**, o **`npm run test:e2e`**.
7. Administre el linting con **`npm run lint`** y **`npm run lint:fix`**.

Para instrucciones detalladas de uso, consulte el README original de la Plantilla de Servicio NestJS.

Este repositorio es parte de los esfuerzos de Komvoy para agilizar los procesos de desarrollo de servicios y adherirse a las mejores prácticas de la industria.

---

⭐ **Basado en la Plantilla Original:** Plantilla de NestJS Service Template por Albert Hernandez.
Available here: https://github.com/AlbertHernandez/nestjs-service-template
