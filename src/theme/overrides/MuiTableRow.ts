import Palette from '../Palette';

const MuiTableRow = {
  root: {
    '&$selected': {
      backgroundColor: Palette.background.default,
    },
    '&$hover': {
      '&:hover': {
        backgroundColor: Palette.background.default,
      },
    },
  },
};

export default MuiTableRow;
