import { AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects, PureAbility, Ability } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { User } from "../auth/entities/user.entity";

export enum Action {
    Manage = 'manage', // Comodín para cualquier acción.
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}

type Condition = {
    field: string;
    operator: string;
    value: any;
};

export type Subjects = InferSubjects<typeof User> | 'all';

export type AppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
    // Aquí definimos las principales reglas y permisos para el usuario.
    defineAbiliy(user: User) {
        const { can, cannot, build } = new AbilityBuilder<AppAbility>(Ability as AbilityClass<AppAbility>);

        if (user.isAdmin) {
            can(Action.Manage, 'all');
        } else {
            // El usuario en este punto ha iniciado sesión cons Passport js y JWT.
            can(Action.Read, 'all');
            can(Action.Update, User, { id: user.id });
            cannot(Action.Delete, User, { id: user.id });
        }

        return build({
            // Esta es una función que se utilizará para detectar el tipo de sujeto. Ej: can(Actione.Read, User) o can(Action.Read, 'all')
            detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
        });

    }

}
