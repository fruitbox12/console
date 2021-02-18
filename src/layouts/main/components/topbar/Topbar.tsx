import * as React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import styles from './Styles';
import ProfileContainer from '../profile';
import { Project } from '../../../../framework/redux/GlobalSlice';

interface TopbarProps extends WithTranslation {
  drawerOpen: boolean;
  onDrawerOpen: () => void;
  pictureUrl: string;
  onSelectProjectClick: () => void;
  project?: Project;
}

const Topbar = React.memo<TopbarProps>(({ t, drawerOpen, onDrawerOpen, pictureUrl, onSelectProjectClick, project }) => {
  const classes = styles();
  const projectButtonText = project ? project.name : t('selectProject.label');

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: drawerOpen,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: drawerOpen,
          })}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          {t('edgeCloud.title')}
        </Typography>
        <Button color="inherit" className={classes.selectProjectButton} endIcon={<ArrowDropDownIcon />} onClick={onSelectProjectClick}>
          {projectButtonText}
        </Button>
        <div className={classes.flexGrow} />
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <React.Fragment>
              <IconButton color="inherit" aria-label="open profile" edge="end" {...bindTrigger(popupState)}>
                <Avatar alt="Person" className={classes.avatar} src={pictureUrl} />
              </IconButton>
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <ProfileContainer />
              </Popover>
            </React.Fragment>
          )}
        </PopupState>
      </Toolbar>
    </AppBar>
  );
});

export default withTranslation()(Topbar);
