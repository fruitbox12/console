import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Typography, Link } from '@material-ui/core';

import styles from './Styles';

const Footer = props => {
  const { className, ...rest } = props;

  const classes = styles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography variant="body1">
        &copy;{' '}
        <Link component="a" href="http://micro-business.co.nz/" target="_blank">
          Micro Business Ltd
        </Link>
        . 2019
      </Typography>
      <Typography variant="caption">Created with love</Typography>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
