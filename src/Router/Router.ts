import { Hms_RouterInstance, Hms_RouterClass } from "./RouterInterfaces.js";
import { Hms_ControllerLike } from "../Controller/ControllerLike.js";
import Hms_Request from "../Request/Request.js";
import Hms_Response from "../Response/Response.js";
import { isValidPathname } from "../utils/url.js";



const Hms_Router: Hms_RouterClass = class Hms_Router implements Hms_RouterInstance
{
	private _defaultRoute?: Hms_ControllerLike;
	private _routes: {[pathname: string]: Hms_ControllerLike};
	private _selectedTypeOfController: 'none' | 'default' | 'specific';



	constructor()
	{
		this._routes = {};
		this._selectedTypeOfController = 'none';
	}



	public static create(): Hms_Router
	{
		return new Hms_Router();
	}



	public get selectedTypeOfController(): 'none' | 'default' | 'specific'
	{
		return this._selectedTypeOfController;
	}



	public use(pathname: string, controller: Hms_ControllerLike): this
	{
		if (isValidPathname(pathname))
		{
			this._routes[pathname] = controller;
		}

		return this;
	}



	public useDefault(controller: Hms_ControllerLike): this
	{
		this._defaultRoute = controller;

		return this;
	}



	public run(req: Hms_Request, res: Hms_Response): this
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



type Hms_Router = InstanceType<typeof Hms_Router>;



export default Hms_Router;
