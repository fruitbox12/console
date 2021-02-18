import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withTranslation, WithTranslation } from 'react-i18next';

import Topbar from './Topbar';
import ProjectSelector from '../../../../components/app/project/project-selector';
import { selectState } from '../../../../framework/redux/GlobalSlice';

interface TopbarContainerProps extends WithTranslation {
  open: boolean;
  onDrawerOpen: () => void;
}

const TopbarContainer = React.memo<TopbarContainerProps>(({ t, open, onDrawerOpen }) => {
  const { currentSelectedProject } = useSelector(selectState);
  const { user } = useAuth0();
  const { picture } = user;

  const [openSelectProject, setSelectProjectOpen] = React.useState(false);

  const handleSelectProjectOpenClick = () => {
    setSelectProjectOpen(true);
  };

  const handleSelectProjectOpenClose = () => {
    setSelectProjectOpen(false);
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
      <Dialog
        open={openSelectProject}
        keepMounted
        onClose={handleSelectProjectOpenClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{t('selectProject.title')}</DialogTitle>
        <DialogContent>
          <ProjectSelector onSelectProjectClick={handleSelectProjectOpenClose} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
});

export default withTranslation()(TopbarContainer);
