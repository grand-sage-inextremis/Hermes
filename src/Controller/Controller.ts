import { Hms_ControllerInstance, Hms_ControllerClass } from './ControllerInterfaces.js';
import Hms_Request from '../Request/Request.js';
import Hms_Response from '../Response/Response.js';



const Hms_Controller: Hms_ControllerClass = class Hms_Controller implements Hms_ControllerInstance
{
	private _controllerFunction: (req: Hms_Request, res: Hms_Response) => unknown;
	
	
	
	constructor(controllerFunction: (req: Hms_Request, res: Hms_Response) => unknown)
	{
		this._controllerFunction = controllerFunction;
	}



	public static create(controllerFunction: (req: Hms_Request, res: Hms_Response) => unknown): Hms_Controller
	{
		return new Hms_Controller(controllerFunction);
	}



	public run(req: Hms_Request, res: Hms_Response): this
	{
		this._controllerFunction(req, res);
		return this;
	}
}



type Hms_Controller = InstanceType<typeof Hms_Controller>;



export default Hms_Controller;
