import React from 'react'
import {connect} from 'react-redux';
import {signIn, signOut} from '../actions';
// const {google} = require('googleapis');
// const OAuth2Client =google.auth.OAuth2;

class GoogleAuth extends React.Component {

  // state = { isSignedIn: null }

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: '913794406013-oifnvfi5mj08h74l7r6svhldtt6n9rav.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          // this.setState({ isSignedIn: this.auth.isSignedIn.get() })
          this.onAuthChange(this.auth.isSignedIn.get())
          this.gapi.auth2.getAuthInstance().listen(this.onAuthChange)
      });
    });
  }

  // onAuthChange = () => {
  //   this.setState({ isSignedIn: this.auth.isSignedIn.get()})
  // }
  onAuthChange = (isSignedIn) => {
    if(isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  }


  renderAuthButton() {
    if(this.props.isSignedIn === null) {
      return null
    } else if(this.props.isSignedIn) {
     return (
      <button onClick={this.onSignOutClick} className="ui red google button">
        <i className="google icon"></i>
        Sign Out
      </button>
     );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon"></i>
          Sign In with Google
        </button>
      );
    }
  }


  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  render() {
    return (
      <div>{this.renderAuthButton()}</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //now the value of isSignedIn gonna be either null, true or false
    isSignedIn: state.auth.isSignedIn
  }
}

export default connect(mapStateToProps, { signIn, signOut})(GoogleAuth);