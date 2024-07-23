import { HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';



export default function (context: HookContext) {

    const { User } = context.params;
    if (!User) throw new BadRequest('You must be logged in to access this service');
    const minAge = +process.env.MIN_AGE;
    const age = new Date().getFullYear() - new Date(User.birthdate).getFullYear();
    if (age < minAge) throw new BadRequest(`You must be at least ${minAge} years old to have an account.`);

    return context;
} 