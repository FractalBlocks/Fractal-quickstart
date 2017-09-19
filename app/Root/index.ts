import {
  Actions,
  Inputs,
  Interfaces,
  StyleGroup,
  absoluteCenter,
} from 'fractal-core'
import { View, h } from 'fractal-core/interfaces/view'

export const name = 'Root'

export const state = {
  active: false,
}

export type S = typeof state

export const inputs: Inputs<S> = ({}) => ({
  toggle: async () => actions.Toggle(),
})

export const actions: Actions<S> = {
  Toggle: () => s => {
    s.active = !s.active
    return s
  },
}

const view: View<S> = ({ ctx, ev }) => s => {
  let style = ctx.groups.style

  return h('div', {
    key: ctx.name,
    class: { [style.base]: true },
  }, [
    h('div', {
      class: {
        [style.button]: true,
        [style.buttonActive]: s.active,
      },
      on: {
        click: ev('toggle'),
      },
    }, s.active ? 'nice!! :\')' : 'Click me!!'),
  ])
}

export const interfaces: Interfaces = { view }

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
    transition: 'transform .4s, background .2s',
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

export const groups = { style }
