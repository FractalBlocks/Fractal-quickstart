import { run } from 'fractal-core'
import { viewHandler } from 'fractal-core/interfaces/view'
import { styleHandler } from 'fractal-core/groups/style'
import { mergeStates } from 'fractal-core/utils/reattach' // DEV
import { warn, error } from 'fractal-core/utils/log' // DEV
import root from './root'

const app = run({
  root,
  groups: {
    style: styleHandler(),
  },
  interfaces: {
    view: viewHandler('#app'),
  },
  warn,
  error,
})

// Hot reload - DEV ONLY
if (module.hot) {
  module.hot.accept('./app', () => {
    let m = require('./app').default
    app.moduleAPI.reattach(m, mergeStates)
  })
}
