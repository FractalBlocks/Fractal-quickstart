import { Component, ev } from 'fractal-core'
import { StyleGroup, absoluteCenter } from 'fractal-core/utils/style'
import h from 'snabbdom/h'

const name = 'Root'

const state = false

const inputs = ctx => ({
  toggle: () => actions.Toggle(),
})

const actions = {
  Toggle: () => s => !s,
}

const view = (ctx, state) => {
  let style = ctx.groups.style
  return h('div', {
    key: ctx.name,
    class: { [style.base]: true },
  }, [
    h('div', {
      class: {
        [style.button]: true,
        [style.buttonActive]: state,
      },
      on: {
        click: ev(ctx, 'toggle'),
      },
    }, state ? 'nice!! :\')' : 'Click me!!'),
  ])
}

const style: StyleGroup = {
  base: {
    width: '100%',
    height: '100%',
    overflow: 'auto',
    ...<any> absoluteCenter,
  },
  button: {
    width: '280px',
    height: '70px',
    margin: '20px',
    fontSize: '38px',
    borderRadius: '35px',
    color: 'white',
    backgroundColor: '#13A513',
    textAlign: 'center',
    transition: 'transform 0.4s',
    cursor: 'pointer',
    userSelect: 'none',
    ...<any> absoluteCenter,
    '&:hover': {
      color: 'white',
      backgroundColor: 'purple',
      border: '3px solid purple',
      transform: 'perspective(1px) scale(1.1)',
    },
  },
  buttonActive: {
    color: 'purple',
    backgroundColor: '#FBFBFB',
    border: '3px solid #13A513',
  },
}

const comp: Component = {
  name,
  groups: {
    style,
  },
  state,
  inputs,
  actions,
  interfaces: {
    view,
  },
}

export default comp
