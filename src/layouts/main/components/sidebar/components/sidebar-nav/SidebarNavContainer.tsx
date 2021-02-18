import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export interface Page {
  key: string;
  title: string;
  icon: JSX.Element;
  onClick: () => void;
}

interface SidebarNavContainerProps {
  pages: Page[];
}

export default React.memo<SidebarNavContainerProps>(({ pages }) => {
  return (
    <List>
      {pages.map((page) => (
        <ListItem button key={page.key} onClick={page.onClick}>
          <ListItemIcon>{page.icon}</ListItemIcon>
          <ListItemText primary={page.title} />
        </ListItem>
      ))}
    </List>
  );
});
