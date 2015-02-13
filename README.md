# BMJ Living Style Guide

Our design guidelines in code.


## Requirements

To update the style guide you will require the following software installed:

* a Git client e.g. [Git for Windows](https://msysgit.github.io/) or [SourceTree](http://www.sourcetreeapp.com/download/)
* [Node.js](http://nodejs.org/download/) v0.10.0 or higher
* [Ruby](http://rubyinstaller.org/downloads/) v1.9.3 or higher

You also require the Node.js packages [Bower](http://bower.io/) and [Gulp](http://gulpjs.com/)  installed as global modules, this is done by running

```sh
npm install -g bower gulp
```

Finally, if [Bundler](http://bundler.io/) isn't installed, run

```sh
gem install bundler
```

from the command line.


## Installing

First clone the project's development branch into your projects folder into `living-style-guide-dev`, and then clone the `gh-pages` branch into `living-style-guide`:

```sh
C:\> cd C:\dev\projects
C:\dev\projects> git clone -b dev https://github.com/BMJ-Ltd/living-style-guide

C:\dev\projects> cd living-style-guide
C:\dev\projects\living-style-guide> git clone -b gh-pages https://github.com/BMJ-Ltd/living-style-guide dist
```

The style guide uses several external libraries which you need to install:

```sh
C:\dev\projects\living-style-guide> npm install
C:\dev\projects\living-style-guide> bower install
C:\dev\projects\living-style-guide> bundle install
```

This is all of the setup done!


#### Troubleshooting

```
MSBUILD : error MSB3428: Could not load the Visual C++ component "VCBuild.exe". 
```

If the `npm install` command halts with this error, first try this command

```sh
C:\dev\projects\living-style-guide> npm config set --global msvs_version 2013
```

and try again. If that fails, download and install the [MS build tools](http://www.microsoft.com/en-us/download/details.aspx?id=40760) and try again.

```
Gem::RemoteFetcher::FetchError: SSL_connect returned=1 errno=0 state=SSLv3 
read server certificate B: certificate verify failed
```

If this happens during `bundle install` then run

```sh
C:\dev\projects\living-style-guide> gem update --system
```

and try again.


## Developing

The folder `C:\dev\projects\living-style-guide\src` contains the source files for the style guide - HTML, stylesheets in SASS or CSS, JavaScript etc. This is where you do your editing.

The files for the style guide website are in `C:\dev\projects\living-style-guide\dist` folder  inside the project. Don't edit this folder directly!

#### Starting the build watcher

To start the build process run

```sh
C:\> cd C:\dev\projects\living-style-guide
C:\dev\projects\living-style-guide> gulp
```

To stop it press `Control+C`.

The build process itself does:

1. read the source files in `src`
2. do any necessary processing e.g. compile SASS into CSS, minimise scripts
3. updates `dist` with the changes
4. opens the style guide in your browser, or refresh the page if it is already open  

Once the initial build is done, the build process will keep running to watch for changes to any files in `src`, and trigger a new build when a file is updated. 

#### Workflow

1. Start the build process
2. Edit file in `src`, save changes
3. The watcher process notices the saved file, triggers the build
4. Build finishes and updates `dist` with the new files
5. Style guide is refreshed in the browser with your changes

#### Updating your local project from Github

1. Stop any running build process
2. Pull from Github
3. Restart the build process

```sh
C:\dev\projects\living-style-guide> git pull
C:\dev\projects\living-style-guide> gulp
```

#### Saving your work

Simply commit your local changes and push to Github.

```sh
C:\dev\projects\living-style-guide> git push
```

This will update the `dev` branch.

#### Updating the live site

This requires pushing from within the `dist` folder:

```sh
C:\dev\projects\living-style-guide> cd dist
C:\dev\projects\living-style-guide> git commit -am "MESSAGE"
C:\dev\projects\living-style-guide> git push
C:\dev\projects\living-style-guide> cd ..
```

This will update the `gh-pages` branch that the live site uses.


## External libraries

This style guide uses the following projects:

* [Bootflat](http://bootflat.github.io/)
* [AngularIcons](https://github.com/kentdoppelganger/angularicons)
* [Font Awesome](http://fontawesome.io/)
* [iCheck](http://fronteed.com/iCheck/)
* [Stepper](http://formstone.it/components/stepper) and [Selector](http://formstone.it/components/selecter)


### License

The BMJ Living Style Guide is licensed under the MIT Open Source license. For more information, please see the LICENSE file in this repository.
