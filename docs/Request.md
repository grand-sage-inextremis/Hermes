[**&larr;&nbsp;&nbsp; Back**](../README.md)

# `Hermes.Request` class<br><span style="font-size: 0.8em;">(alias `Hms_Request`)</span>

<br>



## Table of content

1. [Overview](#overview)
2. [Instantiation](#instantiation)
	- [`Hermes.createRequest(url)`<br>`Hms_Request.create(url)`](#instantiation--create)
3. [Instance properties](#instance-properties)
	- [`req.url`](#instance-properties--url)
	- [`req.pathnameBase`](#instance-properties--pathnameBase)
	- [`req.relativePathname`](#instance-properties--relativePathname)
4. [Instance method](#instance-methods)
	- [`req.updateRelativePathname(pathnameList)`](#instance-methods--updateRelativePathname)

<br>



<a name="overview"></a>

## 1 - Overview

```typescript
class Hms_Request
{
	// Static method for instantiation
	static create(url: URL | string): Hms_Request;

	// Instance properties
	readonly url: URL;
	readonly pathnameBase: string;
	readonly relativePathname: string;

	// Instance method
	updateRelativePathname(pathnameList: Array<string>): string;
}

// Function for instantiation
Hermes.createRequest = Hms_Request.create;
```

<br>



<a name="instantiation"></a>

## 2 - Instantiation

There are 2 ways to instantiate the `Hms_Request` class:

- either you import the `Hermes` namespace and you call the `createRequest` function,

	```typescript
	import Hermes from '@inextremis/hermes';

	let req: Hermes.Request = Hermes.createRequest('http://media-inextremis.net/');
	```

- or you import the `Hms_Request` class only and you call the `create` static method.

	```typescript
	import { Hms_Request } from '@inextremis/hermes';

	let req: Hms_Request = Hms_Request.create('http://media-inextremis.net/');
	```

<br>



<a name="instantiation--create"></a>

### `Hermes.createRequest(url)`<br>`Hms_Request.create(url)`

Creates a request from a URL.

**Parameter**:

- `url`: [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

**Returns**: an instance of `Hms_Request` if `url` is a valid URL.

**Throws**: an error if `url` is an invalid URL.

<br>



<a name="instance-properties"></a>

## 3 - Instance properties

<br>



<a name="instance-properties--url"></a>

### `req.url`

&nbsp;&nbsp;&nbsp;&nbsp; *Type: [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) &nbsp;&nbsp;/&nbsp;&nbsp; Readonly property*

The URL of the request.

<br>



<a name="instance-properties--pathnameBase"></a>

### `req.pathnameBase`

&nbsp;&nbsp;&nbsp;&nbsp; *Type: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) &nbsp;&nbsp;/&nbsp;&nbsp; Readonly property*

The pathname on which the controller is mounted.

<br>



<a name="instance-properties--relativePathname"></a>

### `req.relativePathname`

&nbsp;&nbsp;&nbsp;&nbsp; *Type: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) &nbsp;&nbsp;/&nbsp;&nbsp; Readonly property*

The pathname of the request from which the controller mount point was removed.

<br>



### Example

```typescript
// The pathname of the request is "/projects/hermes";

router.use('/projects', function (req, res)
{
	console.log(req.url.pathname);		// Output: "/projects/hermes"

	console.log(req.pathnameBase);		// Output: "/projects"
	console.log(req.relativePathname);	// Output: "/hermes"
});
```

<br>



<a name="instance-methods"></a>

## 4 - Instance method

<br>



<a name="instance-methods--updateRelativePathname"></a>

### `req.updateRelativePathname(pathnameList)`

For each pathname of `pathnameList`, checks if it matches the beginning of the relative pathname.

If so, this method removes the matching pathname from the relative pathname, adds it to the end of the pathname base,
and returns it.

Otherwise, it just returns an empty string.

**Parameter**:

- `pathnameList`: [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) of [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

**Returns**: a [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).

**Remark**:

If multiple pathnames of `pathnameList` match the beginning of the relative pathname,
this method modifies the relative pathname and the pathname base with the most specific
matching pathname and returns it.

**Remarks**:

- If the relative pathname is not "/" but there is "/" in `pathnameList`,
this method does not return "/".

- If the relative pathname is "/" but there is not "/" in `pathnameList`,
this method returns an empty string.

- If the relative pathname is "/" and there is "/" in `pathnameList`,
the relative pathname and the pathname base are not modified and
this method returns "/".

**Example**:

```typescript
console.log(req.url.pathname);		// Output: "/projects/hermes-v1/docs"
console.log(req.pathnameBase);		// Output: "/projects"
console.log(req.relativePathname);	// Output: "/hermes-v1/docs"

req.updateRelativePathname([
	'/hermes',
	'/hermes-v2',
	'/hermes-v1/doc'  // matches neither "/hermes-v1" nor "/hermes-v1/docs"
]);
// => Just returns ""

console.log(req.pathnameBase);		// Output: "/projects"
console.log(req.relativePathname);	// Output: "/hermes-v1/docs"

req.updateRelativePathname([
	'/hermes-v1',
	'/hermes',
	'/hermes-v2',
	'/hermes-v1/doc'  // matches neither "/hermes-v1" nor "/hermes-v1/docs"
]);
// => Update `req` and returns "/hermes-v1"

console.log(req.pathnameBase);		// Output: "/projects/hermes-v1"
console.log(req.relativePathname);	// Output: "/docs"
```

**Example**:

```typescript
console.log(req.url.pathname);		// Output: "/projects/hermes/docs"
console.log(req.pathnameBase);		// Output: "/projects"
console.log(req.relativePathname);	// Output: "/hermes/docs"

req.updateRelativePathname([
	'/',
	'/hermes',
	'/hermes/docs'
]);
// => Update `req` and returns "/hermes/docs"

console.log(req.pathnameBase);		// Output: "/projects/hermes/docs"
console.log(req.relativePathname);	// Output: "/"

req.updateRelativePathname([
	'/alpha',
	'/beta',
	'/gamma'
]);
// => Just returns ""

console.log(req.pathnameBase);		// Output: "/projects/hermes/docs"
console.log(req.relativePathname);	// Output: "/"

req.updateRelativePathname([
	'/',
	'/alpha',
	'/beta',
	'/gamma'
]);
// => Just returns "/"

console.log(req.pathnameBase);		// Output: "/projects/hermes/docs"
console.log(req.relativePathname);	// Output: "/"
```
