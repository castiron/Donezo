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



*Note*: Donezo the Elephant is our cute pet name for this script and we don't actually have an Elephant. If we did, we'd treat them with care and nutrition and only make them come to the office to keep us company.
