const {
  FuseBox,
  SassPlugin,
  CSSPlugin,
  SVGPlugin,
  JSONPlugin,
  WebIndexPlugin,
  Sparky,
  QuantumPlugin,
  EnvPlugin,
} = require('fuse-box')

const express = require('express')
const path = require('path')
const {spawn} = require('child_process')
const TypeHelper = require('fuse-box-typechecker').TypeHelper

let fuse, app, vendor
let ENV = 'development'

const setupServer = server => {
  const app = server.httpServer.app
  app.use('/assets/', express.static(path.join(__dirname, 'assets')))
}

Sparky.task('config', () => {
  fuse = FuseBox.init({
    homeDir: 'app/',
    output: 'dist/$name.js',
    tsConfig : 'tsconfig.json',
    experimentalFeatures: true,
    useTypescriptCompiler: true,
    sourceMaps: ENV === 'development' ? { project: true, vendor: true } : false,
    cache: ENV === 'development',
    debug: true,
    log: true,
    plugins: [
      SVGPlugin(),
      CSSPlugin(),
      JSONPlugin(),
      EnvPlugin({ ENV }),
      WebIndexPlugin({
        path: '.',
        template: 'app/index.html',
      }),
      ENV === 'production' && QuantumPlugin({
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
Sparky.task('default', ['clean', 'config', 'copy-assets'], () => {
  fuse.dev({ port: 3000 }, setupServer)
  let typeHelper = TypeHelper({
    tsConfig: './tsconfig.json',
    basePath:'.',
    name: 'App typechecker',
  })
  app.watch().hmr().completed(proc => {
    console.log(`\x1b[36m%s\x1b[0m`, `client bundled`)
    typeHelper.runSync()
  })
  return fuse.run()
})

// wipe it all
Sparky.task('clean', () => Sparky.src('dist/*').clean('dist/'))
// wipe it all from .fusebox - cache dir
Sparky.task('clean-cache', () => Sparky.src('.fusebox/*').clean('.fusebox/'))

Sparky.task('copy-assets', () => {
  return Sparky.src('assets/').watch('assets/').dest('dist/$name')
})

// prod build
Sparky.task('set-production-env', () => ENV = 'production')
Sparky.task('dist', ['clean', 'clean-cache', 'set-production-env', 'config', 'copy-assets'], () => {
  fuse.dev({ port: 3000 }, setupServer)
  return fuse.run()
})
