import {
  mergeStates,
} from 'fractal-core'

declare const FuseBox

if (!process.env.isProduction) {

  const customizedHMRPlugin = {
    hmrUpdate: data => {
      if (data.type === 'js') {
          FuseBox.flush()
          FuseBox.dynamic(data.path, data.content)
          let newMod = FuseBox.import(data.path)
          if (FuseBox.mainFile && newMod.name && newMod.hasOwnProperty('state') && newMod.interfaces) {
            let Root = FuseBox.import('./Root')
            ;(window as any).app.moduleAPI.reattach(Root, mergeStates)
          } else if (FuseBox.mainFile) {
            FuseBox.import(FuseBox.mainFile)
          }
          return true
      }
    }
  }

  if (!process.env.hmrRegistered) {
    process.env.hmrRegistered = <any> false
    FuseBox.addPlugin(customizedHMRPlugin)
  }

}

