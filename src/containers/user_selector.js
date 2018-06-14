import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/index.js'
import { getUserTypes, getSelectedUserType } from '../reducers/reducer'

class UserSelector extends Component {
  componentDidMount () {
    if (!this.props.userTypes) {
      this.props.getUserType()
    }
  }

  selectUserType = (userType) => {
    this.props.selectUserType(userType.code) // lo tengo porque en connect le paso todas las acciones
    this.context.router.push('/form')
  }

  renderItems = () => {
    let items = []
    this.props.userTypes.map((userType) => {
      let selectedClass = ((this.props.selectedUserType) && (this.props.selectedUserType === userType.code)) ? 'selected' : ''
      items.push(
        <li key={userType.code}
          className={'selector__item ' + selectedClass}
          onClick={() => { this.selectUserType(userType) }}>
          <span className="item__radio" id={userType.name}></span>
          <span className="item__label">{userType.description}</span>
        </li>
      )
    })
    return items
  }

  render () {
    if (this.props.userTypes) {
      return (
        <div className="signup">
          <div className="app__subtitle">What kind of user are you?</div>
          <ul className="selector__list">
            {this.renderItems()}
          </ul>
          <p className="signup__small-text">Enjoy a 10% discount on your reservation just for signup</p>
          <a className="signup__small-text signup__login" href>Are you registered?</a>
        </div>
      )
    } else {
      return (
        <div>Loading ...</div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  const props = {
    userTypes: getUserTypes(state),
    selectedUserType: getSelectedUserType(state)
  }
  return props
}

UserSelector.contextTypes = {
  router: React.PropTypes.object
}

export default connect(mapStateToProps, actions)(UserSelector)
