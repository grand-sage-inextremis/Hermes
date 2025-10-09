import Hms_Request from '../Request/Request.js';
import Hms_Response from '../Response/Response.js';



export interface Hms_ControllerLike<Hms_GenericRequest extends Hms_Request = Hms_Request, Hms_GenericResponse extends Hms_Response = Hms_Response>
{
	/**
	 * Runs the controller-like object.
	 * 
	 * @param req The request that is handled by the controller-like object.
	 * @param res The response of the controller-like object.
	 */
	run(req: Hms_GenericRequest, res: Hms_GenericResponse): this;
}
