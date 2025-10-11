import { Hms_RequestInstance, Hms_RequestClass } from './RequestInterfaces.js';
import { addTrailingSlashToPathname, removeTrailingSlashFromPathname, isValidPathname } from '../utils/url.js';



const Hms_Request: Hms_RequestClass = class HRequest implements Hms_RequestInstance
{
	public readonly pathname: string;
	private _pathnameBaseLength: number;
	


	constructor(pathname: string)
	{
		this.pathname = pathname;
		this._pathnameBaseLength = 0;
	}



	public static create(pathname: string): Hms_Request | null
	{
		if (!isValidPathname(pathname))
		{
			return null;
		}

		return new Hms_Request(removeTrailingSlashFromPathname(pathname));
	}



	public get pathnameBase(): string
	{
		if (this._pathnameBaseLength === 0)
		{
			return '/';
		}

		return this.pathname.slice(0, this._pathnameBaseLength);
	}



	public get relativePathname(): string
	{
		if (this._pathnameBaseLength === this.pathname.length)
		{
			return '/';
		}
		
		return this.pathname.slice(this._pathnameBaseLength);
	}



	public updateRelativePathname(pathnameList: Array<string>): string
	{
		let matchingPathname = '';

		for (const pathname of pathnameList)
		{
			if (this.matchesBeginningOfRelativePathname(pathname))
			{
				if (pathname.length > matchingPathname.length)
				{
					matchingPathname = pathname;
				}
			}
		}

		if (matchingPathname !== '' && matchingPathname !== '/')
		{
			this._pathnameBaseLength += matchingPathname.length;
		}

		return matchingPathname;
	}



	/**
	 * Returns true if `pathname` is a valid pathname and if it matches the beginning of
	 * `this.relativePathname`.
	 * 
	 * Returns false otherwise.
	 */
	private matchesBeginningOfRelativePathname(pathname: string): boolean
	{
		let pathnameWithTrailingSlash: string;
		let relativePathnameWithTrailingSlash: string;

		if (pathname === '/' || this.relativePathname === '/')
		{
			return pathname === this.relativePathname;
		}

		// Let's assume that this.relativePathname === "/hermes/docs".
		//
		// This method must return false if pathname === "/herme".
		// However, "/herme" matches the beginning of "/hermes/docs".
		// So I need to add a trailing slash to `pathname`,
		// because "/herme/" does not match the beginning of "/hermes/docs".
		//
		// Also, this method must return true if pathnameWithTrailingSlash === "/hermes/docs/".
		// However, "/hermes/docs/" does not match the beginning of "/hermes/docs".
		// So I need to add a trailing slash to `this.relativePathname`,
		// because "/hermes/docs/" matches the beginning of "/hermes/docs/".
		//
		pathnameWithTrailingSlash = addTrailingSlashToPathname(pathname);
		relativePathnameWithTrailingSlash = addTrailingSlashToPathname(this.relativePathname);

		// This method must return false if `pathname` is not a valid pathname.
		// `addTrailingSlashToPathname` already checks whether `pathname` is a valid pathname or not,
		// so we use the following condition instead of calling `isValidPathname`.
		//
		if (pathnameWithTrailingSlash === '')
		{
			return false;
		}

		return relativePathnameWithTrailingSlash.startsWith(pathnameWithTrailingSlash);
	}
}



type Hms_Request = InstanceType<typeof Hms_Request>;



export default Hms_Request;
