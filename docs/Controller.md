[**&larr;&nbsp;&nbsp; Back**](../README.md)

# `Hermes.Controller` class<br><span style="font-size: 0.8em;">(alias `Hms_Controller`)</span>

<br>



## Table of content

1. [Overview](#overview)
2. [Instantiation](#instantiation)
	- [`Hermes.createController(controllerFunction)`<br>`Hms_Controller.create(controllerFunction)`](#instantiation--create)
3. [Instance method](#instance-methods)
	- [`controller.run(req, res)`](#instance-methods--run)

<br>



<a name="overview"></a>

## 1 - Overview

``` typescript
class Hms_Controller
{
	// Static method for instantiation
	static create(controllerFunction: (req: Hms_Request, res: Hms_Response) => unknown): Hms_Controller;

	// Instance method
	run(req: Hms_Request, res: Hms_Response): this;
}

// Function for instantiation
Hermes.createController = Hms_Controller.create;
```

<br>



<a name="instantiation"></a>

## 2 - Instantiation

There are 2 ways to instantiate the `Hms_Controller` class:

- either you import the `Hermes` namespace and you call the `createController` function,

	```typescript
	import Hermes from '@inextremis/hermes';

	let controller: Hermes.Controller = Hermes.createController(function (req, res)
	{
		// ...
	});
	```

- or you import the `Hms_Controller` class only and you call the `create` static method.

	```typescript
	import { Hms_Controller } from '@inextremis/hermes';

	let controller: Hms_Controller = Hms_Controller.create(function (req, res)
	{
		// ...
	});
	```

<br>



<a name="instantiation--create"></a>

### `Hermes.createController(controllerFunction)`<br>`Hms_Controller.create(controllerFunction)`

Creates a controller.

**Parameter**:

- `controllerFunction`: The function to be run when the controller is run.

	>**Parameters**:
	>- `req`: an instance of [`Hms_Request`](./Request.md)
	>- `res`: an instance of `Hms_Response`
	>
	><br>
	>
	>**Returns**: any type of value.

**Returns**: an instance of `Hms_Controller`.

<br>



<a name="instance-methods"></a>

## 3 - Instance method

<br>



<a name="instance-methods--run"></a>

### `controller.run(req, res)`

Runs the controller.

**Parameters**:

- `req`: The request that is handled by the controller.

	**Type**: [`Hms_Request`](./Request.md)

- `res`: The response of the controller.

	**Type**: `Hms_Response`

**Returns**: `this` (the instance of `Hms_Controller` itself).
