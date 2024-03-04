import { Action, Subjects } from './ability.factory';
import { SetMetadata } from '@nestjs/common';


// Usar con estas guardias en módulos.
// @UseGuards(AbilitiesGuard)
// @CheckAbilities(new ReadUserAbility())

export interface RequiredRules {
    action: Action;
    subject: Subjects;
}

export const CHECK_ABILITY = 'check_ability';

export const CheckAbilities = (...requirements: any) =>
    SetMetadata(CHECK_ABILITY, requirements);

export class ReadUserAbility implements RequiredRules {
    action: Action;
    subject: Subjects;
}