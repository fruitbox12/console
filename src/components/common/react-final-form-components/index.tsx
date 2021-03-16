import React, { Fragment, ChangeEvent } from 'react';
import { FieldRenderProps } from 'react-final-form';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

type Props = FieldRenderProps<string, any>;

export const renderTextField: React.FC<Props> = ({ input, meta: { error, dirty, submitFailed, submitError }, placeholder, ...rest }: Props) => {
  const errorMessage = error || submitError;
  const hasError = error && (dirty || submitFailed);

  return <TextField {...input} {...rest} error={hasError} helperText={hasError ? errorMessage : ''} placeholder={placeholder} />;
};

export const renderAutocomplete: React.FC<Props> = ({
  input,
  meta: { error, dirty, submitFailed, submitError },
  placeholder,
  options,
  ...rest
}: Props) => {
  const errorMessage = error || submitError;
  const hasError = error && (dirty || submitFailed);
  const { name, onChange, value, ...restInput } = input;

  return (
    <Autocomplete
      options={options}
      renderOption={(option: string) => (
        <Fragment>
          <span>{option}</span>
        </Fragment>
      )}
      value={value}
      getOptionSelected={(option: string | null, value: string | null): boolean => option === value || !value}
      onChange={(_: ChangeEvent<{}>, option: string | null): void => onChange(option ? option : null)}
      renderInput={(params) => (
        <TextField
          {...params}
          {...restInput}
          error={hasError}
          helperText={hasError ? errorMessage : ''}
          placeholder={placeholder}
          variant="outlined"
        />
      )}
    />
  );
};
