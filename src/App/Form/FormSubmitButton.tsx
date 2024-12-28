import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import Button from '@mui/material/Button';

type SubmitButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  buttonText?: string;
  showNextArrow?: boolean;
};

const Component = ({ onClick, buttonText, showNextArrow, disabled }: SubmitButtonProps) => {
  const theme = useTheme();
  return (
    <Box pt={2} width={'100%'}>
      <Button
        disabled={disabled}
        type="submit"
        startIcon={showNextArrow ? <Icon /> : null}
        endIcon={!showNextArrow ? null : theme.direction === 'rtl' ? <ArrowBackIcon /> : <ArrowForwardIcon />}
        fullWidth
        size="large"
        variant="contained"
        onClick={onClick}
      >
        <Box sx={{ width: '100%' }}>{buttonText}</Box>
      </Button>
    </Box>
  );
};

export default Component;
