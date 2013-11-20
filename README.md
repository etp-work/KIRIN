KIRIN
=====

This is a desktop application for MCS(or applications based on MCS) development. Basically, KIRIN offers end-user a easy way to compile, deploy, test their MCS(or based) applications.

## Getting Started(development)

This project requires stable [Node.js](http://nodejs.org/) versions `>= 0.8.0` and the [Node.js](http://nodejs.org/) package manager as development environment. Please be aware of that.

And all the guide described below are based on windows 7 OS.

<b>[Git](http://git-scm.com/downloads)</b> v1.8.0(or above) as  version control system.

<b>[Grunt](http://gruntjs.com/)</b> v0.4.1(or above) as development lifecycle controller and its corresponding plugins should be installed and managed via [npm](https://npmjs.org/).

<b>[Bower](http://bower.io/)</b> v1.2.7(or above) as project dependency manager should be installed via [npm](https://npmjs.org/).

<b>[Node-webkit](https://github.com/rogerwang/node-webkit)</b> v0.8.0(or above) as desktop engine for rendering purpose.

### Environment setup

#### Git configuration

Run following command in Git Bash and the root folder of KIRIN project:

```shell
git config --local user.name "<name>"
git config --local user.email "<email>"
git config --local core.excludesfile $HOME/.gitignore
git config --local core.autocrlf input
git config --local color.ui true
git config --local gui.encoding utf-8
git config --local push.default tracking
git config --local branch.autosetupmerge always
git config --local branch.autosetuprebase always
git config --local alias.co checkout
git config --local alias.st status
git config --local alias.br branch
```

#### Install Grunt Command Line Interface

Run following command in Git Bash:

```shell
npm install -g grunt-cli
```

This will put the `grunt` command in your system path, allowing it to be run from any directory.

Note that installing `grunt-cli` does not install the Grunt task runner! The job of the Grunt CLI is simple: run the version of Grunt which has been installed next to a `Gruntfile`. This allows multiple versions of Grunt to be installed on the same machine simultaneously.

#### Install Bower

Run following command in Git Bash:

```shell
npm install -g bower
```

Also make sure that git is installed as some bower packages require it to be fetched and installed.

#### Install Grunt and Grunt plugins

Run following command in Git Bash and the root folder of KIRIN project:

```shell
npm install
```

Note: above command will only install the modules defined with `devDependencies` attribute in `package.json`.

#### Install project dependencies

Run following command in Git Bash and the root folder of KIRIN project:

```shell
bower install
```

Note: above command will only install the dependencies defined with `dependencies` attribute in `bower.json`.

#### Generate KIRIN .exe application

Run following command in Git Bash and the root folder of KIRIN project:

```shell
grunt
```

Note: this will execute the default task defined in `Gruntfile.js`.

The generated `.exe` file locate in `%root_folder%/build/releases/KIRIN/win/KIRIN/`. Double click `KIRIN.exe` to launch it.


