# Donezo
Donezo the Elephant wants to make it easier to use icon-fonts. Put your icon fonts in a bundle and Donezo will cheerfully generate some scss for you.

## Elephants Do What?
At CIC we often use icomoon.io to generate crisp icon font files from a folder of SVGs. If we plan to use those font-files through SASS/SCSS, someone typically puts together an `_icons.scss`,
with all of the variables listed out with their hex-codes, and some utility mixins to use those icons by name.

This isn't a big hassle if the developer only has to do it once, but that's almost never the case, and keeping all the hex-codes in order quickly becomes needlessly time-consuming way to practice hexadecimal counting.
So we asked our pet Elephant for help. It's fall after all, and they were getting cold playing in the river all day.

Donezo is a script that makes use of a very small JSON configuration file to geneate SCSS whenever you update the icon-fonts in your project.
It does this by looking at the .svg file you get from icomoon, which, aside from node and stuff, is all Donezo really needs to work.

Sample config and in-depth Elephant training guide coming soon.

## Installation
Donezo is almost ready for NPM. Until then, install Donezo manually by adding this repo with `yarn add castiron/donezo`. You can also manually add it to your `package.json` and then run `yarn install` or `npm install`.
```
"dependencies": {
  "donezo": "castiron/donezo"
}
```

### Make that Icon Font
Before you configure Donezo for your project, go ahead and make an icon font using [icomoon.io](http://icomoon.io). Even if it's a sample one, the config will make more sense if you have all the files, and we can test it right away.

Once you have the font downloaded, make sure the .svg file from icomoon and all the font files you want to use (ttf, woff, etc.) are in your project where you plan on including them. Typically we also rename the fonts from `icomoon.ext` to something like `proj-icons.ext` where `proj` is the name of the project.

Donezo will be configured to know about these files, and will need to be reconfigured if the location of these files change.

### Config
Next, we'll need a `.donezo-config.json` file in the root of the project. Copy `.donezo-config.json.sample` from this repo and remove the `.sample` in the filename to start with the base template, then fill out the config options for your project.

Note that most of the config is required and will change from project to project.

**fontFile** _(Required)_
The location of the icon font's `.svg` file in your project. Donezo uses this to build your scss.

**stylesFile** _(Required)_
Where Donezo will save your `.scss` file.

**fontName** _(Required)_
The name you want to assign your font in the generated `.scss` file. It should be the same as the filename of the fonts you're embedding, without the file extension.

**fontPath** _(Required)_
This is the **relative** path from your `.scss` file to where your icon fonts are located. For instance, in a structure where you have
```
  styles/
    styles.scss
    icons.scss <-- this is the generated file
  fonts/
    proj-icons.ttf
    proj-icons.woff
```
The `fontPath` value would be `../fonts/`, since it's the relative path from icons.scss to your font files. In the future, Donezo will be updated to assume your fonts are in the same directory as your `.svg` file if you don't enter something here. But for now, please do!

**variablePrefix** _(Optional)_
String to prefix to all of your icon variables. For instance, if you use `'proj-'` as a parameter, all of the icon variable names will look like `$proj-arrow`, `$proj-hamburger` and so on in the generated file.

**dashToCamelCase** _(Optional)_
Converts dash separated icon file names: `arrow-right-short.svg` to camel cased variable names `$arrowRightShort`.

By default, the variables used to represent your icons will be the same as the original .svg files you used to build the font in icomoon (without the .svg extension). So if you make an icon called `arrow-right-short.svg`, the icon variable will be output as `$arrow-right-short`.

At CIC, we tend to use use snake-case for file names and camelCase for variables, so this parameter comes in handy for that.

**outputFontFace** _(Optional)_
Outputs the `@font-face` css to include the font on your site. Recommended to set as true unless you're doing this elsewhere.

**outputMixins** _(Optional)_
At CIC, we use a couple of mixins to place icons as pseudo elements on almost every project. Set this to true to declare these mixins in your generated icon scss. Recommended unless you are declaring these or similar mixins elsewhere.

**useRailsFontPath** _(Optional)_
Use Rails `font-path` url helper in generated icons scss. Only necessary on Rails projects.


## Try it Out
Once Donezo is configured, just run `donezo` in the root directory and your icon scss file will


*Note*: Donezo the Elephant is our cute pet name for this script and we don't actually have an Elephant. If we did, we'd treat them with care and nutrition and only make them come to the office to keep us company.

### Todo
- Make a cute ascii Elephant to show up in the terminal when Donezo is done running.
- Write a `donezo -g` or `--generate` script to generate the config using mostly yes or no questions.
