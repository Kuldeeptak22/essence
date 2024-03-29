import { useEffect, useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
// mocks_
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { baseURL } from '../../../utils/API';
import UserDefaultImage from '../../../_mock/ic_user.svg';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const [userAccountData, setUserAccountData] = useState(JSON.parse(localStorage.getItem('Employee')));
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const logOutHandler = () => {
    localStorage.removeItem('EmployeeToken');
    localStorage.removeItem('Employee');
    const notify = () =>
      toast.success('Logout Successfully...!!', {
        theme: 'dark',
      });
    notify();
    setTimeout(() => {
      setOpen(null);
      navigate('/login');
    }, 1000);
  };

  useEffect(() => {
    const handleEmployeeUpdate = () => {
      setUserAccountData(JSON.parse(localStorage.getItem('Employee')));
      console.log(JSON.parse(localStorage.getItem('Employee')));
    };

    // Listen for the "employeeUpdated" event
    window.addEventListener('employeeUpdated', handleEmployeeUpdate);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('employeeUpdated', handleEmployeeUpdate);
    };
  }, []);

  let account = {};

  if (userAccountData) {
    const { firstName, lastName, email, avatar } = userAccountData;
    account = {
      displayName: `${firstName} ${lastName}`,
      email,
      photoURL: avatar ? `${baseURL}/uploads/employees/${avatar}` : UserDefaultImage,
    };
  }

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account?.photoURL ? account?.photoURL : account?.displayName} alt={account?.displayName} />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {account?.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={logOutHandler} sx={{ m: 1 }}>
          Logout
        </MenuItem>

        <ToastContainer />
      </Popover>
    </>
  );
}
