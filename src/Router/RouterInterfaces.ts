import { Hms_ControllerLike } from '../Controller/ControllerLike.js';
import Hms_Request from '../Request/Request.js';
import Hms_Response from '../Response/Response.js';



export interface Hms_RouterClass
{
	/** Creates a router. */
	create(): Hms_RouterInstance;

	new (): Hms_RouterInstance;
}



export interface Hms_RouterInstance extends Hms_ControllerLike
{
	/**
	 * Indicates what type of controller-like was run during the last run of the router.
	 * 
	 * - It is 'specific' if a controller-like mounted on a specific pathname was run.
	 * - It is 'default' if the default controller-like was run.
	 * - It is 'none' if no controller-like was run, or if the router has never been run.
	 */
	readonly selectedTypeOfController: 'none' | 'default' | 'specific';

	/**
	 * Runs the router and runs the correct controller-like.
	 * 
	 * @param req The request that is handled by the router.
	 * @param res The response of the router.
	 * 
	 * @remarks
	 * 
	 * When this method is called, it compares `req.relativePathname` with the pathnames of every routes.
	 * 
	 * There are 3 possible cases. Look at this example:
	 * 
	 * ```
	 * 	import {
	 * 		controllerLike_root,
	 * 		controllerLike1,
	 * 		controllerLike2,
	 * 		controllerLike3,
	 * 		controllerLike_default,
	 * 	} from './controllers';
	 * 
	 * 	let router = Hms_Router.create();
	 * 
	 * 	router.use('/', controllerLike_root);
	 * 	router.use('/route1', controllerLike1);
	 * 	router.use('/route2', controllerLike2);
	 * 	router.use('/route3', controllerLike3);
	 * 	router.useDefault(controllerLike_default);
	 * ```
	 * 
	 * - **Case 1**: If a route's pathname matches the beginning of `req.relativePathname`, then the controller-like mounted on this route is run.
	 * 
	 * ```
	 * 	let req = Hms_Request.create('http://media-inextremis.net/route2/some/random/pathname');
	 * 	let res = new Hms_Response();
	 * 
	 * 	router.run(req, res);
	 * 
	 * 	// '/route2' matches the beginning of '/route2/some/random/pathname'.
	 * 	// So controllerLike2 is run.
	 * ```
	 * 
	 * - **Case 2**: If no route's pathname matches the beginning of `req.relativePathname` and if there is a default controller-like,
	 * then the default controller-like is run.
	 * 
	 * ```
	 * 	let req = Hms_Request.create('http://media-inextremis.net/route66/some/random/pathname');
	 * 	let res = new Hms_Response();
	 * 
	 * 	router.run(req, res);
	 * 
	 * 	// No pathname matches the beginning of '/route66/some/random/pathname'.
	 * 	// So controllerLike_default is run.
	 * ```
	 * 
	 * - **Case 3**: If no route's pathname matches the beginning of `req.relativePathname` and if there is no default controller-like,
	 * then no controller-like is run.
	 * 
	 * ```
	 * 	// Let's assume that router.useDefault() has never been called.
	 * 
	 * 	let req = Hms_Request.create('http://media-inextremis.net/route66/some/random/pathname');
	 * 	let res = new Hms_Response();
	 * 
	 * 	router.run(req, res);
	 * 
	 * 	// No pathname matches the beginning of '/route66/some/random/pathname'.
	 * 	// So no controller-like is run.
	 * ```
	 */
	run(req: Hms_Request, res: Hms_Response): this;

	/**
	 * Adds a route to the router.
	 * @param pathname The pathname of the route.
	 * @param controllerLike The controller-like to be used on the route.
	 * 
	 * @remark If `pathname` is not a valid pathname, this method does not add the route.
	 * 
	 * @remark If a controller-like is mounted on '/', then it will be run only if `req.relativePathname` is '/'.
	 * 
	 * @remark
	 * 
	 * If multiple controllers-like are mounted on the same pathname,
	 * then only the last one is saved in the router and can be run by the router, the other ones are just ignored.
	 * 
	 * ```
	 * 	let router = Hms_Router.create();
	 * 
	 * 	router.use('/', controllerLike_root);
	 * 	router.use('/route', controllerLike1);
	 * 	router.use('/route', controllerLike2);
	 * 	router.use('/route', controllerLike3);
	 * 	router.useDefault(controllerLike_default);
	 * 
	 * 	let req = Hms_Request.create('http://media-inextremis.net/route/some/random/pathname');
	 * 	let res = new Hms_Response();
	 * 
	 * 	router.run(req, res);
	 * 
	 * 	// controllerLike3 is the last controller-like mounted on '/route'.
	 * 	// So controllerLike3 is run.
	 * ```
	 * 
	 * @remark
	 * 
	 * If the pathnames of multiple routes match the beginning of `req.relativePathname`,
	 * then the controller-like mounted on the most specific pathname will be run by the router.
	 * 
	 * ```
	 * 	let router = Hms_Router.create();
	 * 
	 * 	router.use('/', controllerLike_root);
	 * 	router.use('/route1', controllerLike1);
	 * 	router.use('/route1/route2', controllerLike2);
	 * 	router.use('/route1/route2/route3', controllerLike3);
	 * 	router.useDefault(controllerLike_default);
	 * 
	 * 	let req = Hms_Request.create('http://media-inextremis.net/route1/route2/route3/some/random/pathname');
	 * 	let res = new Hms_Response();
	 * 
	 * 	router.run(req, res);
	 * 
	 * 	// '/route1/route2/route3' is the most specific pathname.
	 * 	// So controllerLike3 is run.
	 * ```
	 */
	use(pathname: string, controllerLike: Hms_ControllerLike): this;

	/**
	 * Adds a default route to the router.
	 * 
	 * @param controllerLike The controller-like to be used on the default route.
	 * 
	 * @remark
	 * 
	 * If multiple controllers-like are mounted on the default route,
	 * then only the last one is saved in the router and can be run by the router, the other ones are just ignored.
	 * 
	 * ```
	 * 	let router = Hms_Router.create();
	 * 
	 * 	router.use('/', controllerLike_root);
	 * 	router.useDefault(controllerLike1);
	 * 	router.useDefault(controllerLike2);
	 * 	router.useDefault(controllerLike3);
	 * 
	 * 	let req = Hms_Request.create('http://media-inextremis.net/some/random/pathname');
	 * 	let res = new Hms_Response();
	 * 
	 * 	router.run(req, res);
	 * 
	 * 	// controllerLike3 is the last controller-like mounted on the default route.
	 * 	// So controllerLike3 is run.
	 * ```
	 */
	useDefault(controllerLike: Hms_ControllerLike): this;
}
