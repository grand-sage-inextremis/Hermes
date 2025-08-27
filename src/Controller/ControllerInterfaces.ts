import { Hms_ControllerLike } from './ControllerLike';
import Hms_Request from '../Request/Request';
import Hms_Response from '../Response/Response';



export interface Hms_ControllerClass
{
	/**
	 * Creates a controller.
	 * 
	 * @param controllerFunction The function to be run when the controller is run.
	 * 
	 * @returns The new controller.
	 */
	create(controllerFunction: (req: Hms_Request, res: Hms_Response) => unknown): Hms_ControllerInstance;

	new (controllerFunction: (req: Hms_Request, res: Hms_Response) => unknown): Hms_ControllerInstance;
}



export interface Hms_ControllerInstance extends Hms_ControllerLike
{
	/**
	 * Runs the controller.
	 * 
	 * @param req The request that is handled by the controller.
	 * @param res The response of the controller.
	 */
	run(req: Hms_Request, res: Hms_Response): this;
}
