import { ReactNode } from 'react';
import { FieldValues, Controller, UseControllerProps } from 'react-hook-form';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface GenericCheckboxProps<T extends FieldValues> extends UseControllerProps<T> {
  label: ReactNode;
  required?: boolean;
  placeholder?: string;
}

function Component<T extends FieldValues>({
  name,
  defaultValue,
  required,
  label,
  control,
  placeholder,
  disabled,
}: GenericCheckboxProps<T>) {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <Box>
            <Typography variant="body1" pb={1}>{`${label}${required ? '*' : ''}`}</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disabled={disabled}
                value={value ? dayjs(value) : null}
                onChange={(newValue) => onChange(newValue ? dayjs(newValue).toISOString() : null)}
                sx={{ width: '100%' }}
                slotProps={{
                  textField: {
                    error: !!error,
                    helperText: error ? error.message : null,
                    placeholder,
                  },
                }}
              />
            </LocalizationProvider>
          </Box>
        );
      }}
    />
  );
}

export default Component;
