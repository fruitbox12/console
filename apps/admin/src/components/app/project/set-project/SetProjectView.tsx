import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import { Form, Field } from 'react-final-form';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withTranslation, WithTranslation } from 'react-i18next';

import { SetProjectView_project } from './__generated__/SetProjectView_project.graphql';
import styles from './Styles';
import { renderTextField } from '../../../common/react-final-form-components';

export interface Values {
  name?: string;
}

interface SetProjectViewProps extends WithTranslation {
  project?: SetProjectView_project;
  onCancelButtonClick: () => void;
  onSubmit: (values: Values) => void;
}

const requiredValidation = (value: string) => (value && value.trim() ? undefined : 'Required');

const SetProjectView: React.FC<SetProjectViewProps> = ({ t, onSubmit, onCancelButtonClick, project }) => {
  const classes = styles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {project ? t('updateProject.title') : t('createProject.title')}
        </Typography>
        <Form
          onSubmit={onSubmit}
          initialValues={{ name: project ? project.name : '' }}
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
                {project ? t('update.button') : t('create.button')}
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

export const CreateProjectView = withTranslation()(SetProjectView);

export const UpdateProjectView = createFragmentContainer(CreateProjectView, {
  project: graphql`
    fragment SetProjectView_project on Project {
      id
      name
    }
  `,
});
