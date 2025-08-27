import Hms_Request from '../Request/Request';
import Hms_Response from '../Response/Response';



export interface Hms_ControllerLike
{
	/**
	 * Runs the controller-like object.
	 * 
	 * @param req The request that is handled by the controller-like object.
	 * @param res The response of the controller-like object.
	 */
	run(req: Hms_Request, res: Hms_Response): this;
}
