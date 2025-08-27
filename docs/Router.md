[**&larr;&nbsp;&nbsp; Back**](../README.md)

# `Hermes.Router` class<br><span style="font-size: 0.8em;">(alias `Hms_Router`)</span>

<br>



## Table of content

1. [Overview](#overview)
2. [Instantiation](#instantiation)
	- [`Hermes.createRouter()`<br>`Hms_Router.create()`](#instantiation--create)
3. [Instance property](#instance-properties)
	- [`router.selectedTypeOfController`](#instance-properties--selectedTypeOfController)
4. [Instance methods](#instance-methods)
	- [`router.run(req, res)`](#instance-methods--run)
	- [`router.use(pathname, controllerLike)`](#instance-methods--use)
	- [`router.useDefault(controllerLike)`](#instance-methods--useDefault)

<br>



<a name="overview"></a>

## 1 - Overview

``` typescript
class Hms_Router
{
	// Static method for instantiation
	static create(): Hms_Router;

	// Instance property
	readonly selectedTypeOfController: 'none' | 'default' | 'specific';

	// Instance methods
	run(req: Hms_Request, res: Hms_Response): this;
	use(pathname: string, controllerLike: Hms_ControllerLike): this;
	useDefault(controllerLike: Hms_ControllerLike): this;
}

// Function for instantiation
Hermes.createRouter = Hms_Router.create;
```

<br>



<a name="instantiation"></a>

## 2 - Instantiation

There are 2 ways to instantiate the `Hms_Router` class:

- either you import the `Hermes` namespace and you call the `createRouter` function,

	```typescript
	import Hermes from '@inextremis/hermes';

	let router: Hermes.Router = Hermes.createRouter();
	```

- or you import the `Hms_Router` class only and you call the `create` static method.

	```typescript
	import { Hms_Router } from '@inextremis/hermes';

	let router: Hms_Router = Hms_Router.create();
	```

<br>



<a name="instantiation--create"></a>

### `Hermes.createRouter()`<br>`Hms_Router.create()`

Creates a router.

**Returns**: an instance of `Hms_Router`.

<br>



<a name="instance-properties"></a>

## 3 - Instance property

<br>



<a name="instance-properties--selectedTypeOfController"></a>

### `router.selectedTypeOfController`

&nbsp;&nbsp;&nbsp;&nbsp; *Type: 'none' | 'default' | 'specific' &nbsp;&nbsp;/&nbsp;&nbsp; Readonly property*

Indicates what type of controller-like was run during the last run of the router.

- It is 'specific' if a controller-like mounted on a specific pathname was run.
- It is 'default' if the default controller-like was run.
- It is 'none' if no controller-like was run, or if the router has never been run.

<br>



<a name="instance-methods"></a>

## 4 - Instance methods

<br>



<a name="instance-methods--run"></a>

### `router.run(req, res)`

Runs the router and runs the correct controller-like.

**Parameters**:

- `req`: The request that is handled by the router.

	**Type**: [`Hms_Request`](./Request.md)

- `res`: The response of the router.

	**Type**: `Hms_Response`

**Returns**: `this` (the instance of `Hms_Router` itself).

**Remarks**:

When this method is called, it compares `req.relativePathname` with the pathnames of every routes.

There are 3 possible cases. Look at this example:

```typescript
import {
	controllerLike_root,
	controllerLike1,
	controllerLike2,
	controllerLike3,
	controllerLike_default,
} from './controllers';

let router = Hms_Router.create();

router.use('/', controllerLike_root);
router.use('/route1', controllerLike1);
router.use('/route2', controllerLike2);
router.use('/route3', controllerLike3);
router.useDefault(controllerLike_default);
```

- **Case 1**: If a route's pathname matches the beginning of `req.relativePathname`, then the controller-like mounted on this route is run.

```typescript
let req = Hms_Request.create('http://media-inextremis.net/route2/some/random/pathname');
let res = new Hms_Response();

router.run(req, res);

// '/route2' matches the beginning of '/route2/some/random/pathname'.
// So controllerLike2 is run.
```

- **Case 2**: If no route's pathname matches the beginning of `req.relativePathname` and if there is a default controller-like,
then the default controller-like is run.

```typescript
let req = Hms_Request.create('http://media-inextremis.net/route66/some/random/pathname');
let res = new Hms_Response();

router.run(req, res);

// No pathname matches the beginning of '/route66/some/random/pathname'.
// So controllerLike_default is run.
```

- **Case 3**: If no route's pathname matches the beginning of `req.relativePathname` and if there is no default controller-like,
then no controller-like is run.

```typescript
// Let's assume that router.useDefault() has never been called.

let req = Hms_Request.create('http://media-inextremis.net/route66/some/random/pathname');
let res = new Hms_Response();

router.run(req, res);

// No pathname matches the beginning of '/route66/some/random/pathname'.
// So no controller-like is run.
```

<br>



<a name="instance-methods--use"></a>

### `router.use(pathname, controllerLike)`

Adds a route to the router.

**Parameters**:

- `pathname`: The pathname of the route.

	**Type**: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

- `controllerLike`: The controller-like to be used on the route.

	**Type**: [`Hms_ControllerLike`](./ControllerLike.md)

**Returns**: `this` (the instance of `Hms_Router` itself).

**Remark**:

If `pathname` is not a valid pathname, this method does not add the route.

**Remark**:

If a controller-like is mounted on '/', then it will be run only if `req.relativePathname` is '/'.

**Remark**:

If multiple controllers-like are mounted on the same pathname,
then only the last one is saved in the router and can be run by the router, the other ones are just ignored.

```typescript
let router = Hms_Router.create();

router.use('/', controllerLike_root);
router.use('/route', controllerLike1);
router.use('/route', controllerLike2);
router.use('/route', controllerLike3);
router.useDefault(controllerLike_default);

let req = Hms_Request.create('http://media-inextremis.net/route/some/random/pathname');
let res = new Hms_Response();

router.run(req, res);
// controllerLike3 is the last controller-like mounted on '/route'.
// So controllerLike3 is run.
```

**Remark**:

If the pathnames of multiple routes match the beginning of `req.relativePathname`,
then the controller-like mounted on the most specific pathname will be run by the router.

```typescript
let router = Hms_Router.create();

router.use('/', controllerLike_root);
router.use('/route1', controllerLike1);
router.use('/route1/route2', controllerLike2);
router.use('/route1/route2/route3', controllerLike3);
router.useDefault(controllerLike_default);

let req = Hms_Request.create('http://media-inextremis.net/route1/route2/route3/some/random/pathname');
let res = new Hms_Response();

router.run(req, res);

// '/route1/route2/route3' is the most specific pathname.
// So controllerLike3 is run.
```

<br>



<a name="instance-methods--useDefault"></a>

### `router.useDefault(controllerLike)`

Adds a default route to the router.

**Parameter**:

- `controllerLike`: The controller-like to be used on the default route.

	**Type**: [`Hms_ControllerLike`](./ControllerLike.md)

**Returns**: `this` (the instance of `Hms_Router` itself).

**Remark**:

If multiple controllers-like are mounted on the default route,
then only the last one is saved in the router and can be run by the router, the other ones are just ignored.

```typescript
let router = Hms_Router.create();

router.use('/', controllerLike_root);
router.useDefault(controllerLike1);
router.useDefault(controllerLike2);
router.useDefault(controllerLike3);

let req = Hms_Request.create('http://media-inextremis.net/some/random/pathname');
let res = new Hms_Response();

router.run(req, res);

// controllerLike3 is the last controller-like mounted on the default route.
// So controllerLike3 is run.
```
