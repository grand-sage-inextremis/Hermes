# Hermes

![Last version](https://img.shields.io/badge/Last_release-1.0.0-4466aa) ![MIT](https://img.shields.io/badge/License-MIT-3da639)

Hermes is a JavaScript router.

<br>

**Last release**: 1.0.0 &nbsp;*(2025-08-26)*

**License**: [MIT](./LICENSE) &nbsp;*(<https://opensource.org/license/mit>)*

**Author**: Grand Sage InExtremis &nbsp;*(<grand.sage.inextremis@gmail.com>)*

<br>

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

This project follows the [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) standard to represent the dates.

<br>



## Table of content

1. [Installation](#1-installation)
2. [How Hermes works](#2-how-hermes-works)
3. [Documentation](#3-docs)

<br>



<a name="1-installation"></a>

## 1 - Installation

This is a [Node.js](https://nodejs.org/en/) module available through the [npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).

If this is a brand new project, make sure to create a `package.json` first with
the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file).

Installation is done using the [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):


```bash
$ npm install @inextremis/hermes
```

<br>



<a name="2-how-hermes-works"></a>

## 2 - How Hermes works

Here is a simple example.

Let's imagine that we develop a mailbox application. It has 3 views: **Inbox**, **Sent mails** and **Mail editor**.

That would be the HTML code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>InExtremis mailbox</title>
</head>
<body>

	<div id="inbox"> ... </div>

	<div id="sent-mails" hidden> ... </div>

	<div id="mail-editor" hidden> ... </div>

	<script type="module" src="/app/index.js"></script>
</body>
</html>
```

<br>

But we don't want the 3 views to be displayed at the same time.

- When the pathname of the URL is **/inbox**, we want the **Inbox** view to be displayed.

- When the pathname of the URL is **/sent-mails**, we want the **Sent mails** view to be displayed.

- When the pathname of the URL is **/send-mail**, we want the **Mail editor** view to be displayed.

<br>

First, we have to define 3 controllers.

<br>

**/app/controllers.js**

```javascript
import Hermes from '@inextremis/hermes';


export const displayInbox = Hermes.createController(function (req, res)
{
	document.getElementById('inbox').hidden = false;
	document.getElementById('sent-mails').hidden = true;
	document.getElementById('mail-editor').hidden = true;
});


export const displaySentMails = Hermes.createController(function (req, res)
{
	document.getElementById('inbox').hidden = true;
	document.getElementById('sent-mails').hidden = false;
	document.getElementById('mail-editor').hidden = true;
});


export const displayMailEditor = Hermes.createController(function (req, res)
{
	document.getElementById('inbox').hidden = true;
	document.getElementById('sent-mails').hidden = true;
	document.getElementById('mail-editor').hidden = false;
});
```

<br>

Then, we have to create a router to connect controllers and pathnames.

<br>

**/app/router.js**

```javascript
import Hermes from '@inextremis/hermes';
import { displayInbox, displaySentMails, displayMailEditor } from "./controller.ts";


const router = Hermes.createRouter();

router.use('/inbox', displayInbox);
router.use('/sent-mails', displaySentMails);
router.use('/send-mail', displayMailEditor);


export default router;
```

<br>

Finally, we have to:

- create a request from the URL of the page,
- create a response object (which is useless for now),
- run the router a first time and run it again whenever the URL is updated.

<br>

**/app/index.js**

```javascript
import Hermes from '@inextremis/hermes';
import router from "./router.ts";


let req = Hermes.createRequest(window.location.ref);
let res = Hermes.createResponse();

router.run(req, res);


window.addEventListener('popstate', function (event)
{
	req = Hermes.createRequest(window.location.ref);

	router.run(req, res);
});
```

<br>



<a name="3-docs"></a>

## 3 - Documentation

- Classes:
	- [`Hermes.Request`](./docs/Request.md)
	- [`Hermes.Controller`](./docs/Controller.md)
	- [`Hermes.Router`](./docs/Router.md)

- TypeScript interface:
	- [`Hermes.ControllerLike`](./docs/ControllerLike.md)
