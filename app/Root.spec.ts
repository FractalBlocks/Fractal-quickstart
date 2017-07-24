import { run, Module, computeEvent, InputData } from 'fractal-core'
import { styleHandler } from 'fractal-core/groups/style'
import { VNode } from 'fractal-core/interfaces/view'

import * as Root from './Root'

describe('Root component', () => {

  describe('Actions', () => {

    describe('Toggle', () => {

      it('should toogle the state', () => {
        let expected = false
        let actual = Root.actions.Toggle()(true)
        expect(expected).toEqual(actual)

        expected = true
        actual = Root.actions.Toggle()(false)
        expect(expected).toEqual(actual)
      })

    })

  })

  function testView (cb: {(value: VNode): Promise<void>}): Promise<Module> {
    return run({
      root: Root,
      groups: {
        style: styleHandler(),
      },
      interfaces: {
        view: mod => ({
          state: undefined,
          handle: cb,
          dispose: () => {},
        }),
      },
    })
  }

  describe('Inputs', () => {

    describe('toggle', () => {

      it('should toogle the button text', async (done) => {
        let view: VNode
        let app = await testView(async newView => {
          if (!view) {
            let expected = 'Click me!!'
            let actual = (<VNode> newView.children[0]).text
            expect(expected).toEqual(actual)
          } else {
            let expected = 'nice!! :\')'
            let actual = (<VNode> newView.children[0]).text
            expect(expected).toEqual(actual)
            done()
          }
          view = newView
        })
        // perform a click over the button
        app.moduleAPI.dispatch(computeEvent({}, <InputData> (<VNode> view.children[0]).data.on.click))
      })

    })

  })


})
