import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import { Form, Field } from 'react-final-form';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withTranslation, WithTranslation } from 'react-i18next';

import { SetTenantView_tenant } from './__generated__/SetTenantView_tenant.graphql';
import styles from './Styles';
import { renderTextField } from '../../../common/react-final-form-components';

export interface Values {
  name?: string;
}

interface SetTenantViewProps extends WithTranslation {
  tenant?: SetTenantView_tenant;
  onCancelButtonClick: () => void;
  onSubmit: (values: Values) => void;
}

const requiredValidation = (value: string) => (value && value.trim() ? undefined : 'Required');

const SetTenantView: React.FC<SetTenantViewProps> = ({ t, onSubmit, onCancelButtonClick, tenant }) => {
  const classes = styles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {tenant ? t('updateTenant.title') : t('createTenant.title')}
        </Typography>
        <Form
          onSubmit={onSubmit}
          initialValues={{ name: tenant ? tenant.name : '' }}
          render={({ handleSubmit, form, submitting, invalid }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <Field<string>
                  name="name"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  placeholder={t('name.label')}
                  component={renderTextField}
                  autoFocus
                  validate={requiredValidation}
                />
              </div>
              <Button type="submit" variant="contained" color="primary" className={classes.submit} disabled={submitting || invalid}>
                {tenant ? t('update.button') : t('create.button')}
              </Button>
              <Button
                type="button"
                variant="contained"
                color="secondary"
                className={classes.submit}
                disabled={submitting}
                onClick={onCancelButtonClick}
              >
                {t('cancel.button')}
              </Button>
            </form>
          )}
        />
      </div>
    </Container>
  );
};

export const CreateTenantView = withTranslation()(SetTenantView);

export const UpdateTenantView = createFragmentContainer(CreateTenantView, {
  tenant: graphql`
    fragment SetTenantView_tenant on Tenant {
      id
      name
    }
  `,
});
