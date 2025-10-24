import Hermes from './index.js';

export const Request = Hermes.Request;
export const Response = Hermes.Response;
export const Controller = Hermes.Controller;
export const Router = Hermes.Router;

export const createRequest: typeof Hermes.Request.create = Hermes.Request.create;
export const createResponse: typeof Hermes.Response.create = Hermes.Response.create;
export const createRouter: typeof Hermes.Router.create = Hermes.Router.create;
export const createController: typeof Hermes.Controller.create = Hermes.Controller.create;
