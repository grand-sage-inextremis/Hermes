import { vi, describe, it, expect } from 'vitest';

import Hms_Controller from './Controller.js';
import Hms_Request from '../Request/Request.js';
import Hms_Response from '../Response/Response.js';



describe("`Hms_Controller` class", function ()
{



describe("Hms_Controller.prototype.run(req, res)", function ()
{
	it("runs the function passed as parameter of `Hms_Controller.create(controllerFunction)`", function ()
	{
		const controllerFunction = function (req: Hms_Request, res: Hms_Response) { };
		
		const mockControllerFunction = vi.fn(controllerFunction);

		let controller = Hms_Controller.create(mockControllerFunction);

		let req = Hms_Request.create('http://media-inextremis.net/planets/venus');
		let res = new Hms_Response();

		controller.run(req, res);

		
		expect(mockControllerFunction.mock.calls).toHaveLength(1);
		expect(mockControllerFunction.mock.calls[0][0]).toBe(req);
		expect(mockControllerFunction.mock.calls[0][1]).toBe(res);
	});
});



});  // ends describe("`Hms_Controller` class", ... );
