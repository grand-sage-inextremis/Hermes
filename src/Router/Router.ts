import { Hms_RouterInstance, Hms_RouterClass } from "./RouterInterfaces.js";
import { Hms_ControllerLike } from "../Controller/ControllerLike.js";
import Hms_Request from "../Request/Request.js";
import Hms_Response from "../Response/Response.js";
import { isValidPathname } from "../utils/url.js";



const Hms_Router: Hms_RouterClass = class Hms_Router<Hms_GenericRequest extends Hms_Request = Hms_Request, Hms_GenericResponse extends Hms_Response = Hms_Response> implements Hms_RouterInstance<Hms_GenericRequest, Hms_GenericResponse>
{
	private _defaultRoute?: Hms_ControllerLike<Hms_GenericRequest, Hms_GenericResponse>;
	private _routes: {[pathname: string]: Hms_ControllerLike<Hms_GenericRequest, Hms_GenericResponse>};
	private _selectedTypeOfController: 'none' | 'default' | 'specific';



	constructor()
	{
		this._routes = {};
		this._selectedTypeOfController = 'none';
	}



	public static create<Hms_GenericRequest extends Hms_Request, Hms_GenericResponse extends Hms_Response>(): Hms_Router<Hms_GenericRequest, Hms_GenericResponse>
	{
		return new Hms_Router();
	}



	public get selectedTypeOfController(): 'none' | 'default' | 'specific'
	{
		return this._selectedTypeOfController;
	}



	public use(pathname: string, controller: Hms_ControllerLike<Hms_GenericRequest, Hms_GenericResponse>): this
	{
		if (isValidPathname(pathname))
		{
			this._routes[pathname] = controller;
		}

		return this;
	}



	public useDefault(controller: Hms_ControllerLike<Hms_GenericRequest, Hms_GenericResponse>): this
	{
		this._defaultRoute = controller;

		return this;
	}



	public run(req: Hms_GenericRequest, res: Hms_GenericResponse): this
	{
		let routePathnames = Object.keys(this._routes);
		let selectedRoutePathname = req.updateRelativePathname(routePathnames);


		if (selectedRoutePathname !== '')
		{
			this._routes[selectedRoutePathname].run(req, res);
			this._selectedTypeOfController = 'specific';
			return this;
		}


		if (this._defaultRoute)
		{
			this._defaultRoute.run(req, res);
			this._selectedTypeOfController = 'default';
			return this;
		}


		this._selectedTypeOfController = 'none';
		return this;
	}
}



type Hms_Router<Hms_GenericRequest extends Hms_Request = Hms_Request, Hms_GenericResponse extends Hms_Response = Hms_Response> = InstanceType<typeof Hms_Router<Hms_GenericRequest, Hms_GenericResponse>>;



export default Hms_Router;
