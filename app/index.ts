import { run } from 'fractal-core'
import { viewHandler } from 'fractal-core/interfaces/view'
import { styleHandler } from 'fractal-core/groups/style'
import { warn, error } from 'fractal-core/utils/log' // DEV
import root from './root'

run({
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
