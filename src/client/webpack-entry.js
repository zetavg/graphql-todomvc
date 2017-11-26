import React from 'react'
import ReactDOM from 'react-dom'

import TodoApp from './TodoApp'

document.addEventListener('DOMContentLoaded', () => {
  if (!document.body) return

  ReactDOM.render(
    <TodoApp />,
    document.body.appendChild(document.createElement('div')),
  )
})
