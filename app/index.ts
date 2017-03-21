import { run } from 'fractal-core'
import { viewHandler } from 'fractal-core/interfaces/view'
import { styleHandler } from 'fractal-core/groups/style'
import { mergeStates } from 'fractal-core/utils/reattach' // DEV
import { logFns } from 'fractal-core/utils/log' // DEV
import root from './root'

declare const ENV: any

let DEV = ENV === 'development'

const app = run({
  root,
  groups: {
    style: styleHandler('', DEV),
  },
  interfaces: {
    view: viewHandler('#app'),
  },
  ...DEV ? logFns : {},
})

// Hot reload - DEV ONLY
if (module.hot) {
  module.hot.accept('./root', () => {
    let m = (<any> require('./root')).default
    app.moduleAPI.reattach(m, mergeStates)
  })
}
