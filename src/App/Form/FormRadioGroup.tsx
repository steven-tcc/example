import { FieldValues, Controller, UseControllerProps } from 'react-hook-form';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// like this:
// <FormRadioGroup
//   required
//   name="interest"
//   control={control}
//   label={'Select one of the following options:'}
//   options={[
//     { label: 'I want to decarbonize my company', value: 'COMPANY' },
//     { label: 'I want to decarbonize my supply chain', value: 'SUPPLY_CHAIN' },
//     { label: 'I need more info', value: 'MORE_INFO' },
//   ]}
// />;

type Option = {
  label: string;
  value: string;
  disabled?: boolean;
};

interface GenericFormSelectButtonProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  required?: boolean;
  options: Option[];
  question?: boolean;
}

function Component<T extends FieldValues>({
  name,
  defaultValue,
  label,
  required,
  control,
  options,
  question,
  disabled,
}: GenericFormSelectButtonProps<T>) {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <Box>
            <Typography fontWeight={question ? 500 : undefined} variant="body1">{`${label}${required ? '*' : ''
              }`}</Typography>
            <RadioGroup
              sx={{ pl: question ? 2 : undefined }}
              name={name}
              value={value || null}
              onChange={(e) => {
                onChange(e.target.value);
              }}
            >
              {options.map((option) => (
                <FormControlLabel
                  disabled={disabled || option.disabled}
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
          </Box>
        );
      }}
    />
  );
}

export default Component;
