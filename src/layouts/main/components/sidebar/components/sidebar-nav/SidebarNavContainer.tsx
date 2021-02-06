import React from 'react';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import styles from './Styles';

export interface Page {
  key: string;
  title: string;
  icon: JSX.Element;
  onClick: () => void;
}

interface SidebarNavContainerProps {
  pages: Page[];
  className: string;
}

export default React.memo<SidebarNavContainerProps>(({ pages, className }) => {
  const classes = styles();

  return (
    <List className={clsx(classes.root, className)}>
      {pages.map((page) => (
        <ListItem button key={page.key} onClick={page.onClick}>
          <ListItemIcon>{page.icon}</ListItemIcon>
          <ListItemText primary={page.title} />
        </ListItem>
      ))}
    </List>
  );
});
