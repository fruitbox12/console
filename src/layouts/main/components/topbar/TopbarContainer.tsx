import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withTranslation, WithTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import styles from './Styles';
import Topbar from './Topbar';
import ProjectSelector from '../../../../components/app/project/project-selector';
import { selectState as globalSelectState } from '../../../../framework/redux/GlobalSlice';

interface TopbarContainerProps extends WithTranslation {
  open: boolean;
  onDrawerOpen: () => void;
}

const TopbarContainer = React.memo<
  TopbarContainerProps &
    RouteComponentProps<{
      projectID?: string;
    }>
>(
  ({
    t,
    history,
    open,
    onDrawerOpen,
    match: {
      params: { projectID },
    },
  }) => {
    const classes = styles();
    const { user } = useAuth0();
    const { picture } = user;
    const [openSelectProject, setSelectProjectOpen] = useState(false);
    let { currentSelectedProject } = useSelector(globalSelectState);

    if (!projectID) {
      currentSelectedProject = undefined;
    } else if (currentSelectedProject && currentSelectedProject.projectID !== projectID) {
      currentSelectedProject = undefined;
    }

    const handleSelectProjectOpenClick = () => {
      setSelectProjectOpen(true);
    };

    const handleSelectProjectCloseClick = () => {
      setSelectProjectOpen(false);
    };

    const handleProjectSelectorSelectedProject = (id: string) => {
      handleSelectProjectCloseClick();
      history.push(`/${id}/dashboard`);
    };

    const handleNewProjectClick = () => {
      history.push('/project/create');
    };

    return (
      <React.Fragment>
        <Topbar
          drawerOpen={open}
          onDrawerOpen={onDrawerOpen}
          pictureUrl={picture}
          onSelectProjectClick={handleSelectProjectOpenClick}
          project={currentSelectedProject}
        />
        <Dialog open={openSelectProject} keepMounted onClose={handleSelectProjectCloseClick}>
          <DialogTitle className={classes.dialog}>
            <React.Fragment>
              {t('selectProject.title')}
              <Button color="inherit" startIcon={<AddIcon />} onClick={handleNewProjectClick}>
                {t('newProject.button')}
              </Button>
            </React.Fragment>
          </DialogTitle>
          <DialogContent>
            <ProjectSelector onSelectProjectClick={handleProjectSelectorSelectedProject} />
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  },
);

export default withTranslation()(withRouter(TopbarContainer));
