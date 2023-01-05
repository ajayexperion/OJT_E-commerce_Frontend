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
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';//------------------
import { GoogleOAuthProvider } from '@react-oauth/google';//----------
import jwt_decode from "jwt-decode";//---------
import { googleLogout } from "@react-oauth/google";


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



 
 

  const logoutHandler = () => {

    googleLogout();

    console.log("Logout Succesful");

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
                  <Avatar src="https://lh3.googleusercontent.com/a/AEdFTp4pmObIi5_u9Vm7VIhY8jifXpO7KYION9M9esZm=s96-c" sx={{ bgcolor: green[500] }} />

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
                    <Button onClick={logoutHandler}>LOGOUT</Button>
                  </MenuList>
                </Typography>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                  
                    <GoogleOAuthProvider clientId="171975728016-ihc9qjrf43s92g949p0s578ji9fvbft1.apps.googleusercontent.com">

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


      
     
    </>
  )
}

export default Nav;