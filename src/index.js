import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import 'normalize.css/normalize.css'
import { GlobalStyles } from './globalStyles'

ReactDOM.render(
  <Router>
    <App />
    <GlobalStyles />
  </Router>,
  document.getElementById('root')
)
