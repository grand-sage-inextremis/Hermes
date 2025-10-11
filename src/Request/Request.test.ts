import { describe, it, expect } from 'vitest';

import Hms_Request from './Request.js';



/**
 * Checks that the properties of a request have the expected values.
 * @param givenRequest The request to be tested.
 * @param expectedRequest An object whose properties have the expected values.
 */
function testRequest(requestTest : {expect: Hms_Request | null, toBe: Omit<Hms_Request, 'updateRelativePathname'>}): void
{
	const givenRequest = requestTest.expect;
	const expectedRequest = requestTest.toBe;

	expect(givenRequest).not.toBe(null);

	expect((givenRequest as Hms_Request).pathname).toBe(expectedRequest.pathname);
	expect((givenRequest as Hms_Request).pathnameBase).toBe(expectedRequest.pathnameBase);
	expect((givenRequest as Hms_Request).relativePathname).toBe(expectedRequest.relativePathname);
}



/**
 * Checks that the properties of somes requests have the expected values.
 * 
 * Use this function if the properties of all the requests should have the same values.
 * 
 * @param givenRiquests The requests to be tested.
 * @param expectedRequest An object whose properties have the expected values.
 */
function testRequests(requestsTest: {expect: Array<Hms_Request | null>, toBe: Omit<Hms_Request, 'updateRelativePathname'>}): void
{
	const givenRequests = requestsTest.expect;
	const expectedRequest = requestsTest.toBe;

	for (const givenRequest of givenRequests)
	{
		testRequest({
			expect: givenRequest,
			toBe: expectedRequest
		});
	}
}



describe("`Hms_Request` class", function ()
{



describe("Hms_Request.create(pathname: string)", function ()
{
	it("returns `null` if `pathname` is an invalid pathname", function ()
	{
		let givenRequest: Hms_Request | null;
		
		givenRequest = Hms_Request.create('');
		expect(givenRequest).toBe(null);

		givenRequest = Hms_Request.create('projects/hermes');
		expect(givenRequest).toBe(null);
	});



	it("returns the correct `Hms_Request` instance if `pathname` is the root", function ()
	{
		testRequest({
			expect: Hms_Request.create('/'),
			toBe: {
				pathname: '/',
				pathnameBase: '/',
				relativePathname: '/'
			}
		});
	});



	it("returns the correct `Hms_Request` instance if `pathname` is any pathname", function ()
	{
		testRequests({
			expect: [
				Hms_Request.create('/projects/hermes'),
				Hms_Request.create('/projects/hermes/')
			],
			toBe: {
				pathname: '/projects/hermes',
				pathnameBase: '/',
				relativePathname: '/projects/hermes'
			}
		});
	});
});



describe("Hms_Request.prototype.updateRelativePathname(pathnameList)", function ()
{
	it("just returns an empty string if no element of `pathnameList` matches the beginning of `this.relativePathname`", function ()
	{
		let chosenPathname: string;
		
		let givenRequest = Hms_Request.create('/projects/hermes/docs');
		

		testRequest({
			expect: givenRequest,
			toBe: {
				pathname: '/projects/hermes/docs',
				pathnameBase: '/',
				relativePathname: '/projects/hermes/docs'
			}
		});


		chosenPathname = (givenRequest as Hms_Request).updateRelativePathname([
			'/',							// Slash
			'',								// Empty string
			'/other',						// Different pathname
			'/projects/other',				// Different pathname
			'/projects/hermes/other',		// Different pathname
			'projects',						// No leading slash
			'/project',						// Too short, should be "/projects"
			'/projects/herme',				// Too short, should be "/projects/hermes"
			'/projects/hermes/docs/page1',	// Too long, should be "/projects/hermes/docs"
		]);

		expect(chosenPathname).toBe('');
		
		testRequest({
			expect: givenRequest,
			toBe: {
				pathname: '/projects/hermes/docs',
				pathnameBase: '/',
				relativePathname: '/projects/hermes/docs'
			}
		});
	});



	it("correctly updates `this.relativePathname` and `this.pathnameBase` and returns the most specific element of\n\t `pathnameList` that has matched the beginning of `this.relativePathname`", function ()
	{
		let chosenPathname: string;
		
		let givenRequest = Hms_Request.create('/projects/hermes/docs');
		

		testRequest({
			expect: givenRequest,
			toBe: {
				pathname: '/projects/hermes/docs',
				pathnameBase: '/',
				relativePathname: '/projects/hermes/docs'
			}
		});


		chosenPathname = (givenRequest as Hms_Request).updateRelativePathname([
			'/projects',
			'/projects/hermes',
			'/projects/hermes/docs',
			'/',							// Slash
			'',								// Empty string
			'/other',						// Different pathname
			'/projects/other',				// Different pathname
			'/projects/hermes/other',		// Different pathname
			'projects',						// No leading slash
			'/project',						// Too short, should be "/projects"
			'/projects/herme',				// Too short, should be "/projects/hermes"
			'/projects/hermes/docs/page1',	// Too long, should be "/projects/hermes/docs"
		]);

		expect(chosenPathname).toBe('/projects/hermes/docs');
		
		testRequest({
			expect: givenRequest,
			toBe: {
				pathname: '/projects/hermes/docs',
				pathnameBase: '/projects/hermes/docs',
				relativePathname: '/'
			}
		});
	});



	it("does not return \"/\" if `this.relativePathname` is not \"/\" but there is \"/\" in `pathnameList`", function ()
	{
		let chosenPathname: string;
		
		let givenRequest = Hms_Request.create('/projects/hermes/docs');
		

		testRequest({
			expect: givenRequest,
			toBe: {
				pathname: '/projects/hermes/docs',
				pathnameBase: '/',
				relativePathname: '/projects/hermes/docs'
			}
		});


		chosenPathname = (givenRequest as Hms_Request).updateRelativePathname([
			'/'
		]);

		expect(chosenPathname).not.toBe('/');

		
		chosenPathname = (givenRequest as Hms_Request).updateRelativePathname([
			'/projects',
			'/'
		]);

		expect(chosenPathname).not.toBe('/');
	});



	it("just returns an empty string if `this.relativePathname` is \"/\" but there is not \"/\" in `pathnameList`", function ()
	{
		let chosenPathname: string;
		
		let givenRequest = Hms_Request.create('/projects/hermes/docs');
		

		testRequest({
			expect: givenRequest,
			toBe: {
				pathname: '/projects/hermes/docs',
				pathnameBase: '/',
				relativePathname: '/projects/hermes/docs'
			}
		});

		
		chosenPathname = (givenRequest as Hms_Request).updateRelativePathname(['/projects/hermes/docs']);

		testRequest({
			expect: givenRequest,
			toBe: {
				pathname: '/projects/hermes/docs',
				pathnameBase: '/projects/hermes/docs',
				relativePathname: '/'
			}
		});


		chosenPathname = (givenRequest as Hms_Request).updateRelativePathname([
			'/hermes',
			'/hades1',
			'/other'
		]);

		expect(chosenPathname).toBe('');
		
		testRequest({
			expect: givenRequest,
			toBe: {
				pathname: '/projects/hermes/docs',
				pathnameBase: '/projects/hermes/docs',
				relativePathname: '/'
			}
		});
	});



	it("returns \"/\" without modifying `this.relativePathname` or `this.pathnameBase` if `this.relativePathname` is \"/\"\n\t and there is \"/\" in `pathnameList`", function ()
	{
		let chosenPathname: string;
		
		let givenRequest = Hms_Request.create('/projects/hermes/docs');
		

		testRequest({
			expect: givenRequest,
			toBe: {
				pathname: '/projects/hermes/docs',
				pathnameBase: '/',
				relativePathname: '/projects/hermes/docs'
			}
		});

		
		chosenPathname = (givenRequest as Hms_Request).updateRelativePathname(['/projects/hermes/docs']);

		testRequest({
			expect: givenRequest,
			toBe: {
				pathname: '/projects/hermes/docs',
				pathnameBase: '/projects/hermes/docs',
				relativePathname: '/'
			}
		});


		chosenPathname = (givenRequest as Hms_Request).updateRelativePathname([
			'/',
			'/hermes',
			'/hades1',
			'/other'
		]);

		expect(chosenPathname).toBe('/');
		
		testRequest({
			expect: givenRequest,
			toBe: {
				pathname: '/projects/hermes/docs',
				pathnameBase: '/projects/hermes/docs',
				relativePathname: '/'
			}
		});
	});



	it("always updates `this.relativePathname` and `this.pathnameBase` correctly and returns the element of\n\t `pathnameList` that has matched the beginning of `this.relativePathname`, regardless of its index", function ()
	{
		let givenRequest: Hms_Request | null;
		let chosenPathname: string;

		
		givenRequest = Hms_Request.create('/projects/hermes/docs');
		
		testRequest({
			expect: givenRequest,
			toBe: {
				pathname: '/projects/hermes/docs',
				pathnameBase: '/',
				relativePathname: '/projects/hermes/docs'
			}
		});


		chosenPathname = (givenRequest as Hms_Request).updateRelativePathname([
			'/projects',
			'/',							// Slash
			'',								// Empty string
			'/other',						// Different pathname
			'/projects/other',				// Different pathname
			'/projects/hermes/other',		// Different pathname
			'projects',						// No leading slash
			'/project',						// Too short, should be "/projects"
			'/projects/herme',				// Too short, should be "/projects/hermes"
			'/projects/hermes/docs/page1',	// Too long, should be "/projects/hermes/docs"
		]);

		expect(chosenPathname).toBe('/projects');
		
		testRequest({
			expect: givenRequest,
			toBe: {
				pathname: '/projects/hermes/docs',
				pathnameBase: '/projects',
				relativePathname: '/hermes/docs'
			}
		});

		
		givenRequest = Hms_Request.create('/projects/hermes/docs');
		
		testRequest({
			expect: givenRequest,
			toBe: {
				pathname: '/projects/hermes/docs',
				pathnameBase: '/',
				relativePathname: '/projects/hermes/docs'
			}
		});


		chosenPathname = (givenRequest as Hms_Request).updateRelativePathname([
			'/',							// Slash
			'',								// Empty string
			'/other',						// Different pathname
			'/projects/other',				// Different pathname
			'/projects/hermes/other',		// Different pathname
			'/projects',
			'projects',						// No leading slash
			'/project',						// Too short, should be "/projects"
			'/projects/herme',				// Too short, should be "/projects/hermes"
			'/projects/hermes/docs/page1',	// Too long, should be "/projects/hermes/docs"
		]);

		expect(chosenPathname).toBe('/projects');
		
		testRequest({
			expect: givenRequest,
			toBe: {
				pathname: '/projects/hermes/docs',
				pathnameBase: '/projects',
				relativePathname: '/hermes/docs'
			}
		});

		
		givenRequest = Hms_Request.create('/projects/hermes/docs');
		
		testRequest({
			expect: givenRequest,
			toBe: {
				pathname: '/projects/hermes/docs',
				pathnameBase: '/',
				relativePathname: '/projects/hermes/docs'
			}
		});


		chosenPathname = (givenRequest as Hms_Request).updateRelativePathname([
			'/',							// Slash
			'',								// Empty string
			'/other',						// Different pathname
			'/projects/other',				// Different pathname
			'/projects/hermes/other',		// Different pathname
			'projects',						// No leading slash
			'/project',						// Too short, should be "/projects"
			'/projects/herme',				// Too short, should be "/projects/hermes"
			'/projects/hermes/docs/page1',	// Too long, should be "/projects/hermes/docs"
			'/projects',
		]);

		expect(chosenPathname).toBe('/projects');
		
		testRequest({
			expect: givenRequest,
			toBe: {
				pathname: '/projects/hermes/docs',
				pathnameBase: '/projects',
				relativePathname: '/hermes/docs'
			}
		});
	});



	it("always updates `this.relativePathname` and `this.pathnameBase` correctly and returns the element of\n\t `pathnameList` that has matched the beginning of `this.relativePathname`, when this method is called multiple\n\t times successively", function ()
	{
		let chosenPathname: string;

		let givenRequest = Hms_Request.create('/projects/hermes/docs');


		testRequest({
			expect: givenRequest,
			toBe: {
				pathname: '/projects/hermes/docs',
				pathnameBase: '/',
				relativePathname: '/projects/hermes/docs'
			}
		});


		chosenPathname = (givenRequest as Hms_Request).updateRelativePathname([
			'/projects',
			'/',							// Slash
			'',								// Empty string
			'/other',						// Different pathname
			'/projects/other',				// Different pathname
			'/projects/hermes/other',		// Different pathname
			'projects',						// No leading slash
			'/project',						// Too short, should be "/projects"
			'/projects/herme',				// Too short, should be "/projects/hermes"
			'/projects/hermes/docs/page1',	// Too long, should be "/projects/hermes/docs"
		]);

		expect(chosenPathname).toBe('/projects');

		testRequest({
			expect: givenRequest,
			toBe: {
				pathname: '/projects/hermes/docs',
				pathnameBase: '/projects',
				relativePathname: '/hermes/docs'
			}
		});
		

		chosenPathname = (givenRequest as Hms_Request).updateRelativePathname([
			'/hermes',
			'/',					// Slash
			'',						// Empty string
			'/other',				// Different pathname
			'/hermes/other',		// Different pathname
			'hermes',				// No leading slash
			'/herme',				// Too short, should be "/hermes"
			'/hermes/doc',			// Too short, should be "/hermes/docs"
			'/hermes/docs/page1'	// Too long, should be "/hermes/docs"
		]);

		expect(chosenPathname).toBe('/hermes');

		testRequest({
			expect: givenRequest,
			toBe: {
				pathname: '/projects/hermes/docs',
				pathnameBase: '/projects/hermes',
				relativePathname: '/docs'
			}
		});
		

		chosenPathname = (givenRequest as Hms_Request).updateRelativePathname([
			'/docs',
			'/',			// Slash
			'',				// Empty string
			'/other',		// Different pathname
			'docs',			// No leading slash
			'/doc',			// Too short, should be "/hermes"
			'/docs/page1'	// Too long, should be "/docs"
		]);

		expect(chosenPathname).toBe('/docs');

		testRequest({
			expect: givenRequest,
			toBe: {
				pathname: '/projects/hermes/docs',
				pathnameBase: '/projects/hermes/docs',
				relativePathname: '/'
			}
		});
		

		chosenPathname = (givenRequest as Hms_Request).updateRelativePathname([
			'/',		// Slash
			'',			// Empty string
			'/page1'	// Too long, should be "/"
		]);

		expect(chosenPathname).toBe('/');

		testRequest({
			expect: givenRequest,
			toBe: {
				pathname: '/projects/hermes/docs',
				pathnameBase: '/projects/hermes/docs',
				relativePathname: '/'
			}
		});
		

		chosenPathname = (givenRequest as Hms_Request).updateRelativePathname([
			'',			// Empty string
			'/page1'	// Too long, should be "/"
		]);

		expect(chosenPathname).toBe('');

		testRequest({
			expect: givenRequest,
			toBe: {
				pathname: '/projects/hermes/docs',
				pathnameBase: '/projects/hermes/docs',
				relativePathname: '/'
			}
		});
		

		chosenPathname = (givenRequest as Hms_Request).updateRelativePathname([
			'/page1'	// Too long, should be "/"
		]);

		expect(chosenPathname).toBe('');

		testRequest({
			expect: givenRequest,
			toBe: {
				pathname: '/projects/hermes/docs',
				pathnameBase: '/projects/hermes/docs',
				relativePathname: '/'
			}
		});
	});
});



});  // ends describe('`Request` class', ... );
