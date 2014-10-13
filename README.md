# BMJ Living Style Guide

Our design guidelines in code.


### Installation

Run the following commands from the command line to get this project, or clone the Living Style guide using Sourcetree:

```sh
cd C:\dev\projects
git clone https://github.com/BMJ-Ltd/living-style-guide
cd living-style-guide
```

If you don't have [Bower](http://bower.io/) installed already, install it using:

```sh
npm install -g bower
```

Finally run the following commands to install all of the packages used by the style guide (see [below](#external-libraries) for list):

```sh
npm install
bower install
```


### Usage

From the `living-style-guide` directory run:

```sh
gulp
```

This will build the project to the `dist` sub-directory, and then watch for changes made to the contents of `src` and automatically rebuild `dist` each time. Press `Control+C` to stop the watch process.

Running

```sh
gulp clean
```

will completely remove the `dist` directory if you would like to build it from scratch.


### External libraries

This style guide uses the following projects:

* [Bootflat](http://bootflat.github.io/)
* [AngularIcons](https://github.com/kentdoppelganger/angularicons)
* [Font Awesome](http://fontawesome.io/)
* [iCheck](http://fronteed.com/iCheck/)
* [Stepper](http://formstone.it/components/stepper) and [Selector](http://formstone.it/components/selecter)


### License

The BMJ Living Style Guide is licensed under the MIT Open Source license. For more information, please see the LICENSE file in this repository.
