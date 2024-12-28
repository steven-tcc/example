import { ReactNode } from 'react';
import { useTheme } from '@mui/material/styles';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlined from '@mui/icons-material/ArrowBackIosOutlined';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Component = ({
  onClick,
  title,
  subtitle,
  icon,
  hideArrow,
}: {
  onClick?: () => void;
  title: ReactNode;
  subtitle?: ReactNode;
  icon: ReactNode;
  hideArrow?: boolean;
}) => {
  const theme = useTheme();
  return (
    <Button
      color="inherit"
      variant="text"
      size="large"
      onClick={onClick ? () => onClick() : () => false}
      sx={{
        textTransform: 'unset',
        textAlign: 'unset',
        height: '40px',
        color: 'text.secondary',
      }}
      startIcon={icon}
      endIcon={
        hideArrow ? null : theme.direction === 'rtl' ? <ArrowBackIosOutlined /> : <ArrowForwardIosOutlinedIcon />
      }
    >
      <Typography
        color={'text.primary'}
        component={'div'}
        pl={0.5}
        pr={0.5}
        variant="subtitle1"
        noWrap
        flexGrow={1}
        alignContent={'flex-start'}
      >
        {title}
      </Typography>
      {subtitle ? (
        <Typography
          component={'div'}
          noWrap
          variant="body1"
          flexGrow={0}
          sx={{ opacity: 0.6 }}
          color={'text.secondary'}
        >
          {subtitle}
        </Typography>
      ) : null}
    </Button>
  );
};

export default Component;
