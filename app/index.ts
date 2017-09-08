import './hmr'
import './assets/icons-bundle.css'
import './styles.css'
import { runModule } from './module'
import * as root from './Root'

let DEV = !process.env.isProduction

;(async () => {
  ;(window as any).app = await runModule(root, DEV)
})()
