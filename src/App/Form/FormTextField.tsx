import { FieldValues, Controller, UseControllerProps } from 'react-hook-form';

import TextField from '@mui/material/TextField';

interface GenericTextFieldProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  labelSubtitle?: string;
  required?: boolean;
  autoComplete?: string;
  type?: string;
}

function Component<T extends FieldValues>({
  name,
  defaultValue,
  autoComplete,
  required,
  label,
  labelSubtitle,
  control,
  type,
  disabled,
}: GenericTextFieldProps<T>) {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <TextField
            autoComplete={autoComplete || 'off'}
            required={required}
            type={type}
            error={!!error}
            helperText={error ? error.message : null}
            label={label}
            title={labelSubtitle}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
          />
        );
      }}
    />
  );
}

export default Component;
