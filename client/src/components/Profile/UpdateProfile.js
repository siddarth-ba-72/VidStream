import React, { useState } from 'react';
import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';

const UpdateProfile = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const updateProfileSubmitHandler = e => {
    e.preventDefault();
    dispatch(updateProfile(name, email));
    dispatch(loadUser());
    navigate('/profile');
  };

  return (
    <Container py='16' minH='90vh'>
      <form onSubmit={updateProfileSubmitHandler}>
        <Heading children='Update Profile' my='16' textAlign={['center', 'left']} textTransform={'uppercase'} />
        <VStack spacing={'8'}>
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='Name'
            type='text'
            focusBorderColor='blue.500'
          />
          <Input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='Email'
            type='text'
            focusBorderColor='blue.500'
          />
          <Button w='full' colorScheme='blue' type='submit'>
            Change
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default UpdateProfile;