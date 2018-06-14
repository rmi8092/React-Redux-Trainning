import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAdvantagesList, getUser } from '../reducers/reducer'
import * as actions from '../actions/index.js'
var FontAwesome = require('react-fontawesome')

class WelcomePage extends Component {
    componentDidMount() {
        if (!(this.props.advantagesList) && (this.props.user)) {
            this.props.getAdvantagesList(this.props.user.userType)
        }
    }

    goBack = () => {
        this.context.router.push('/form')
    }

    goHome = () => {
        this.context.router.push('/')
    }

    renderAdvantages = () => {
        let advantages = []
        this.props.advantagesList.map((advantage) => {
            advantages.push(
                <li key={advantage.id}
                    className="advantages__item">
                    <FontAwesome name='check-circle' />
                    <span className="advantages__gift">{advantage.description}</span>
                </li>
            )
        })
        return advantages
    }

    render() {
        if (this.props.advantagesList) {
            return (
                <div className="welcome__wrapper">
                    <FontAwesome
                        name="arrow-left"
                        onClick={() => { this.goBack() }} />
                    <div className="welcome__top">
                        <FontAwesome name='check-circle' />
                        <div className="welcome__message">¡welcome {this.props.user.name}!</div>
                    </div>
                    <div className="welcome__advantages">
                        <div className="advantages__title">Advantages</div>
                        <ul className="advantages__list">
                            {this.renderAdvantages()}
                        </ul>
                    </div>
                    <button onClick={() => { this.goHome() }}>continue</button>
                </div>
            );
        }
        else {
            return (
                <div>Loading ...</div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    const props = {
        advantagesList: getAdvantagesList(state),
        user: getUser(state)
    }
    return props
}

WelcomePage.contextTypes = {
    router: React.PropTypes.object
}

export default connect(mapStateToProps, actions)(WelcomePage)