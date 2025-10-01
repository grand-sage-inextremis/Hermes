import Hms_Request from './Request/Request.js';
import Hms_Response from './Response/Response.js';
import { type Hms_ControllerLike } from './Controller/ControllerLike.js';
import Hms_Controller from './Controller/Controller.js';
import Hms_Router from './Router/Router.js';



export { default as Hms_Request } from './Request/Request.js';
export { default as Hms_Response } from './Response/Response.js';
export { default as Hms_Controller } from './Controller/Controller.js';
export { default as Hms_Router } from './Router/Router.js';



export { type Hms_RequestInstance } from './Request/RequestInterfaces.js';
export { type Hms_ControllerLike } from './Controller/ControllerLike.js';
export { type Hms_ControllerInstance } from './Controller/ControllerInterfaces.js';
export { type Hms_RouterInstance } from './Router/RouterInterfaces.js';



namespace Hermes
{
	export type Request = Hms_Request;
	export type Response = Hms_Response;
	export interface ControllerLike extends Hms_ControllerLike {};
	export type Controller = Hms_Controller;
	export type Router = Hms_Router;

	export const Request = Hms_Request;
	export const Response = Hms_Response;
	export const Controller = Hms_Controller;
	export const Router = Hms_Router;
	
	export const createRequest: typeof Hms_Request.create = Hms_Request.create;
	export const createResponse = () => new Hms_Response();
	export const createRouter: typeof Hms_Router.create = Hms_Router.create;
	export const createController: typeof Hms_Controller.create = Hms_Controller.create;
}



export default Hermes;
