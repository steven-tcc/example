import { ReactNode } from 'react';
import { FieldValues, Controller, UseControllerProps } from 'react-hook-form';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';

interface GenericCheckboxProps<T extends FieldValues> extends UseControllerProps<T> {
  label: ReactNode;
  required?: boolean;
}

function Component<T extends FieldValues>({
  name,
  defaultValue,
  required,
  label,
  control,
  disabled,
}: GenericCheckboxProps<T>) {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <Stack direction="row" alignItems={'center'}>
            <Checkbox
              disabled={disabled}
              required={required}
              sx={{ ml: -1.5 }}
              name={name}
              checked={value || false}
              onChange={(e) => onChange(e.target.checked)}
            />
            <Box sx={{ color: (theme) => (error ? theme.palette.error.main : 'inherit') }}>{label}</Box>
          </Stack>
        );
      }}
    />
  );
}

export default Component;
