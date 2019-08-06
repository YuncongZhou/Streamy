import React from 'react'
import { connect } from 'react-redux'
import { signIn, signOut } from '../actions'

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: '14470379926-1ijc8c6t1rto236d5vh64mgiviojar34.apps.googleusercontent.com',
          scope: 'email',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance()
          this.onAuthChange(this.auth.isSignedIn.get())
          this.auth.isSignedIn.listen(this.onAuthChange)
        })
    })
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId())
    } else {
      this.props.signOut(this.auth.currentUser.get().getId())
    }
  }

  onSignInClick = () => {
    this.auth.signIn()
  }

  onSignOutClick = () => {
    this.auth.signOut()
  }

  renderAuthButton() {
    let signInText = ''
    let onClickFunc = null
    if (this.props.isSignedIn === null) {
      return null
    } else if (this.props.isSignedIn) {
      signInText = 'Sign Out'
      onClickFunc = this.onSignOutClick
    } else {
      signInText = 'Sign In With Google'
      onClickFunc = this.onSignInClick
    }
    return (
      <button className='ui red google button' onClick={onClickFunc}>
        <i className='google icon' />
        {signInText}
      </button>
    )
  }

  render() {
    return <div>{this.renderAuthButton()}</div>
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn }
}

export default connect(
  mapStateToProps,
  { signIn, signOut },
)(GoogleAuth)
