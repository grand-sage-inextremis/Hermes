import Hms_Request from './Request/Request';
import Hms_Response from './Response/Response';
import { type Hms_ControllerLike } from './Controller/ControllerLike';
import Hms_Controller from './Controller/Controller';
import Hms_Router from './Router/Router';



export { default as Hms_Request } from './Request/Request';
export { default as Hms_Response } from './Response/Response';
export { default as Hms_Controller } from './Controller/Controller';
export { default as Hms_Router } from './Router/Router';



export { type Hms_RequestInstance } from './Request/RequestInterfaces';
export { type Hms_ControllerLike } from './Controller/ControllerLike';
export { type Hms_ControllerInstance } from './Controller/ControllerInterfaces';
export { type Hms_RouterInstance } from './Router/RouterInterfaces';



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
