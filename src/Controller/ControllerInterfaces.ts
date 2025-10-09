import { Hms_ControllerLike } from './ControllerLike.js';
import Hms_Request from '../Request/Request.js';
import Hms_Response from '../Response/Response.js';



export interface Hms_ControllerClass
{
	/**
	 * Creates a controller.
	 * 
	 * @param controllerFunction The function to be run when the controller is run.
	 * 
	 * @returns The new controller.
	 */
	create<Hms_GenericRequest extends Hms_Request, Hms_GenericResponse extends Hms_Response>(controllerFunction: (req: Hms_GenericRequest, res: Hms_GenericResponse) => unknown): Hms_ControllerInstance<Hms_GenericRequest, Hms_GenericResponse>;

	new <Hms_GenericRequest extends Hms_Request, Hms_GenericResponse extends Hms_Response>(controllerFunction: (req: Hms_GenericRequest, res: Hms_GenericResponse) => unknown): Hms_ControllerInstance<Hms_GenericRequest, Hms_GenericResponse>;
}



export interface Hms_ControllerInstance<Hms_GenericRequest extends Hms_Request = Hms_Request, Hms_GenericResponse extends Hms_Response = Hms_Response> extends Hms_ControllerLike<Hms_GenericRequest, Hms_GenericResponse>
{
	/**
	 * Runs the controller.
	 * 
	 * @param req The request that is handled by the controller.
	 * @param res The response of the controller.
	 */
	run(req: Hms_GenericRequest, res: Hms_GenericResponse): this;
}
