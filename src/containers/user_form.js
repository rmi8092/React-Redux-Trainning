import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import * as actions from '../actions/index.js'
import { getFormInputs, getSelectedUserType, getUser } from '../reducers/reducer'

var FontAwesome = require('react-fontawesome')

const submit = (submitProps, dispatch, ownProps) => {
  const userId = ownProps.initialValues ? ownProps.initialValues.id : null
  ownProps.createUser(ownProps.selectedUserType, userId, submitProps)
}

class UserForm extends Component {
  componentDidMount() {
    this.props.getFormInputs(this.props.selectedUserType)
  }

  goBack = () => {
    this.props.reset() // limpio el formulario
    this.context.router.push('/')
  }

  renderInputs = () => {
    let inputs = []
    this.props.formInputs.map((input) => {
      inputs.push(
        <div className="form__group" key={input.name}>
          <label for={input.name}>{input.label}</label>
          <Field
            name={input.name}
            component="input"
            type={input.type}
            placeholder={input.placeholder} />
        </div>
      )
    })
    return inputs
  }

  isAllFilled = () => {
    if (this.props.fieldWithValues) {
      let foundEmpty = true
      this.props.formInputs.map((input) => {
        foundEmpty = !this.props.fieldWithValues.hasOwnProperty(input.name) ? true : false
      })
      if (!foundEmpty) {
        return true
      } else {
        return false
      }
    }
    return false
  }

  render() {
    if (this.props.formInputs) {
      const { handleSubmit, pristine, submitting } = this.props
      let isAllFilled = this.isAllFilled()
      return (
        <form onSubmit={handleSubmit}>
          <div className="form__wrapper">
            <FontAwesome
              name="arrow-left"
              onClick={() => { this.goBack() }} />
            {this.renderInputs()}
            <p className="form__small-text">* Required files</p>
            <button
              type="submit"
              className={(isAllFilled) ? 'enabled' : ''}
              disabled={!isAllFilled || pristine || submitting}>
              Send</button>
          </div>
        </form>
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
    formInputs: getFormInputs(state),
    selectedUserType: getSelectedUserType(state),
    fieldWithValues: (state.form.UserForm) ? state.form.UserForm.values : null,
    initialValues: getUser(state)
  }
  return props
}

UserForm.contextTypes = {
  router: React.PropTypes.object
}

export default connect(mapStateToProps, actions)(reduxForm({ form: 'UserForm', onSubmit: submit })(UserForm))
