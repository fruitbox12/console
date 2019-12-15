import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Avatar, Typography } from '@material-ui/core';

import styles from './Styles';

const Profile = props => {
  const { className, profile, ...rest } = props;
  const classes = styles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar alt="Person" className={classes.avatar} component={RouterLink} to="/settings" />
      <Typography className={classes.name} variant="h4">
        {profile.name}
      </Typography>
      <Typography variant="body2">{profile.email}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

const mapStateToProps = state => ({ profile: state.oidc.user.profile });
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
