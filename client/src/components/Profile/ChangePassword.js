import React, { useState, useEffect } from 'react';
import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../redux/actions/profile';
import { logout } from '../../redux/actions/user';

const ChangePassword = () => {

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changePasswordSubmitHandler = e => {
    e.preventDefault();
    dispatch(changePassword(oldPassword, newPassword));
    dispatch(logout());
    toast.success('Your password has been changed. Please login again.');
    navigate('/login');
  };

  const { loading, message, error } = useSelector(state => state.profile);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
      navigate('/changepassword');
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message, navigate]);

  return (
    <Container py='16' minH='90vh'>
      <form onSubmit={changePasswordSubmitHandler}>
        <Heading children='Change Password' my='16' textAlign={['center', 'left']} textTransform={'uppercase'} />
        <VStack spacing={'8'}>
          <Input
            required
            id='password'
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            placeholder='Old password'
            type='password'
            focusBorderColor='blue.500'
          />
          <Input
            required
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder='New password'
            type='password'
            focusBorderColor='blue.500'
          />
          <Button
            w='full'
            colorScheme='blue'
            type='submit'
            isLoading={loading}
          >
            Change
          </Button>
        </VStack>
      </form>
    </Container>
  )
}

export default ChangePassword