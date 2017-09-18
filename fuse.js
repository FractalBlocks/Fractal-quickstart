const {
  FuseBox,
  SassPlugin,
  CSSPlugin,
  SVGPlugin,
  JSONPlugin,
  WebIndexPlugin,
  Sparky,
  QuantumPlugin,
  EnvPlugin
} = require('fuse-box')

const express = require('express')
const path = require('path')
const {spawn} = require('child_process')

let fuse, app, vendor
let isProduction = false

const setupServer = server => {
  const app = server.httpServer.app
  app.use('/assets/', express.static(path.join(__dirname, 'assets')))
}

Sparky.task('config', () => {
  fuse = FuseBox.init({
    homeDir: 'app/',
    output: 'dist/$name.js',
    hash: isProduction,
    tsConfig : 'tsconfig.json',
    experimentalFeatures: true,
    useTypescriptCompiler: true,
    sourceMaps: !isProduction ? { project: true, vendor: true } : false,
    cache: !isProduction,
    plugins: [
      SVGPlugin(),
      CSSPlugin(),
      JSONPlugin(),
      EnvPlugin({ isProduction }),
      WebIndexPlugin({
        path: '.',
        template: 'app/index.html',
      }),
      isProduction && QuantumPlugin({
        treeshake: true,
        uglify: true,
      }),
    ],
  })

  // vendor
  vendor = fuse.bundle('vendor').instructions('~ index.ts')

  // bundle app
  app = fuse.bundle('app').instructions('> [index.ts]')

})

// main task
Sparky.task('default', ['clean', 'config'], () => {
  fuse.dev({ port: 3000 }, setupServer)
  app.watch().hmr()
  return fuse.run()
})

// wipe it all
Sparky.task('clean', () => Sparky.src('dist/*').clean('dist/'))
// wipe it all from .fusebox - cache dir
Sparky.task('clean-cache', () => Sparky.src('.fusebox/*').clean('.fusebox/'))

// prod build
Sparky.task('set-production-env', () => isProduction = true)
Sparky.task('dist', ['clean', 'clean-cache', 'set-production-env', 'config'], () => {
  fuse.dev({ port: 3000 }, setupServer)
  return fuse.run()
})
