/**
 * Returns true if `pathname` is a valid pathname. Returns false otherwise.
 * 
 * A valid pathname is a string starting with a slash.
 */
export function isValidPathname(pathname: string): boolean
{
	return (pathname.length >= 1 && pathname[0] === '/');
}



/**
 * If `pathname` is a valid pathname, returns a copy of `pathname` with no trailing slash.
 * 
 * Otherwise, returns an empty string.
 * 
 * 
 * @example
 * 
 * ```ts
 * removeTrailingSlashFromPathname('/projects/hermes/');
 * // Output: "/projects/hermes"
 * 
 * removeTrailingSlashFromPathname('/projects/hermes');
 * // Output: "/projects/hermes"
 * 
 * removeTrailingSlashFromPathname('projects/hermes');
 * // Output: ""
 * ```
 */
export function removeTrailingSlashFromPathname(pathname: string): string
{
	if (!isValidPathname(pathname))
	{
		return '';
	}

	if (pathname !== '/' && pathname[pathname.length - 1] === '/')
	{
		return pathname.slice(0, -1);
	}
	
	return pathname;
}



/**
 * If `pathname` is a valid pathname, returns a copy of `pathname` with a trailing slash.
 * 
 * Otherwise, returns an empty string.
 * 
 * 
 * @example
 * 
 * ```ts
 * addTrailingSlashToPathname('/projects/hermes');
 * // Output: "/projects/hermes/"
 * 
 * addTrailingSlashToPathname('/projects/hermes/');
 * // Output: "/projects/hermes/"
 * 
 * addTrailingSlashToPathname('projects/hermes');
 * // Output: ""
 * ```
 */
export function addTrailingSlashToPathname(pathname: string): string
{
	if (!isValidPathname(pathname))
	{
		return '';
	}
	
	if (pathname[pathname.length - 1] !== '/')
	{
		return pathname + '/';
	}
	
	return pathname;
}
