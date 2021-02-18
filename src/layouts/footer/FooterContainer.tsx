import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { withTranslation, WithTranslation } from 'react-i18next';

import Copyright from './Copyright';

export default withTranslation()(
  React.memo<WithTranslation>(({ t }) => {
    return (
      <Container maxWidth="sm">
        <Typography variant="body2" color="textSecondary">
          {t('edgeCloud.title')}: {window._env_.VERSION}
        </Typography>
        <Copyright />
      </Container>
    );
  }),
);
