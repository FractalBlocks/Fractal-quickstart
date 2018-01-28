import {
  run,
  Component,
  // DEV
  logFns,
  RunModule,
} from 'fractal-core'
import { viewHandler } from 'fractal-core/interfaces/view'
import { styleHandler } from 'fractal-core/groups/style'

export const runModule: RunModule = (Root: Component<any>, DEV: boolean, viewCb?) => run({
  Root,
  log: DEV,
  record: DEV,
  groups: {
    style: styleHandler('', DEV),
  },
  interfaces: {
    view: viewHandler('#app', viewCb),
  },
...DEV ? logFns : {},
})
