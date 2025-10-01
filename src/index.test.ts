import { describe, it, expect } from 'vitest';

import {
	default as Hermes,
	Hms_Request as public_Hms_Request,
	Hms_Response as public_Hms_Response,
	Hms_ControllerLike as public_Hms_ControllerLike,
	Hms_Controller as public_Hms_Controller,
	Hms_Router as public_Hms_Router
} from './index.js';

import Hms_Request from './Request/Request.js';
import Hms_Response from './Response/Response.js';
import { Hms_ControllerLike } from './Controller/ControllerLike.js';
import Hms_Controller from './Controller/Controller.js';
import Hms_Router from './Router/Router.js';



describe("`./src/index.ts` file", function ()
{



it("exports the `Hms_Request` class directly", function ()
{
	expect(public_Hms_Request).toBe(Hms_Request);
});



it("exports the `Hms_Response` class directly", function ()
{
	expect(public_Hms_Response).toBe(Hms_Response);
});



it("exports the `Hms_ControllerLike` interface directly", function ()
{
	let controllerLike1: public_Hms_ControllerLike = {
		run: (req, res) => controllerLike1
	};


	let controllerLike2: Hms_ControllerLike = {
		run: (req, res) => controllerLike2
	};


	[controllerLike1, controllerLike2] = [controllerLike2, controllerLike1];
});



it("exports the `Hms_Controller` class directly", function ()
{
	expect(public_Hms_Controller).toBe(Hms_Controller);
});



it("exports the `Hms_Router` class directly", function ()
{
	expect(public_Hms_Router).toBe(Hms_Router);
});



it("exports the `Hms_Request`, `Hms_Response`, `Hms_Controller`, and `Hms_Router` classes and the `Hms_ControllerLike` interface through the `Hermes` namespace", function ()
{
	let controllerLike1: Hermes.ControllerLike = {
		run: (req, res) => controllerLike1
	};


	let controllerLike2: Hms_ControllerLike = {
		run: (req, res) => controllerLike2
	};


	[controllerLike1, controllerLike2] = [controllerLike2, controllerLike1];



	expect(Hermes.Request).toBe(Hms_Request);
	expect(Hermes.Response).toBe(Hms_Response);
	expect(Hermes.Controller).toBe(Hms_Controller);
	expect(Hermes.Router).toBe(Hms_Router);
});



it("exports functions to instanciate the `Hms_Request`, `Hms_Response`, `Hms_Controller`, and `Hms_Router` classes through the `Hermes` namespace", function ()
{
	const request = Hermes.createRequest('http://media-inextremis/');
	const response = Hermes.createResponse();
	const controller = Hermes.createController((req, res) => null);
	const router = Hermes.createRouter();

	expect(request).toBeInstanceOf(Hms_Request);
	expect(response).toBeInstanceOf(Hms_Response);
	expect(controller).toBeInstanceOf(Hms_Controller);
	expect(router).toBeInstanceOf(Hms_Router);
});



});
