import React, { Component } from 'react'
var FontAwesome = require('react-fontawesome')

export default class App extends Component {
  goHome = () => {
    this.context.router.push('/')
  }

  render () {
    return (
      <div className="app__wrapper">
        <div className="app__title">
          <FontAwesome name="times" onClick={() => { this.goHome() }}></FontAwesome>
          Sign Up
        </div>
        {this.props.children}
      </div>
    )
  }
}

App.contextTypes = {
  router: React.PropTypes.object
}
