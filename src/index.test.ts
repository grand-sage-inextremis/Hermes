import { test, expect } from 'vitest';



console.log("Starting the tests...");



test("0.1 + 0.2 != 0.3", function ()
{
	expect(0.1 + 0.2).not.toBe(0.3);
});
