// TODO: put this file in Fractal core
import {
  mergeStates,
} from 'fractal-core'
declare const FuseBox

const customizedHMRPlugin = {
  hmrUpdate: data => {
    if (data.type === 'js') {
        FuseBox.flush()
        FuseBox.dynamic(data.path, data.content)
        if (FuseBox.mainFile && data.path === 'Root.js') {
          let m = FuseBox.import('./Root')
          ;(window as any).app.moduleAPI.reattach(m, mergeStates)
        } else {
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
