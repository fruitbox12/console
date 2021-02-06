import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import { withTranslation, WithTranslation } from 'react-i18next';

interface DepartmentTableHeaderProps extends WithTranslation {}

const DepartmentTableHeader = React.memo<DepartmentTableHeaderProps>(({ t }) => (
  <TableHead>
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox checked={false} />
      </TableCell>
      <TableCell>{t('name.title')}</TableCell>
      <TableCell>{t('type.title')}</TableCell>
      <TableCell>{t('secret.title')}</TableCell>
    </TableRow>
  </TableHead>
));

export default withTranslation()(DepartmentTableHeader);
