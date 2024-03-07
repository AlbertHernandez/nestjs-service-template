# 02-Documentación del Módulo de Autorización

Status: Not started

## **Introducción**

Esta documentación presenta el módulo de autorización integrado en tu aplicación Nest.js 10. El módulo utiliza la biblioteca Casl para definir y verificar las capacidades de los usuarios, como administrar, crear, leer, actualizar y eliminar recursos. El módulo permite la personalización de roles, con roles predeterminados de administrador y usuario.

## **Características**

1. **Definición de Capacidades**: Utiliza la biblioteca Casl para definir las capacidades de los usuarios en función de los roles y las reglas establecidas.
2. **Guardia de Habilidades (AbilitiesGuard)**: Una guardia de Nest.js que verifica las capacidades del usuario según las reglas definidas.
3. **Decorador de Chequeo de Habilidades (CheckAbilities)**: Un decorador que se utiliza para especificar las habilidades necesarias para acceder a un recurso en un controlador o un método del módulo.
4. **Módulo de Autorización (AbilityModule)**: Un módulo que proporciona la capacidad de definir y exportar la fábrica de habilidades.

## **Uso**

### **Ejemplo de Implementación del Módulo de Autorización**

```tsx
// abilities.decorator.ts

import { SetMetadata } from '@nestjs/common';
import { RequiredRules } from './abilities.guard';

export const CHECK_ABILITY = 'check_ability';

export const CheckAbilities = (...requirements: RequiredRules[]) =>
    SetMetadata(CHECK_ABILITY, requirements);

export class ReadUserAbility implements RequiredRules {
    action: Action;
    subject: Subjects;
}

```

```tsx
// ability.factory.ts

import { Ability, AbilityBuilder, AbilityClass, InferSubjects } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from '../auth/entities/user.entity';

export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}

export type Subjects = InferSubjects<typeof User> | 'all';
export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
    defineAbility(user: User) {
        const { can, cannot, build } = new AbilityBuilder(
            Ability as AbilityClass<AppAbility>,
        );
        // Lógica para definir capacidades basadas en el usuario y el rol
        return build();
    }
}

```

```tsx
// abilities.guard.ts

import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AbilityFactory } from './ability.factory';
import { CHECK_ABILITY, RequiredRules } from './abilities.decorator';
import { ForbiddenError } from '@casl/ability';

@Injectable()
export class AbilitiesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private abilityFactory: AbilityFactory,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const rules =
            this.reflector.get<RequiredRules[]>(
                CHECK_ABILITY,
                context.getHandler(),
            ) || [];

        const { user } = context.switchToHttp().getRequest();
        const ability = this.abilityFactory.defineAbility(user);

        try {
            rules.forEach((rule) => {
                ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject);
            });
            return true;
        } catch (error) {
            if (error instanceof ForbiddenError) {
                throw new ForbiddenException(error.message);
            }
        }
    }
}

```

```tsx
typescriptCopy code
// ability.module.ts

import { Module } from '@nestjs/common';
import { AbilityFactory } from './ability.factory';
@Module({
    providers: [AbilityFactory],
    exports: [AbilityFactory],
})
export class AbilityModule { }

```

### **Ejemplo de Uso en un Controlador**

```tsx
// users.controller.ts

import { Controller, Get, UseGuards } from '@nestjs/common';
import { AbilitiesGuard } from './abilities.guard';
import { CheckAbilities, ReadUserAbility } from './abilities.decorator';

@Controller('users')
@UseGuards(AbilitiesGuard)
export class UsersController {
    @Get()
    @CheckAbilities(new ReadUserAbility())
    getUsers() {
        // Lógica para obtener usuarios
    }
}

```

En el ejemplo anterior, el controlador **`UsersController`** define una ruta **`GET`** para obtener usuarios. El decorador **`@CheckAbilities(new ReadUserAbility())`** se utiliza para especificar que los usuarios deben tener la capacidad de leer usuarios (**`ReadUserAbility`**) para acceder a esta ruta. La guardia **`AbilitiesGuard`** verifica si el usuario tiene las habilidades necesarias antes de permitir el acceso a la ruta.