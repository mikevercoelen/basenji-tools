import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

export default function createReducer (reducers) {
  return combineReducers({
    router,
    ...reducers
  })
}
