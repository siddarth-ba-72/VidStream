import React, { useState } from 'react';
import { Container, Heading, Input, VStack, Button } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {

  const [password, setPassword] = useState('');
  const params = useParams();

  return (
    <Container py='16' h='90vh'>
      <form>
        <Heading
          children="Reset Password"
          my='16'
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
        />
      </form>
      <VStack spacing={'8'}>
        <Input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter new Password'
          type='password'
          focusBorderColor='blue.500'
        />
        <Button type='submit' width='full' colorScheme='blue'>
          Change Password
        </Button>
      </VStack>
    </Container>
  )
}

export default ResetPassword