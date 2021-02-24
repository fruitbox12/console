import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { withTranslation, WithTranslation } from 'react-i18next';

interface EdgeClusterTableHeaderProps extends WithTranslation {
  showCheckbox: boolean;
  deleteIconEnabled: boolean;
  onDeleteIconClick: () => void;
}

export default withTranslation()(
  React.memo<EdgeClusterTableHeaderProps>(({ t, showCheckbox, deleteIconEnabled, onDeleteIconClick }) => (
    <TableHead>
      <TableRow>
        {showCheckbox && (
          <TableCell padding="checkbox">
            <IconButton color="inherit" aria-label="delete" onClick={onDeleteIconClick} disabled={!deleteIconEnabled}>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        )}
        <TableCell>{t('name.title')}</TableCell>
        <TableCell>{t('type.title')}</TableCell>
        <TableCell>{t('secret.title')}</TableCell>
        <TableCell>{t('ip.title')}</TableCell>
        <TableCell>{t('port.title')}</TableCell>
        <TableCell>{t('kubeconfig.title')}</TableCell>
      </TableRow>
    </TableHead>
  )),
);
