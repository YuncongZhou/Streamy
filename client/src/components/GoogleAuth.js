import React from 'react'

class GoogleAuth extends React.Component {
  state = { isSignedIn: null }

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: '14470379926-1ijc8c6t1rto236d5vh64mgiviojar34.apps.googleusercontent.com',
          scope: 'email',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance()
          this.setState({ isSignedIn: this.auth.isSignedIn.get() })
          this.auth.isSignedIn.listen(this.onAuthChange)
        })
    })
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() })
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
    if (this.state.isSignedIn === null) {
      return null
    } else if (this.state.isSignedIn) {
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

export default GoogleAuth
