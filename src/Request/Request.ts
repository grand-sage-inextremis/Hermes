import { Hms_RequestInstance, Hms_RequestClass } from './RequestInterfaces';



const Hms_Request: Hms_RequestClass = class HRequest implements Hms_RequestInstance
{
	public readonly url: URL;
	


	constructor(url: URL)
	{
		this.url = url;
	}



	public static create(url: URL | string): Hms_Request
	{
		return new Hms_Request(new URL('http://media-inextremis.net/'));
	}



	public get pathnameBase(): string
	{
		return '';
	}



	public get relativePathname(): string
	{
		return '';
	}



	public updateRelativePathname(pathnameList: Array<string>): string
	{
		return '';
	}
}



type Hms_Request = InstanceType<typeof Hms_Request>;



export default Hms_Request;
