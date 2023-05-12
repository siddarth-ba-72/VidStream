import React from 'react';
import { ColorModeSwitcher } from "../../../ColorModeSwitcher";
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, Text, VStack, useDisclosure } from '@chakra-ui/react';
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/user';

const LinkButton = ({ url = '/', title = 'Home', onClose }) => (
  <Link onClick={onClose} to={url}>
    <Button variant={'ghost'}>
      {title}
    </Button>
  </Link>
);

const Header = ({ isAuthenticated = false, user }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    onClose();
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <ColorModeSwitcher />
      <Button
        colorScheme='blue'
        width={"12"}
        height={"12"}
        rounded={"full"}
        position={"fixed"}
        top={"6"}
        left={"6"}
        onClick={onOpen}
        zIndex='overlay'
      >
        <RiMenu5Fill />
      </Button>
      <Drawer placement='left' isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay backdropFilter={'blur(3px)'} />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={'1px'}>
            VidStream
            <Link to={
              user?.role === "admin" ? '/admin/dashboard' : '/profile'
            }>
              <Text color='blue.500' fontSize={'15px'} mt='5px' children={
                user?.role === "admin" ? "Admin" : user?.name
              } />
            </Link>
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={"4"} alignItems={"flex-start"}>
              <LinkButton onClose={onClose} url='/' title='Home' />
              <LinkButton onClose={onClose} url='/courses' title='Courses' />
              <LinkButton onClose={onClose} url='/request' title='Request Course' />
              <LinkButton onClose={onClose} url='/contact' title='Contact Us' />
              <LinkButton onClose={onClose} url='/about' title='About' />
              <HStack
                justifyContent={"space-evenly"}
                position={"absolute"}
                bottom={"2rem"}
                width={"80%"}
              >
                {
                  isAuthenticated ? (
                    <>
                      <VStack>
                        <HStack>
                          <Link onClick={onClose} to='/profile'>
                            <Button variant={"ghost"} colorScheme='blue'>
                              Profile
                            </Button>
                          </Link>
                          <Button variant={"ghost"} onClick={logoutHandler}>
                            <RiLogoutBoxLine /> {" "} Logout
                          </Button>
                        </HStack>
                        {
                          user && user.role === "admin" &&
                          <Link onClick={onClose} to='/admin/dashboard'>
                            <Button variant={"ghost"} colorScheme='blue'>
                              <RiDashboardFill style={{ margin: '4px' }} /> Dashboard
                            </Button>
                          </Link>
                        }
                      </VStack>
                    </>
                  )
                    :
                    (
                      <>
                        <Link to='/login'>
                          <Button colorScheme='blue'>Login</Button>
                        </Link>
                        <p>or</p>
                        <Link to='/login'>
                          <Button colorScheme='blue'>Sign Up</Button>
                        </Link>
                      </>
                    )
                }
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Header;
