[**&larr;&nbsp;&nbsp; Back**](../README.md)

# `Hermes.ControllerLike` interface<br><span style="font-size: 0.8em;">(alias `Hms_ControllerLike`)</span>

<br>



## Table of content

1. [Overview](#overview)
2. [Instance method](#instance-methods)
	- [`controllerlike.run(req, res)`](#instance-methods--run)

<br>



<a name="overview"></a>

## 1 - Overview

``` typescript
interface Hms_ControllerLike
{
	// Instance method
	run(req: Hms_Request, res: Hms_Response): this;
}
```

<br>



<a name="instance-methods"></a>

## 2 - Instance method

<br>



<a name="instance-methods--run"></a>

### `controllerlike.run(req, res)`

Runs the controller-like object.

**Parameters**:

- `req`: The request that is handled by the controller-like object.

	**Type**: [`Hms_Request`](./Request.md)

- `res`: The response of the controller-like object.

	**Type**: `Hms_Response`

**Returns**: `this` (the controller-like object itself).
