import './styles.css'
import {
  run,
  // DEV
  logFns,
  mergeStates,
} from 'fractal-core'
import { viewHandler } from 'fractal-core/interfaces/view'
import { styleHandler } from 'fractal-core/groups/style'

import * as root from './Root'

declare const ENV: any

let DEV = ENV === 'development'

;(async () => {
  const app = await run({
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
    module.hot.accept('./Root', () => {
      let m = <any> require('./Root')
      app.moduleAPI.reattach(m, mergeStates)
    })
  }
})()
