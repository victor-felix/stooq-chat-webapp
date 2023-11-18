import * as React from 'react';
import { useDispatch } from 'react-redux';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { useAuthenticationSlice } from 'app/pages/LoginPage/Features/LoginForm/slice';
import { useNavigate } from 'react-router-dom';

const options = [
  // { value: 1, label: 'Dark Mode' },
  // { value: 2, label: 'Light Mode' },
  { value: 3, label: 'Sair' },
];

const ITEM_HEIGHT = 48;

export function MenuOptions() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { actions } = useAuthenticationSlice();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = event => {
    const { value } = event.target;
    if (value === 3) {
      dispatch(actions.logout());
      navigate('/');
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          },
        }}
      >
        {options.map(option => (
          <MenuItem
            key={option.value}
            onClick={handleClose}
            value={option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
