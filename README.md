KIRIN
=====

This is a desktop application for MCS(or applications based on MCS) development. Basically, KIRIN offers end-user a easy way to compile, deploy, test their MCS(or based) applications.

## Getting Started(development)

This project requires stable [Node.js](http://nodejs.org/) versions `>= 0.8.0`, the [Node.js](http://nodejs.org/) package manager as development environment, and [Ruby](http://www.ruby-lang.org/). Please be aware of that.

And all the guide described below are based on windows 7 OS.

<b>[Git](http://git-scm.com/downloads)</b> v1.8.0(or above) as  version control system.

<b>[Ruby](http://www.ruby-lang.org/)</b> v1.9.3(or above) as sass runtime environment.

<b>[Grunt](http://gruntjs.com/)</b> v0.4.1(or above) as development lifecycle controller and its corresponding plugins should be installed and managed via [npm](https://npmjs.org/).

<b>[Bower](http://bower.io/)</b> v1.2.7(or above) as project dependency manager should be installed via [npm](https://npmjs.org/).

<b>[Sass](http://sass-lang.com/)</b> v3.2.12(or above) as CSS extension language.

<b>[Node-webkit](https://github.com/rogerwang/node-webkit)</b> v0.8.0(or above) as desktop engine for rendering purpose.

<b>[Livereload](http://livereload.com/)</b> v2.0.8(or above) as debug assistant for each browser.

### Environment setup

#### [Sublime Text2](http://www.sublimetext.com/)(Recommended IDE) configuration

Install [Package Control](https://sublime.wbond.net/), refer to [Installation Guide](https://sublime.wbond.net/installation).

Install [Emmet](http://emmet.io/), refer to [Installation Guide](https://github.com/sergeche/emmet-sublime#how-to-install).

Install [AdvancedNewFile](https://github.com/skuroda/Sublime-AdvancedNewFile), refer to [Installation Guide](https://github.com/skuroda/Sublime-AdvancedNewFile#installation).

Install [jsFormat](https://github.com/jdc0589/JsFormat), refer to [Installation Guide](https://github.com/jdc0589/JsFormat#install).

Install [AngularJS](https://github.com/angular-ui/AngularJS-sublime-package), refer to [Installation Guide](https://github.com/angular-ui/AngularJS-sublime-package#installation-options).

Install [Sass](https://github.com/nathos/sass-textmate-bundle), refer to [Installation Guide](https://github.com/nathos/sass-textmate-bundle#sublime-text-2-installation).

1. Open sublime text2.
2. Click `Preferences` -> `Settings - User` to open the setting file.
3. Copy following configuration to the opened setting file:

```JSON
{
    "color_scheme": "Packages/Color Scheme - Default/Blackboard.tmTheme",
    "font_size": 13,
    "ignored_packages": [
        "Vintage"
    ],
    "tab_size": 4,
    "translate_tabs_to_spaces": true,
    "use_tab_stops": false,
    "detect_indentation": true,
    "auto_indent": true,
    "smart_indent": true,
    "default_encoding": "UTF-8"
}
```

#### Livereload addon installation

Install [Livereload](http://livereload.com/), refer to [Installation Guide](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-).

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

Note: `name` and `email` should be modified manually.

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

#### Install Sass

Install [Ruby](http://rubyinstaller.org/downloads)
Add Ruby executables to your PATH
Open Start Command Prompt with Ruby and run following command:

```shell
gem install sass
```

#### Install project dependencies

Run following command in Git Bash and the root folder of KIRIN project:

```shell
bower install
```

Above command will only install the dependencies defined with `dependencies` attribute in `bower.json`.

Note: Once you meet error `ENORESTARGET No tag found that was able to satisfy` with above command, it might be caused by chinese network. Type `git config --global url."https://".insteadOf git://` in git bash. And try again.

#### Development without `nodejs` features

If you are working on some features which has nothing to do with `nodejs`, it's better to debug your code in browser.

To debug with browser, it requires you to install [livereload](http://livereload.com/) addon for the browsers.

#### Debug

* `grunt`, execute `default` task. Compile source code to `%root_folder%/build/generated/` folder, and start up a local server on `127.0.0.1:9898`. Open a browser which you have `livereload` addon installed, visite the url `http://127.0.0.1:9898/`, and enable the `livereload` addon. Once you change the source code, the browser will be refreshed automatically.
* `grunt exei` execute `exei` task. Exe file created in `%root_folder%/build/releases/KIRIN/win/KIRIN/` folder.
* `grunt exee` execute `exee` task. The same as above, but different `node-webkit` server.
* `grunt dist` execute `dist` task. The same as `default` task. But minified source code.
* `grunt disti` execute `disti` task. The same as `exei` task. But minified source code.
* `grunt diste` execute `diste` task. The same as above, but different `node-webkit` server.

