import Root from './root'

describe('Root component', () => {

  describe('inputs', () => {

    it('should update the name', () => {
      let expected = ''
      let actual = ''
      expect(Root.name).toEqual('Root')
      expect(expected).toEqual(actual)
    })

  })

})
