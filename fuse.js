const {
  FuseBox,
  SVGPlugin,
  CSSPlugin,
  BabelPlugin,
  QuantumPlugin,
  WebIndexPlugin,
  EnvPlugin,
  Sparky,
} = require('fuse-box')

let fuse, app, vendor, isProduction

Sparky.task('config', () => {
  fuse = new FuseBox({
    homeDir: 'app/',
    sourceMaps: !isProduction,
    hash: isProduction,
    output: 'dist/$name.js',
    useTypescriptCompiler: true,
    experimentalFeatures: true,
    plugins: [
      SVGPlugin(),
      CSSPlugin(),
      EnvPlugin({ isProduction }),
      WebIndexPlugin({
        path: '.',
        template: 'app/index.html'
      }),
      isProduction && QuantumPlugin({
        treeshake: true,
        uglify: true
      })
    ]
  })
  // vendor
  vendor = fuse.bundle('vendor').instructions('~ index.ts')

  // bundle app
  app = fuse.bundle('app').instructions('> [index.ts]')
})

Sparky.task('default', ['clean', 'config'], () => {
  fuse.dev()
  // add dev instructions
  app.watch().hmr()
  return fuse.run()
})

Sparky.task('clean', () => Sparky.src('dist/').clean('dist/'))
Sparky.task('prod-env', ['clean'], () => { isProduction = true })
Sparky.task('dist', ['prod-env', 'config'], () => {
  // comment out to prevent dev server from running (left for the demo)
  fuse.dev()
  return fuse.run()
})
