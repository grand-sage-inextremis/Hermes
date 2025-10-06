export interface Hms_RequestClass
{
	/**
	 * Creates a request from a URL.
	 * 
	 * @returns A request if `url` is a valid URL; `null` otherwise.
	 */
	create(url: URL | string): Hms_RequestInstance | null;

	new (url: URL): Hms_RequestInstance;
}



export interface Hms_RequestInstance
{
	/** The URL of the request. */
	readonly url: URL;

	/**
	 * The pathname on which the controller is mounted.
	 * 
	 * @example
	 * 
	 * 	// The pathname of the request is "/projects/hermes";
	 * 
	 * 	router.use('/projects', function (req, res)
	 * 	{
	 * 		console.log(req.url.pathname);		// Output: "/projects/hermes"
	 * 		
	 * 		console.log(req.pathnameBase);		// Output: "/projects"
	 * 		console.log(req.relativePathname);	// Output: "/hermes"
	 * 	});
	 */
	readonly pathnameBase: string;

	/**
	 * The pathname of the request from which the controller mount point was removed.
	 * 
	 * @example
	 * 
	 * 	// The pathname of the request is "/projects/hermes";
	 * 
	 * 	router.use('/projects', function (req, res)
	 * 	{
	 * 		console.log(req.url.pathname);		// Output: "/projects/hermes"
	 * 
	 * 		console.log(req.pathnameBase);		// Output: "/projects"
	 * 		console.log(req.relativePathname);	// Output: "/hermes"
	 * 	});
	 */
	readonly relativePathname: string;

	/**
	 * For each pathname of `pathnameList`, checks if it matches the beginning of the relative pathname.
	 * 
	 * If so, this method removes the matching pathname from the relative pathname, adds it to the end of the pathname base,
	 * and returns it.
	 * 
	 * Otherwise, it just returns an empty string.
	 * 
	 * @remark
	 * 
	 * If multiple pathnames of `pathnameList` match the beginning of the relative pathname,
	 * this method modifies the relative pathname and the pathname base with the most specific
	 * matching pathname and returns it.
	 * 
	 * @remarks
	 * 
	 * - If the relative pathname is not "/" but there is "/" in `pathnameList`,
	 * 	 this method does not return "/".
	 * 
	 * - If the relative pathname is "/" but there is not "/" in `pathnameList`,
	 * 	 this method returns an empty string.
	 * 
	 * - If the relative pathname is "/" and there is "/" in `pathnameList`,
	 * 	 the relative pathname and the pathname base are not modified and
	 * 	 this method returns "/".
	 * 
	 * @example
	 * 
	 * 		console.log(req.url.pathname);		// Output: "/projects/hermes-v1/docs"
	 * 		console.log(req.pathnameBase);		// Output: "/projects"
	 * 		console.log(req.relativePathname);	// Output: "/hermes-v1/docs"
	 * 
	 * 		req.updateRelativePathname([
	 * 			'/hermes',
	 * 			'/hermes-v2',
	 * 			'/hermes-v1/doc'  // matches neither "/hermes-v1" nor "/hermes-v1/docs"
	 * 		]);
	 * 		// => Just returns ""
	 * 
	 * 		console.log(req.pathnameBase);		// Output: "/projects"
	 * 		console.log(req.relativePathname);	// Output: "/hermes-v1/docs"
	 * 
	 * 		req.updateRelativePathname([
	 * 			'/hermes-v1',
	 * 			'/hermes',
	 * 			'/hermes-v2',
	 * 			'/hermes-v1/doc'  // matches neither "/hermes-v1" nor "/hermes-v1/docs"
	 * 		]);
	 * 		// => Update `req` and returns "/hermes-v1"
	 * 
	 * 		console.log(req.pathnameBase);		// Output: "/projects/hermes-v1"
	 * 		console.log(req.relativePathname);	// Output: "/docs"
	 * 
	 * @example
	 * 
	 * 		console.log(req.url.pathname);		// Output: "/projects/hermes/docs"
	 * 		console.log(req.pathnameBase);		// Output: "/projects"
	 * 		console.log(req.relativePathname);	// Output: "/hermes/docs"
	 * 
	 * 		req.updateRelativePathname([
	 * 			'/',
	 * 			'/hermes',
	 * 			'/hermes/docs'
	 * 		]);
	 * 		// => Update `req` and returns "/hermes/docs"
	 * 
	 * 		console.log(req.pathnameBase);		// Output: "/projects/hermes/docs"
	 * 		console.log(req.relativePathname);	// Output: "/"
	 * 
	 * 		req.updateRelativePathname([
	 * 			'/alpha',
	 * 			'/beta',
	 * 			'/gamma'
	 * 		]);
	 * 		// => Just returns ""
	 * 
	 * 		console.log(req.pathnameBase);		// Output: "/projects/hermes/docs"
	 * 		console.log(req.relativePathname);	// Output: "/"
	 * 
	 * 		req.updateRelativePathname([
	 * 			'/',
	 * 			'/alpha',
	 * 			'/beta',
	 * 			'/gamma'
	 * 		]);
	 * 		// => Just returns "/"
	 * 
	 * 		console.log(req.pathnameBase);		// Output: "/projects/hermes/docs"
	 * 		console.log(req.relativePathname);	// Output: "/"
	 */
	updateRelativePathname(pathnameList: Array<string>): string;
}
