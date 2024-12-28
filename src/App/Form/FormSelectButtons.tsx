import { FieldValues, Controller, UseControllerProps } from 'react-hook-form';

import CheckIcon from '@mui/icons-material/Check';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export type TSelectButtonsOptions = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type TSelectButtons = {
  value: string;
  onChange: (newValue: string) => void;
  label: string;
  required?: boolean;
  options: TSelectButtonsOptions[];
  error?: boolean;
  helpText?: string;
  disabled?: boolean;
};

function SelectButtons({ value, label, required, onChange, options, error, helpText, disabled }: TSelectButtons) {
  return (
    <Box>
      <Typography variant="body1">{`${label}${required ? '*' : ''}`}</Typography>
      <Stack spacing={2} pt={2}>
        {options.map((option) => (
          <Box
            key={option.value}
            color={(theme) => (value === option.value ? undefined : theme.palette.text.secondary)}
          >
            <Button
              size="large"
              variant={value === option.value ? 'contained' : 'outlined'}
              color={'inherit'}
              sx={{
                textTransform: 'unset',
                justifyContent: 'flex-start',
              }}
              onClick={() => onChange(option.value)}
              disabled={disabled || option.disabled}
              startIcon={value === option.value ? <CheckIcon /> : null}
            >
              {option.label}
            </Button>
          </Box>
        ))}
        {error && helpText ? (
          <Typography color={'error'} variant="body1">
            {helpText}
          </Typography>
        ) : null}
      </Stack>
      <input
        style={{ height: 0, opacity: 0 }}
        required={required}
        type="text"
        value={value || ''}
        onChange={() => false}
      />
    </Box>
  );
}


interface GenericFormSelectButtonProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  required?: boolean;
  options: TSelectButtonsOptions[];
  error?: boolean;
  helpText?: string;
}

function Component<T extends FieldValues>({
  name,
  defaultValue,
  label,
  required,
  control,
  options,
  error,
  helpText,
  disabled,
}: GenericFormSelectButtonProps<T>) {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field: { value, onChange } }) => (
        <SelectButtons
          disabled={disabled}
          error={error}
          helpText={helpText}
          options={options}
          label={label}
          required={required}
          value={value || ''}
          onChange={onChange}
        />
      )}
    />
  );
}

export default Component;
