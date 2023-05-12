import React, { useState } from 'react';
import { Container, FormLabel, Heading, Input, VStack, Box, Button, Avatar } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUp } from '../../redux/actions/user';

export const fileUploadCss = {
  cursor: 'pointer',
  marginLeft: '-5%',
  width: '110%',
  border: 'none',
  height: '100%',
  color: '#90cdf4',
  backgroundColor: 'black'
}

const fileUploadStyle = {
  "&::file-selector-button": fileUploadCss
}

const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imagePrev, setImagePrev] = useState('');
  const [image, setImage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitSignUpHandler = e => {
    e.preventDefault();
    const registerForm = new FormData();
    registerForm.append('name', name);
    registerForm.append('email', email);
    registerForm.append('password', password);
    registerForm.append('file', image);
    dispatch(signUp(registerForm));
    navigate('/');
  };

  return (
    <Container h={'105vh'}>
      <VStack marginTop={'100px'} h='full' justifyContent={'content'} spacing='16'>
        <Heading children="Welcome to VidStream" />
        <form onSubmit={submitSignUpHandler} style={{ width: '100%' }}>
          <Box
            my='4'
            display={'flex'}
            justifyContent={'center'}
          >
            <Avatar src={imagePrev} size='2xl' />
          </Box>
          <Box my='4'>
            <FormLabel htmlFor='name' children='Name' />
            <Input
              required
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter your Name'
              type='text'
              focusBorderColor='blue'
            />
          </Box>
          <Box my='4'>
            <FormLabel htmlFor='email' children='Email Address' />
            <Input
              required
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='example@domain.com'
              type='email'
              focusBorderColor='blue'
            />
          </Box>
          <Box my='4'>
            <FormLabel htmlFor='password' children='Password' />
            <Input
              required
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
              type='password'
              focusBorderColor='blue'
            />
          </Box>
          <Box my='4'>
            <FormLabel htmlFor='chooseAvatar' children='Choose Your Avatar' />
            <Input
              accept='image/*'
              required
              id='chooseAvatar'
              type='file'
              focusBorderColor='blue'
              css={fileUploadStyle}
              onChange={changeImageHandler}
            />
          </Box>
          <Button my='4' colorScheme='blue' type='submit'>
            Sign Up
          </Button>
          <Box my='4'>
            Already a user? <Link to='/login'>
              <Button colorScheme='blue' variant={'link'}>
                Login
              </Button>
            </Link>
            {" "} here
          </Box>
        </form>
      </VStack>
    </Container>
  )
}

export default Register