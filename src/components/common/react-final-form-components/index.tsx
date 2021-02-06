import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';

type Props = FieldRenderProps<string, any>;

export const renderTextField: React.FC<Props> = ({ input, meta: { error, touched }, ...rest }: Props) => (
  <TextField error={error && touched} helperText={error && touched ? error : ''} {...input} {...rest} />
);

// export const RenderSelect: React.FC<Props> = ({ input, meta: { error, touched }, ...rest }: Props) => (
//   <Autocomplete
//   style={{ width: 300 }}
//   renderOption={(option: string) => (
//     <React.Fragment>
//       <span>option</span>
//     </React.Fragment>
//   )}
//   renderInput={(params) => (
//     <TextField
//       {...params}
//       variant="outlined"
//       inputProps={{
//         ...params.inputProps,
//         autoComplete: 'new-password', // disable autocomplete and autofill
//       }}
//     />
//   )}
// />
// )
