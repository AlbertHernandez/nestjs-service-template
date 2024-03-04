import {
    Ability,
    AbilityBuilder,
    AbilityClass,
    ExtractSubjectType,
    InferSubjects,
} from '@casl/ability';
import { Delete, Injectable } from '@nestjs/common';
import { User } from '../auth/entities/user.entity';

export enum Action {
    Manage = 'mange',
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
        if (user.isAdmin) {
            can(Action.Manage, 'all');
            cannot(Action.Manage, User, { organizationId: { $ne: user.organizationId } })
                .because('Sólo puede gestionar usuarios de su organización.');
        } else {
            can(Action.Read, User);
            can(Action.Delete, User, { id: user.id });
            cannot(Action.Create, User).because('Sólo Administradores.');
            cannot(Action.Delete, User).because('Sólo Administradores.');
        }

        return build({
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<Subjects>,
        });
    }
}