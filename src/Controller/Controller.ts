import { Hms_ControllerInstance, Hms_ControllerClass } from './ControllerInterfaces.js';
import Hms_Request from '../Request/Request.js';
import Hms_Response from '../Response/Response.js';



const Hms_Controller: Hms_ControllerClass = class Hms_Controller<Hms_GenericRequest extends Hms_Request = Hms_Request, Hms_GenericResponse extends Hms_Response = Hms_Response> implements Hms_ControllerInstance<Hms_GenericRequest, Hms_GenericResponse>
{
	private _controllerFunction: (req: Hms_GenericRequest, res: Hms_GenericResponse) => unknown;
	
	
	
	constructor(controllerFunction: (req: Hms_GenericRequest, res: Hms_GenericResponse) => unknown)
	{
		this._controllerFunction = controllerFunction;
	}



	public static create<Hms_GenericRequest extends Hms_Request, Hms_GenericResponse extends Hms_Response>(controllerFunction: (req: Hms_GenericRequest, res: Hms_GenericResponse) => unknown): Hms_Controller<Hms_GenericRequest, Hms_GenericResponse>
	{
		return new Hms_Controller(controllerFunction);
	}



	public run(req: Hms_GenericRequest, res: Hms_GenericResponse): this
	{
		this._controllerFunction(req, res);
		return this;
	}
}



type Hms_Controller<Hms_GenericRequest extends Hms_Request = Hms_Request, Hms_GenericResponse extends Hms_Response = Hms_Response> = InstanceType<typeof Hms_Controller<Hms_GenericRequest, Hms_GenericResponse>>;



export default Hms_Controller;
