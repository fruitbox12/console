import { createMuiTheme } from '@material-ui/core';

import palette from './Palette';
import typography from './Typography';
import { MuiButton, MuiIconButton, MuiPaper, MuiTableCell, MuiTableHead, MuiTypography } from './overrides';

const theme = createMuiTheme({
  palette,
  typography,
  overrides: {
    MuiButton,
    MuiIconButton,
    MuiPaper,
    MuiTableCell,
    MuiTableHead,
    MuiTypography,
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
});

export default theme;
