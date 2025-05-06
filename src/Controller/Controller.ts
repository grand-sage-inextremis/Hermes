import { Hms_ControllerInstance, Hms_ControllerClass } from './ControllerInterfaces';
import Hms_Request from '../Request/Request';
import Hms_Response from '../Response/Response';



const Hms_Controller: Hms_ControllerClass = class Hms_Controller implements Hms_ControllerInstance
{
	constructor(controllerFunction: (req: Hms_Request, res: Hms_Response) => unknown) { }



	public static create(controllerFunction: (req: Hms_Request, res: Hms_Response) => unknown): Hms_Controller
	{
		return new Hms_Controller(controllerFunction);
	}



	public run(req: Hms_Request, res: Hms_Response): this
	{
		return this;
	}
}



type Hms_Controller = InstanceType<typeof Hms_Controller>;



export default Hms_Controller;
