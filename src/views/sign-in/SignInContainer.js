import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const SignInContainer = ({ userFound, history }) => {
  if (userFound) {
    history.push('/');
  }

  return <div></div>;
};

const mapStateToProps = state => ({
  userFound: !!state.oidc.user,
});

const mapDispatchToProps = () => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignInContainer));
