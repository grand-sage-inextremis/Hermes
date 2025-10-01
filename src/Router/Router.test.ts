import { vi, beforeEach, describe, it, expect } from 'vitest';

import Hms_Request from '../Request/Request.js';
import Hms_Response from '../Response/Response.js';
import { Hms_ControllerLike } from '../Controller/ControllerLike.js';
import Hms_Router from './Router.js';



function generateControllerLike(): Hms_ControllerLike
{
	return {
		run(req, res) { return this; }
	};
}



const controllerLike_default = generateControllerLike();
const controllerLike_default1 = generateControllerLike();
const controllerLike_default2 = generateControllerLike();
const controllerLike_default3 = generateControllerLike();
const controllerLike_root = generateControllerLike();
const controllerLike1 = generateControllerLike();
const controllerLike2 = generateControllerLike();
const controllerLike3 = generateControllerLike();



const mockOn_controllerLike_default = vi.spyOn(controllerLike_default, 'run');
const mockOn_controllerLike_default1 = vi.spyOn(controllerLike_default1, 'run');
const mockOn_controllerLike_default2 = vi.spyOn(controllerLike_default2, 'run');
const mockOn_controllerLike_default3 = vi.spyOn(controllerLike_default3, 'run');
const mockOn_controllerLike_root = vi.spyOn(controllerLike_root, 'run');
const mockOn_controllerLike1 = vi.spyOn(controllerLike1, 'run');
const mockOn_controllerLike2 = vi.spyOn(controllerLike2, 'run');
const mockOn_controllerLike3 = vi.spyOn(controllerLike3, 'run');



function resetMocks(): void
{
	mockOn_controllerLike_default.mockReset();
	mockOn_controllerLike_default1.mockReset();
	mockOn_controllerLike_default2.mockReset();
	mockOn_controllerLike_default3.mockReset();
	mockOn_controllerLike_root.mockReset();
	mockOn_controllerLike1.mockReset();
	mockOn_controllerLike2.mockReset();
	mockOn_controllerLike3.mockReset();
}



beforeEach(resetMocks);



describe("`Hms_Router` class", function ()
{



describe("Hms_Router.prototype.run(req, res)", function ()
{
	it("runs no controller-like if `router.use()` and `router.useDefault()` have never been called", function ()
	{
		let router: Hms_Router;
		let req: Hms_Request;
		let res: Hms_Response;

		router = Hms_Router.create();


		req = Hms_Request.create('http://media-inextremis.net/');
		res = new Hms_Response();

		router.run(req, res);

		expect(router.selectedTypeOfController).toBe('none');


		resetMocks();
		

		req = Hms_Request.create('http://media-inextremis.net/some/random/pathname');
		res = new Hms_Response();

		router.run(req, res);

		expect(router.selectedTypeOfController).toBe('none');
	});



	it("runs no controller-like if `req.relativePathname` does not match any route's pathname and\n\t if there is no default route", function ()
	{
		let router: Hms_Router;
		let req: Hms_Request;
		let res: Hms_Response;


		router = Hms_Router.create();

		router.use('/', controllerLike_root);
		router.use('/route1', controllerLike1);
		router.use('/route2', controllerLike2);
		router.use('/route3', controllerLike3);

		
		req = Hms_Request.create('http://media-inextremis.net/some/random/pathname');
		res = new Hms_Response();

		router.run(req, res);


		expect(router.selectedTypeOfController).toBe('none');

		expect(mockOn_controllerLike_root.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike1.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike2.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike3.mock.calls).toHaveLength(0);


		resetMocks();
		

		req = Hms_Request.create('http://media-inextremis.net/route');
		res = new Hms_Response();

		router.run(req, res);


		expect(router.selectedTypeOfController).toBe('none');

		expect(mockOn_controllerLike_root.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike1.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike2.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike3.mock.calls).toHaveLength(0);

		
		resetMocks();
		

		req = Hms_Request.create('http://media-inextremis.net/route/some/random/pathname');
		res = new Hms_Response();

		router.run(req, res);


		expect(router.selectedTypeOfController).toBe('none');

		expect(mockOn_controllerLike_root.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike1.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike2.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike3.mock.calls).toHaveLength(0);

		
		resetMocks();
		

		req = Hms_Request.create('http://media-inextremis.net/route20');
		res = new Hms_Response();

		router.run(req, res);


		expect(router.selectedTypeOfController).toBe('none');

		expect(mockOn_controllerLike_root.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike1.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike2.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike3.mock.calls).toHaveLength(0);

		
		resetMocks();
		

		req = Hms_Request.create('http://media-inextremis.net/route20/some/random/pathname');
		res = new Hms_Response();

		router.run(req, res);


		expect(router.selectedTypeOfController).toBe('none');

		expect(mockOn_controllerLike_root.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike1.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike2.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike3.mock.calls).toHaveLength(0);
	});



	it("runs the default controller-like if `router.use()` has never been called", function ()
	{
		let router: Hms_Router;
		let req: Hms_Request;
		let res: Hms_Response;


		router = Hms_Router.create();

		router.useDefault(controllerLike_default);


		req = Hms_Request.create('http://media-inextremis.net/');
		res = new Hms_Response();

		router.run(req, res);


		expect(router.selectedTypeOfController).toBe('default');

		expect(mockOn_controllerLike_default.mock.calls).toHaveLength(1);
		expect(mockOn_controllerLike_default.mock.calls[0][0]).toBe(req);
		expect(mockOn_controllerLike_default.mock.calls[0][1]).toBe(res);


		resetMocks();


		req = Hms_Request.create('http://media-inextremis.net/some/random/pathname');
		res = new Hms_Response();

		router.run(req, res);


		expect(router.selectedTypeOfController).toBe('default');

		expect(mockOn_controllerLike_default.mock.calls).toHaveLength(1);
		expect(mockOn_controllerLike_default.mock.calls[0][0]).toBe(req);
		expect(mockOn_controllerLike_default.mock.calls[0][1]).toBe(res);
	});



	it("runs the default controller-like if `req.relativePathname` does not match any route's pathname", function ()
	{
		let router: Hms_Router;
		let req: Hms_Request;
		let res: Hms_Response;
		

		router = Hms_Router.create();
		
		router.use('/', controllerLike_root);
		router.use('/route1', controllerLike1);
		router.use('/route2', controllerLike2);
		router.use('/route3', controllerLike3);
		router.useDefault(controllerLike_default);


		req = Hms_Request.create('http://media-inextremis.net/some/random/pathname');
		res = new Hms_Response();

		router.run(req, res);


		expect(router.selectedTypeOfController).toBe('default');

		expect(mockOn_controllerLike_default.mock.calls).toHaveLength(1);
		expect(mockOn_controllerLike_default.mock.calls[0][0]).toBe(req);
		expect(mockOn_controllerLike_default.mock.calls[0][1]).toBe(res);

		expect(mockOn_controllerLike_root.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike1.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike2.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike3.mock.calls).toHaveLength(0);


		resetMocks();


		req = Hms_Request.create('http://media-inextremis.net/route');
		res = new Hms_Response();

		router.run(req, res);


		expect(router.selectedTypeOfController).toBe('default');

		expect(mockOn_controllerLike_default.mock.calls).toHaveLength(1);
		expect(mockOn_controllerLike_default.mock.calls[0][0]).toBe(req);
		expect(mockOn_controllerLike_default.mock.calls[0][1]).toBe(res);

		expect(mockOn_controllerLike_root.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike1.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike2.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike3.mock.calls).toHaveLength(0);

		
		resetMocks();


		req = Hms_Request.create('http://media-inextremis.net/route/some/random/pathname');
		res = new Hms_Response();

		router.run(req, res);


		expect(router.selectedTypeOfController).toBe('default');

		expect(mockOn_controllerLike_default.mock.calls).toHaveLength(1);
		expect(mockOn_controllerLike_default.mock.calls[0][0]).toBe(req);
		expect(mockOn_controllerLike_default.mock.calls[0][1]).toBe(res);

		expect(mockOn_controllerLike_root.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike1.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike2.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike3.mock.calls).toHaveLength(0);

		
		resetMocks();
		

		req = Hms_Request.create('http://media-inextremis.net/route20');
		res = new Hms_Response();
		
		router.run(req, res);


		expect(router.selectedTypeOfController).toBe('default');

		expect(mockOn_controllerLike_default.mock.calls).toHaveLength(1);
		expect(mockOn_controllerLike_default.mock.calls[0][0]).toBe(req);
		expect(mockOn_controllerLike_default.mock.calls[0][1]).toBe(res);

		expect(mockOn_controllerLike_root.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike1.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike2.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike3.mock.calls).toHaveLength(0);

		
		resetMocks();
		

		req = Hms_Request.create('http://media-inextremis.net/route20/some/random/pathname');
		res = new Hms_Response();
		
		router.run(req, res);


		expect(router.selectedTypeOfController).toBe('default');

		expect(mockOn_controllerLike_default.mock.calls).toHaveLength(1);
		expect(mockOn_controllerLike_default.mock.calls[0][0]).toBe(req);
		expect(mockOn_controllerLike_default.mock.calls[0][1]).toBe(res);

		expect(mockOn_controllerLike_root.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike1.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike2.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike3.mock.calls).toHaveLength(0);
	});



	it("runs the controller-like mounted on the pathname that `req.relativePathname` matches", function ()
	{
		let router: Hms_Router;
		let req: Hms_Request;
		let res: Hms_Response;

		let req_updated: Hms_Request;
		let pathnameBase: string;

		
		router = Hms_Router.create();
		
		router.use('/', controllerLike_root);
		router.use('/route1', controllerLike1);
		router.use('/route2', controllerLike2);
		router.use('/route3', controllerLike3);
		router.useDefault(controllerLike_default);


		req = Hms_Request.create('http://media-inextremis.net/');
		res = new Hms_Response();
		
		router.run(req, res);
		

		expect(router.selectedTypeOfController).toBe('specific');

		expect(mockOn_controllerLike_root.mock.calls).toHaveLength(1);
		expect(mockOn_controllerLike_root.mock.calls[0][0]).toBe(req);
		expect(mockOn_controllerLike_root.mock.calls[0][1]).toBe(res);

		expect(mockOn_controllerLike1.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike2.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike3.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike_default.mock.calls).toHaveLength(0);


		resetMocks();


		req = Hms_Request.create('http://media-inextremis.net/route2');
		res = new Hms_Response();
		
		router.run(req, res);
		
		
		req_updated = Hms_Request.create('http://media-inextremis.net/route2');
		
		pathnameBase = req_updated.updateRelativePathname(['/route2']);
		expect(pathnameBase).toBe('/route2');
		

		expect(router.selectedTypeOfController).toBe('specific');

		expect(mockOn_controllerLike2.mock.calls).toHaveLength(1);
		expect(mockOn_controllerLike2.mock.calls[0][0]).toStrictEqual(req_updated);
		expect(mockOn_controllerLike2.mock.calls[0][1]).toBe(res);

		expect(mockOn_controllerLike_root.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike1.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike3.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike_default.mock.calls).toHaveLength(0);


		resetMocks();


		req = Hms_Request.create('http://media-inextremis.net/route2/some/random/pathname');
		res = new Hms_Response();
		
		router.run(req, res);
		
		
		req_updated = Hms_Request.create('http://media-inextremis.net/route2/some/random/pathname');
		
		pathnameBase = req_updated.updateRelativePathname(['/route2']);
		expect(pathnameBase).toBe('/route2');
		

		expect(router.selectedTypeOfController).toBe('specific');

		expect(mockOn_controllerLike2.mock.calls).toHaveLength(1);
		expect(mockOn_controllerLike2.mock.calls[0][0]).toStrictEqual(req_updated);
		expect(mockOn_controllerLike2.mock.calls[0][1]).toBe(res);

		expect(mockOn_controllerLike_root.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike1.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike3.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike_default.mock.calls).toHaveLength(0);
	});



	it("runs the last controller-like among multiple ones mounted on the default route", function ()
	{
		let router: Hms_Router;
		let req: Hms_Request;
		let res: Hms_Response;


		router = Hms_Router.create();

		router.use('/', controllerLike_root);
		router.use('/route1', controllerLike1);
		router.use('/route2', controllerLike2);
		router.use('/route3', controllerLike3);
		router.useDefault(controllerLike_default1);
		router.useDefault(controllerLike_default2);
		router.useDefault(controllerLike_default3);
		

		req = Hms_Request.create('http://media-inextremis.net/some/random/pathname');
		res = new Hms_Response();

		router.run(req, res);
		

		expect(router.selectedTypeOfController).toBe('default');

		expect(mockOn_controllerLike_default3.mock.calls).toHaveLength(1);
		expect(mockOn_controllerLike_default3.mock.calls[0][0]).toBe(req);
		expect(mockOn_controllerLike_default3.mock.calls[0][1]).toBe(res);

		expect(mockOn_controllerLike_root.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike1.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike2.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike3.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike_default1.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike_default2.mock.calls).toHaveLength(0);
	});



	it("runs the last controller-like among multiple ones mounted on the same pathname", function ()
	{
		let router: Hms_Router;
		let req: Hms_Request;
		let res: Hms_Response;

		let req_updated: Hms_Request;
		let pathnameBase: string;


		router = Hms_Router.create();

		router.use('/', controllerLike_root);
		router.use('/', controllerLike1);
		router.use('/', controllerLike2);
		router.use('/', controllerLike3);
		router.useDefault(controllerLike_default);
		

		req = Hms_Request.create('http://media-inextremis.net/');
		res = new Hms_Response();

		router.run(req, res);
		

		expect(router.selectedTypeOfController).toBe('specific');

		expect(mockOn_controllerLike3.mock.calls).toHaveLength(1);
		expect(mockOn_controllerLike3.mock.calls[0][0]).toBe(req);
		expect(mockOn_controllerLike3.mock.calls[0][1]).toBe(res);

		expect(mockOn_controllerLike_root.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike1.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike2.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike_default.mock.calls).toHaveLength(0);


		resetMocks();


		router = Hms_Router.create();

		router.use('/', controllerLike_root);
		router.use('/route3', controllerLike1);
		router.use('/route3', controllerLike2);
		router.use('/route3', controllerLike3);
		router.useDefault(controllerLike_default);
		

		req = Hms_Request.create('http://media-inextremis.net/route3');
		res = new Hms_Response();

		router.run(req, res);


		req_updated = Hms_Request.create('http://media-inextremis.net/route3');

		pathnameBase = req_updated.updateRelativePathname(['/route3']);
		expect(pathnameBase).toBe('/route3');
		

		expect(router.selectedTypeOfController).toBe('specific');

		expect(mockOn_controllerLike3.mock.calls).toHaveLength(1);
		expect(mockOn_controllerLike3.mock.calls[0][0]).toStrictEqual(req_updated);
		expect(mockOn_controllerLike3.mock.calls[0][1]).toBe(res);

		expect(mockOn_controllerLike_root.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike1.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike2.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike_default.mock.calls).toHaveLength(0);


		resetMocks();


		req = Hms_Request.create('http://media-inextremis.net/route3/some/random/pathname');
		res = new Hms_Response();

		router.run(req, res);


		req_updated = Hms_Request.create('http://media-inextremis.net/route3/some/random/pathname');

		pathnameBase = req_updated.updateRelativePathname(['/route3']);
		expect(pathnameBase).toBe('/route3');
		

		expect(router.selectedTypeOfController).toBe('specific');

		expect(mockOn_controllerLike3.mock.calls).toHaveLength(1);
		expect(mockOn_controllerLike3.mock.calls[0][0]).toStrictEqual(req_updated);
		expect(mockOn_controllerLike3.mock.calls[0][1]).toBe(res);

		expect(mockOn_controllerLike_root.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike1.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike2.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike_default.mock.calls).toHaveLength(0);
	});



	it("runs the controller-like mounted on the most specific pathname if there is a pathname conflict", function ()
	{
		let router: Hms_Router;
		let req: Hms_Request;
		let res: Hms_Response;

		let req_updated: Hms_Request;
		let pathnameBase: string;


		router = Hms_Router.create();
		
		router.use('/', controllerLike_root);
		router.use('/route1', controllerLike1);
		router.use('/route1/route2', controllerLike2);
		router.use('/route1/route2/route3', controllerLike3);
		router.useDefault(controllerLike_default);
		
		
		// RUNS controllerLike_root

		req = Hms_Request.create('http://media-inextremis.net/');
		res = new Hms_Response();

		router.run(req, res);


		expect(router.selectedTypeOfController).toBe('specific');

		expect(mockOn_controllerLike_root.mock.calls).toHaveLength(1);
		expect(mockOn_controllerLike_root.mock.calls[0][0]).toBe(req);
		expect(mockOn_controllerLike_root.mock.calls[0][1]).toBe(res);

		expect(mockOn_controllerLike1.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike2.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike3.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike_default.mock.calls).toHaveLength(0);
		

		resetMocks();

		
		// RUNS controllerLike1

		req = Hms_Request.create('http://media-inextremis.net/route1');
		res = new Hms_Response();

		router.run(req, res);


		req_updated = Hms_Request.create('http://media-inextremis.net/route1');
		
		pathnameBase = req_updated.updateRelativePathname(['/route1']);
		expect(pathnameBase).toBe('/route1');


		expect(router.selectedTypeOfController).toBe('specific');

		expect(mockOn_controllerLike1.mock.calls).toHaveLength(1);
		expect(mockOn_controllerLike1.mock.calls[0][0]).toStrictEqual(req_updated);
		expect(mockOn_controllerLike1.mock.calls[0][1]).toBe(res);

		expect(mockOn_controllerLike_root.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike2.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike3.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike_default.mock.calls).toHaveLength(0);
		

		resetMocks();


		req = Hms_Request.create('http://media-inextremis.net/route1/some/random/pathname');
		res = new Hms_Response();

		router.run(req, res);


		req_updated = Hms_Request.create('http://media-inextremis.net/route1/some/random/pathname');
		
		pathnameBase = req_updated.updateRelativePathname(['/route1']);
		expect(pathnameBase).toBe('/route1');


		expect(router.selectedTypeOfController).toBe('specific');

		expect(mockOn_controllerLike1.mock.calls).toHaveLength(1);
		expect(mockOn_controllerLike1.mock.calls[0][0]).toStrictEqual(req_updated);
		expect(mockOn_controllerLike1.mock.calls[0][1]).toBe(res);

		expect(mockOn_controllerLike_root.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike2.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike3.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike_default.mock.calls).toHaveLength(0);
		

		resetMocks();
		
		
		// RUNS controllerLike2

		req = Hms_Request.create('http://media-inextremis.net/route1/route2');
		res = new Hms_Response();

		router.run(req, res);


		req_updated = Hms_Request.create('http://media-inextremis.net/route1/route2');

		pathnameBase = req_updated.updateRelativePathname(['/route1/route2']);
		expect(pathnameBase).toBe('/route1/route2');


		expect(router.selectedTypeOfController).toBe('specific');

		expect(mockOn_controllerLike2.mock.calls).toHaveLength(1);
		expect(mockOn_controllerLike2.mock.calls[0][0]).toStrictEqual(req_updated);
		expect(mockOn_controllerLike2.mock.calls[0][1]).toBe(res);

		expect(mockOn_controllerLike_root.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike1.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike3.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike_default.mock.calls).toHaveLength(0);
		

		resetMocks();


		req = Hms_Request.create('http://media-inextremis.net/route1/route2/some/random/pathname');
		res = new Hms_Response();

		router.run(req, res);


		req_updated = Hms_Request.create('http://media-inextremis.net/route1/route2/some/random/pathname');

		pathnameBase = req_updated.updateRelativePathname(['/route1/route2']);
		expect(pathnameBase).toBe('/route1/route2');


		expect(router.selectedTypeOfController).toBe('specific');

		expect(mockOn_controllerLike2.mock.calls).toHaveLength(1);
		expect(mockOn_controllerLike2.mock.calls[0][0]).toStrictEqual(req_updated);
		expect(mockOn_controllerLike2.mock.calls[0][1]).toBe(res);

		expect(mockOn_controllerLike_root.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike1.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike3.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike_default.mock.calls).toHaveLength(0);
		

		resetMocks();

		
		// RUNS controllerLike3

		req = Hms_Request.create('http://media-inextremis.net/route1/route2/route3');
		res = new Hms_Response();

		router.run(req, res);


		req_updated = Hms_Request.create('http://media-inextremis.net/route1/route2/route3');
		
		pathnameBase = req_updated.updateRelativePathname(['/route1/route2/route3']);
		expect(pathnameBase).toBe('/route1/route2/route3');


		expect(router.selectedTypeOfController).toBe('specific');

		expect(mockOn_controllerLike3.mock.calls).toHaveLength(1);
		expect(mockOn_controllerLike3.mock.calls[0][0]).toStrictEqual(req_updated);
		expect(mockOn_controllerLike3.mock.calls[0][1]).toBe(res);

		expect(mockOn_controllerLike_root.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike1.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike2.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike_default.mock.calls).toHaveLength(0);

		
		resetMocks();


		req = Hms_Request.create('http://media-inextremis.net/route1/route2/route3/some/random/pathname');
		res = new Hms_Response();

		router.run(req, res);


		req_updated = Hms_Request.create('http://media-inextremis.net/route1/route2/route3/some/random/pathname');
		
		pathnameBase = req_updated.updateRelativePathname(['/route1/route2/route3']);
		expect(pathnameBase).toBe('/route1/route2/route3');


		expect(router.selectedTypeOfController).toBe('specific');

		expect(mockOn_controllerLike3.mock.calls).toHaveLength(1);
		expect(mockOn_controllerLike3.mock.calls[0][0]).toStrictEqual(req_updated);
		expect(mockOn_controllerLike3.mock.calls[0][1]).toBe(res);

		expect(mockOn_controllerLike_root.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike1.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike2.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike_default.mock.calls).toHaveLength(0);
	});



	it("doesn't run a controller-like mounted on an invalid pathname", function ()
	{
		let router: Hms_Router;
		let req: Hms_Request;
		let res: Hms_Response;


		router = Hms_Router.create();
		
		router.use('/', controllerLike_root);
		router.use('route1', controllerLike1);
		router.useDefault(controllerLike_default);


		req = Hms_Request.create('http://media-inextremis.net/route1');
		res = new Hms_Response();

		router.run(req, res);


		expect(router.selectedTypeOfController).toBe('default');

		expect(mockOn_controllerLike_default.mock.calls).toHaveLength(1);
		expect(mockOn_controllerLike_default.mock.calls[0][0]).toBe(req);
		expect(mockOn_controllerLike_default.mock.calls[0][1]).toBe(res);

		expect(mockOn_controllerLike_root.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike1.mock.calls).toHaveLength(0);

		
		resetMocks();


		req = Hms_Request.create('http://media-inextremis.net/route1/some/random/pathname');
		res = new Hms_Response();

		router.run(req, res);


		expect(router.selectedTypeOfController).toBe('default');

		expect(mockOn_controllerLike_default.mock.calls).toHaveLength(1);
		expect(mockOn_controllerLike_default.mock.calls[0][0]).toBe(req);
		expect(mockOn_controllerLike_default.mock.calls[0][1]).toBe(res);

		expect(mockOn_controllerLike_root.mock.calls).toHaveLength(0);
		expect(mockOn_controllerLike1.mock.calls).toHaveLength(0);
	});
});



});  // ends describe("`Hms_Router` class", ... );
