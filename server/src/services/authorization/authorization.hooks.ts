/**
 * This file contains hooks for authorization in the server application.
 * These hooks are used to enforce authentication and authorization rules
 * before executing certain service methods.
 *
 * @module services/authorization/authorization.hooks
 */

import * as authentication from '@feathersjs/authentication';
import { disallow } from 'feathers-hooks-common';

const { authenticate } = authentication.hooks;

/**
 * Hook object containing before hooks for authorization.
 */

const authorizationHooks = {
  before: {
    /**
     * Before hook that authenticates the user using JWT strategy for all service methods.
     */
    all: [authenticate('jwt')],

    /**
     * Before hook that disallows the 'find' method.
     */
    find: disallow(),

    /**
     * Before hook that disallows the 'get' method.
     */
    get: disallow(),

    /**
     * Before hook that sets the 'granted_by' property in the 'create' method's context data.
     */
    create: [(context) => {
      context.data.granted_by = context.params.User.id;
      return context;
    }],

    /**
     * Before hook that disallows the 'update' method.
     */
    update: disallow(),

    /**
     * Before hook that disallows the 'patch' method.
     */
    patch: disallow(),

    /**
     * Before hook that disallows the 'remove' method.
     */
    remove: disallow(),
  },
};

export default authorizationHooks;
