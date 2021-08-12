import App from './App'

let app: JSX.Element
describe('App Test', () => {
  beforeAll(() => (app = <App />))

  it('to be rendered', () => {
    expect(app).toBeDefined()
  })
})
