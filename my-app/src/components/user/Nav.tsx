import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import { Button, Divider, ListItemText, MenuList, Paper } from '@mui/material';
import { indigo, green } from '@mui/material/colors';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';
import { GoogleLogout } from 'react-google-login';
// import GoogleLogin from 'react-google-login';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';

import { GoogleLogin } from '@react-oauth/google';//------------------

import { GoogleOAuthProvider } from '@react-oauth/google';//----------

import jwt_decode from "jwt-decode";//---------



const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];
const option = ['100-1000', '1000-5000', '5000-10000'];
const Nav = () => {

  // state for filter by name

  const [namefilter, setnamefilter] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setnamefilter(false);
  };

  const handleToggle = () => {
    setnamefilter((prevOpen) => !prevOpen);
  };

  const handleClose1 = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setnamefilter(false);
  };


  // state for filter by amount
  const [amountfilter, setamountfilter] = React.useState(false);
  const anchorTwoRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndexTwo, setSelectedIndexTwo] = React.useState(1);

  const handleClickTwo = () => {
    console.info(`You clicked ${options[selectedIndexTwo]}`);
  };

  const handleMenuItemClickTwo = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndexTwo(index);
    setamountfilter(false);
  };

  const handleToggleTwo = () => {
    setamountfilter((prevOpen) => !prevOpen);
  };

  const handleCloseTwo = (event: Event) => {
    if (
      anchorTwoRef.current &&
      anchorTwoRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setamountfilter(false);
  };


  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const test = () => {
    navigate('/', { state: { "name": 'cycle1' } })
  }



  return (
    <>

      <AppBar position="static" sx={{ bgcolor: green[100] }}>
        <Container maxWidth="xl" >

          <Toolbar disableGutters>

            {/* <IconButton><SearchIcon /></IconButton> */}


            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>
            <Box sx={{ flexGrow: 0 }}>

              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                  <Avatar alt="A" sx={{ bgcolor: green[500] }} />

                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',

                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >


                {/* button for menu */}

                <Typography sx={{ width: 190 }}>
                  <MenuList dense>
                    <Button onClick={handleCloseUserMenu} className="button" name="MY profile">MYprofile</Button>
                    <br />
                    <Button onClick={handleCloseUserMenu}>WishLiSt</Button>
                    <br />
                    <Button onClick={handleCloseUserMenu}>Cart</Button>
                    <Divider />
                    <Button onClick={handleOpen}>LOGIN</Button>
                    <br />
                    <Button onClick={handleCloseUserMenu}>LOGOUT</Button>
                  </MenuList>
                </Typography>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    {/* <GoogleLogin
                      clientId="431801254249-gejp2h2p8hv54ue28k7hk999laa0336h.apps.googleusercontent.com"
                      buttonText="LOGIN WITH GOOGLE"
                      onSuccess={responseGoogle}
                      onFailure={responseGoogle}
                      cookiePolicy={'single_host_origin'}
                    /> */}
                    <GoogleOAuthProvider clientId="431801254249-gejp2h2p8hv54ue28k7hk999laa0336h.apps.googleusercontent.com">

                      <GoogleLogin

                        onSuccess={credentialResponse => {

                          console.log(credentialResponse.credential);

                          if (credentialResponse.credential !== undefined) {

                            var decoded = jwt_decode(credentialResponse.credential);

                            console.log(decoded);

                          }

                        }}

                        onError={() => {

                          console.log('Login Failed');

                        }}

                        useOneTap

                      />

                    </GoogleOAuthProvider>;
                  </Box>
                </Modal>

              </Menu>
            </Box>
          </Toolbar>
        </Container>

      </AppBar>


      {/* filter by name */}
      <Container >

        {/* <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button" >
          <Button onClick={handleClick}>{options[selectedIndex]} </Button>
          <Button
            size="small"
            aria-controls={namefilter ? 'split-button-menu' : undefined}
            aria-expanded={namefilter ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper
          sx={{
            zIndex: 1,
          }}
          open={namefilter}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose1}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        disabled={index === 2}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper> */}




        {/* filter by amount */}

        {/* <React.Fragment>
        <ButtonGroup variant="contained" ref={anchorTwoRef} aria-label="split button">
          <Button onClick={handleClickTwo}>{option[selectedIndexTwo]}</Button>
          <Button
            size="small"
            aria-controls={amountfilter ? 'split-button-menu' : undefined}
            aria-expanded={amountfilter ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggleTwo}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper
          sx={{
            zIndex: 1,
          }}
          open={amountfilter}
          anchorEl={anchorTwoRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseTwo}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    {option.map((option, index) => (
                      <MenuItem
                        key={option}
                        disabled={index === 2}
                        selected={index === selectedIndexTwo}
                        onClick={(event) => handleMenuItemClickTwo(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </React.Fragment> */}
      </Container>
    </>
  )
}

export default Nav;