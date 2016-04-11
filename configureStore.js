import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'

export default function configureStore (initialState = {}, history, options) {
  const ducks = require('ducks')

  const customMiddleware = options.middleware || []

  let realMiddleware = [
    thunk,
    promiseMiddleware,
    routerMiddleware(history),
    ...customMiddleware
  ]

  let middleware = applyMiddleware(...realMiddleware)

  if (__DEBUG__) {
    if (window.devToolsExtension) {
      middleware = compose(middleware, window.devToolsExtension())
    }
  }

  const store = middleware(createStore)(ducks, initialState)

  if (__DEV__) {
    if (module.hot) {
      module.hot.accept('ducks', () => {
        const nextRootReducer = require('ducks').default
        store.replaceReducer(nextRootReducer)
      })
    }
  }

  return store
}
