import { Hms_RouterInstance, Hms_RouterClass } from "./RouterInterfaces";
import { Hms_ControllerLike } from "../Controller/ControllerLike";
import Hms_Request from "../Request/Request";
import Hms_Response from "../Response/Response";



const Hms_Router: Hms_RouterClass = class Hms_Router implements Hms_RouterInstance
{
	public readonly selectedTypeOfController: 'none' | 'default' | 'specific';



	constructor()
	{
		this.selectedTypeOfController = 'none';
	}



	public static create(): Hms_Router
	{
		return new Hms_Router();
	}



	public use(pathname: string, controller: Hms_ControllerLike): this
	{
		return this;
	}



	public useDefault(controller: Hms_ControllerLike): this
	{
		return this;
	}



	public run(req: Hms_Request, res: Hms_Response): this
	{
		return this;
	}
}



type Hms_Router = InstanceType<typeof Hms_Router>;



export default Hms_Router;
