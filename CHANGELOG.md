# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

This project follows the [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) standard to represent the dates.

<br>



## [0.1.0] - 2025-08-26

### Added

- This CHANGELOG\.md file for documenting all notable changes to this project.

- README\.md now contains the license, the version number, the author, and some documentation.

- A complete documentation.

- A package.json because this project is a npm package and because it requires some other npm packages as development dependencies.

- `Hms_Request` class
	- `Hms_Request.create(url)`
	- `Hms_Request.proptotype.url`
	- `Hms_Request.proptotype.pathnameBase`
	- `Hms_Request.proptotype.relativePathname`
	- `Hms_Request.proptotype.updateRelativePathname(pathnameList)`

- `Hms_Response` class

- `Hms_ControllerLike` interface
	- `Hms_ControllerLike.proptotype.run(req, res)`

- `Hms_Controller` class
	- `Hms_Controller.create(controllerFunction)`
	- `Hms_Controller.proptotype.run(req, res)`

- `Hms_Router` class
	- `Hms_Router.create()`
	- `Hms_Router.proptotype.selectedTypeOfController`
	- `Hms_Router.proptotype.run(req, res)`
	- `Hms_Router.proptotype.use(pathname, controllerLike)`
	- `Hms_Router.proptotype.useDefault(controllerLike)`

### Changed

- The license was switched from Apache-2.0 to MIT.

<br>



## [0.0.1] - 2025-04-11

### Added

- A minimalist README.md.
- The Apache-2.0 license.

[0.1.0]: https://github.com/grand-sage-inextremis/Hermes/compare/v0.0.1...v0.1.0
[0.0.1]: https://github.com/grand-sage-inextremis/Hermes/releases/tag/v0.0.1
