import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import { withTranslation, WithTranslation } from 'react-i18next';

interface EdgeNodeTableHeaderProps extends WithTranslation {
  showCheckbox: boolean;
}

export default withTranslation()(
  React.memo<EdgeNodeTableHeaderProps>(({ t, showCheckbox }) => (
    <TableHead>
      <TableRow>
        {showCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox checked={false} />
          </TableCell>
        )}
        <TableCell>{t('machineID.title')}</TableCell>
        <TableCell>{t('kernelVersion.title')}</TableCell>
        <TableCell>{t('architecture.title')}</TableCell>
        <TableCell>{t('internalIP.title')}</TableCell>
        <TableCell>{t('externalIP.title')}</TableCell>
        <TableCell>{t('hostName.title')}</TableCell>
      </TableRow>
    </TableHead>
  )),
);
