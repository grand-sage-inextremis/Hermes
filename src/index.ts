import Hms_Request from './Request/Request';
import Hms_Response from './Response/Response';
import { Hms_ControllerLike } from './Controller/ControllerLike';
import Hms_Controller from './Controller/Controller';
import Hms_Router from './Router/Router';



namespace Hermes
{
	export type Request = Hms_Request;
	export const Request = Hms_Request;
	export const createRequest: typeof Hms_Request.create = Hms_Request.create;
	
	export type Response = Hms_Response;
	export const Response = Hms_Response;
	export const createResponse = () => new Hms_Response();
	
	export interface ControllerLike extends Hms_ControllerLike {};
	
	export type Controller = Hms_Controller;
	export const Controller = Hms_Controller;
	export const createController: typeof Hms_Controller.create = Hms_Controller.create;
	
	export type Router = Hms_Router;
	export const Router = Hms_Router;
	export const createRouter: typeof Hms_Router.create = Hms_Router.create;

}



export {
	Hermes as default,
	Hms_Request,
	Hms_Response,
	Hms_ControllerLike,
	Hms_Controller,
	Hms_Router
};
