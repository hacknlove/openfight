# OpenFight v1.0.0 WIP

# Introduction

The main goal of this project is to be as easily customizable as possible, so every community (nation, city, or whatever) that needs an application allow their members to have access to quick an auto-diagnosis tool, and at the same time that allows the community to gather big-data around the propagation of the disease, could just adapt the tests, symptoms and formulas to their own needs, without having to develop a whole thing from scratch.

All the texts are placed in the folder `translations/` where there is a folder for each view, and other more for the common things.

The language picker is configured in `config/languages.js`, there you can select the available languages, and the url correspondant to each view.

The symptoms are configured in `config/symptoms.js`, currently there are only two types of components, select and slider.

The file `config/diagnosis.js` manage how the diagnosis is computed.

In the file `config/bigData.js` will be placed the settings on how the data is shared.

The style can be tuned with the files `config/pre-style.sass` that is loaded before any other `.sass` and can be used to initialize bulma variables, and the file `config/post-style.sass` that is the last `sass` loaded so you can override whatever you want.

The assets, like logos, images and fonts, go in the folder `public`

With all this, I hope you do not need to go to `src/` and work with the main code. Bou if you do that, you are very welcome to bring your improvements back, so more people can enjoy them.

# Local deployment, for development.

Please calm. I'm still working on the code and the documentation.
