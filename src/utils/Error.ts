class Hms_Error<CauseType> extends Error
{
	readonly cause: CauseType;

	constructor(message: string, options: { cause: CauseType })
	{
		super(message);
		this.cause = options.cause;
	}
}



export function INVALID_URL(url: string): Hms_Error<string>
{
	return new Hms_Error('INVALID_URL', { cause: url });
}
