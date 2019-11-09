import React, { Component } from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import { RelayEnvironment } from '../../framework/relay';
import SignInRelayContainer from './SignInRelayContainer';

class SignIn extends Component {
  renderRelayComponent = ({ props, error }) => {
    if (props && props.user) {
      return <SignInRelayContainer user={props.user} />;
    } else if (error) {
      return <div>{error.message}</div>;
    }

    return <div>Loading</div>;
  };

  render = () => {
    return (
      <QueryRenderer
        environment={RelayEnvironment}
        query={graphql`
          query SignInQuery {
            user {
              ...SignInRelayContainer_user
            }
          }
        `}
        variables={{}}
        render={this.renderRelayComponent}
      />
    );
  };
}

export default SignIn;
