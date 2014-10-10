living-style-guide
==================

Our design guidelines in code.


### Installation of dev site

Clone the Living Style guide using Sourcetree using the clone URL - https://github.com/BMJ-Ltd/living-style-guide.git 
Clone the site into a folder on your C:drive named living-style-guide-dev

Then, in the command line go to the directory you have created on your c:drive (mine is C:\Users\aasante\Documents\GitHub\living-style-guide-dev for example):

```sh
cd living-style-guide-dev
```
If you don't have [Bower](http://bower.io/) installed, install it using:

```sh
npm install -g bower
```
The run the following commands:

```sh
npm install
bower install
```


### Usage

From the `living-style-guide-dev` directory run:

```sh
gulp
```

This will build the project to the `dist` sub-directory, and then watch for changes made to the contents of `src` and automatically rebuild `dist`.


To update you dev changes onto the live site you will need to copy the contents of you `dist` file ONLY into another directory called 'living-style-guide-live' which needs to be set up to push to the 'gh-pages' directory in git
