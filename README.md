# Fractal Quickstart

Super simple quickstart project for Fractal framework. Now we use :fire:[FuseBox](https://github.com/fuse-box/fuse-box):fire: as bundle/loader system, which allows a blazingly fast develelopment and production building. All this offer a super simple development and production environment, you can count de dev + prod dependencies of this repo in one hand!! there are only 4, see package.json

If you are looking for a fully featured solution with prerendering, SSR and i18n you should use [Fractal-featured](https://github.com/FractalBlocks/Fractal-quickstart/Fractal-featured)

Try this in [Glitch](https://glitch.com/edit/#!/tree-tank)

So you are here, this how you can use this repo:

- [download this repo](https://github.com/FractalBlocks/Fractal-quickstart/archive/master.zip)
- uncompress the downloaded file
- open the folder
- be sure you have [Node.js](https://nodejs.org/en/) installed
- open a command window
- type `npm i` and hit enter
- type `npm start` and visit [http://localhost:3000](http://localhost:3000) in your browser
- lets hack it! :heart:

Finally when you have some work done, type `npm run compile` and hit enter and your app should appear at the dist/ folder. This is it.

Follow our [tutorial here](https://github.com/FractalBlocks/Fractal/blob/master/docs/tutorial/readme.md).

## SVG icons bundling included

All icons are in assets/icons and are svg files with dash separated words. If you add some icon you should run `npm run bundle-icons` that use svg-join + svgo to bundle and optimize all icons into assets/icons-bundle.min.svg. Before that, you can use this icons with:

```html
<link rel="stylesheet" type="text/css" href="assets/icons-bundle.css" />
...
<svg class="svg_my-svg-file"><use xlink:href="icons-bundle.min.svg#my-svg-file"></svg>
<svg class="svg_my-svg-file2"><use xlink:href="icons-bundle.min.svg#my-svg-file2"></svg>
```

## Development environment

We strongly recommend [Visual Studio Code](https://code.visualstudio.com/) and use [fractal-vscode-extension](https://marketplace.visualstudio.com/items?itemName=carloslfu.fractal-vscode-extension) that provide many useful code snippets
