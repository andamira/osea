# Médula

[![Join the chat at https://gitter.im/andamira/medula](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/andamira/medula?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

![logo](src/img/apple-touch-icon.png)

**Starter Theme & Plugin for WordPress**

## Features

- It is Mobile First and progresively enhanced.
- It is modular, versatile, and simple enough.
- It has a clear and well commented structure.
- It incorporates a minimal plugin framework.
- It uses a procedural programming structure.

## Dependencies

- [NPM](https://www.npmjs.com/) & [Gulp](http://gulpjs.com/) for building the project
- [Bower](http://bower.io/) for managing the vendor libraries
- [Sass](http://sass-lang.com/) for creating the stylesheets
- [Susy](http://susy.oddbird.net/) for the responsive grid
- [include-media](https://github.com/eduardoboucas/include-media) for the breakpoints


## Quick Start

1. Clone the git repo, or [download the master zip file](https://github.com/andamira/medula/archive/master.zip).

	`git clone https://github.com/andamira/medula.git medula-master`


1. Install the dependencies

	1. Install [Node.js and update npm](https://docs.npmjs.com/getting-started/installing-node)

		```
		sudo apt-get install nodejs
		sudo npm install -g npm
		```

	1. Install [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) and [Bower](hnpm ttps://www.npmjs.com/package/bower)

		`sudo npm install -g gulp bower`

	1. Install the project dependencies from the root folder (where the files`package.json` & `bower.json` are located)
	
		```
		cd medula-master
		npm install && bower install
		```

1. Customize your theme name and other details in the [theme stylesheet](https://codex.wordpress.org/Theme_Development#Theme_Stylesheet): `/theme/style.css`

1. Rename the target theme directory in the file: `/src/sass/dependencies/_global.scss` `[3.1]`

1. You can overwrite the default favicons in `/src/img/` and everytime you update them, increase the icon version number in `/theme/lib/icons.php`

1. To compile the project you may use `gulp --dev` during development and `gulp` for production

1. To install theme you can copy, send, or symlink the `theme/` directory into the WordPress themes directory, giving the target theme folder the custom name you configured before


## Documentation

- You can find more information in the [Médula Wiki](https://github.com/andamira/medula/wiki)
- You could also take a look to the `theme/functions.php` file to get an idea on how the theme is structured, and follow the included files from there.


## Contributing

_This project is still going through strong changes. But feel free to [submit bugs & fixes](https://github.com/andamira/medula/issues)._


## Licenses

Original Code is licensed under the [MIT License](https://github.com/andamira/medula/blob/master/LICENSE.md).

