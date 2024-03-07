# Redis

Status: Not started

### Cache Manager con Redis

El módulo de Cache Manager con Redis proporciona una forma eficiente de almacenar en caché datos en una base de datos Redis en tu aplicación Nest.js. A continuación, se muestra cómo se implementa el módulo y se utiliza en la aplicación:

1. Configuración en el Módulo Principal de la Aplicación:
   En el archivo `app.module.ts`, importa el módulo `CacheModule` y configúralo para utilizar Redis como almacén de caché:

```

   ```typescript
   import { Module } from '@nestjs/common';
   import { CacheModule } from '@nestjs/cache-manager';
   import { redisStore } from 'cache-manager-redis-yet';

   @Module({
     imports: [
       CacheModule.registerAsync({
         useFactory: async () => ({
           store: redisStore,
           host: 'localhost',
           port: 6379,
         }),
       }),
       // Otros módulos importados aquí...
     ],
     // Otros ajustes del módulo aquí...
   })
   export class AppModule {}

```

En este ejemplo, se configura **`CacheModule`** para utilizar Redis como almacén de caché. Se especifica el host y el puerto de Redis para establecer la conexión.

1. Uso del Almacén de Caché en un Servicio:
Una vez configurado, puedes inyectar el almacén de caché (**`Cache`**) en cualquier servicio donde necesites almacenar o recuperar datos en caché. Por ejemplo, en el servicio **`TestProductService`**, puedes utilizar el almacén de caché para almacenar los resultados de una operación de búsqueda:
    
    ```tsx
    typescriptCopy code
    import { Injectable } from '@nestjs/common';
    import { Cache } from '@nestjs/common';
    
    @Injectable()
    export class TestProductService {
      constructor(private readonly cacheManager: Cache) {}
    
      async latency() {
        const key = 'UsersfindAll';
        const usersCache = await this.cacheManager.get(key);
    
        if (usersCache) {
          return usersCache;
        }
    
        const users = [
          { name: 'user1', age: 25 },
          { name: 'user2', age: 30 },
          { name: 'user3', age: 28 }
        ];
    
        await this.cacheManager.set(key, users, { ttl: 10 });
        return users;
      }
    }
    
    ```
    
    En este ejemplo, se utiliza el método **`get()`** para recuperar datos del almacén de caché y el método **`set()`** para almacenar datos en caché. Se especifica un tiempo de vida (TTL) de 10 segundos para los datos almacenados en caché.
    
2. Utilización de Datos en Caché:
Puedes utilizar los datos almacenados en caché en cualquier parte de tu aplicación donde sea necesario. Por ejemplo, en un controlador:
    
    ```tsx
    typescriptCopy code
    import { Controller, Get } from '@nestjs/common';
    import { TestProductService } from './test-product.service';
    
    @Controller('test-product')
    export class TestProductController {
      constructor(private readonly testProductService: TestProductService) {}
    
      @Get('users')
      async getUsers() {
        return this.testProductService.latency();
      }
    }
    
    ```
    
    En este controlador, se utiliza el servicio **`TestProductService`** para obtener los usuarios. Si los usuarios ya están en caché, se devuelven desde la caché; de lo contrario, se realiza una operación de búsqueda y se almacenan en caché para futuras solicitudes.
    

Con esta configuración y uso adecuados, puedes aprovechar el almacén de caché con Redis en tu aplicación Nest.js para mejorar el rendimiento y la escalabilidad al reducir la carga en la base de datos principal.