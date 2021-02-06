import Palette from '../Palette';
import typography from '../Typography';

const MuiTableCell = {
  root: {
    ...typography.body1,
    borderBottom: `1px solid ${Palette.divider}`,
  },
};

export default MuiTableCell;
