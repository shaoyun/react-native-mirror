import React from 'react'
import {Provider} from 'react-redux'

import {options} from './defaults'
import {models} from './model'
import {store, createStore, replaceReducer} from './store'

let started = false
let Root

export default function render(component, container, callback) {

  const {initialState, middlewares} = options

  if (started) {

    // If app has rendered, do `store.replaceReducer` to update store.
    replaceReducer(store, models)

    // Call `render` without arguments means *re-render*. Since store has updated,
    // `component` will automatically be updated, so no need to `ReactDOM.render` again.
    if (arguments.length === 0) {
      return Root
    }

  } else {
    createStore(models, initialState, middlewares)
  }

  // Use named function get a proper displayName
  Root = function Root() {
    return (
      <Provider store={store}>
        {component}
      </Provider>
    )
  }

  started = true
  
  return Root
}
