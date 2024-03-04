/* The `AbilitiesGuard` class in TypeScript is a NestJS guard that checks user abilities based on
defined rules using the `@CheckAbilities` decorator. */
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AbilityFactory } from './ability.factory';
import { CHECK_ABILITY, RequiredRules } from './abilities.decorator';
import { ForbiddenError } from '@casl/ability';

// Usar con estas guardias en módulos.
// @UseGuards(AbilitiesGuard)
// @CheckAbilities(new ReadUserAbility())

/* The AbilitiesGuard class in TypeScript is a CanActivate guard that checks user abilities based on
defined rules using an AbilityFactory. */
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