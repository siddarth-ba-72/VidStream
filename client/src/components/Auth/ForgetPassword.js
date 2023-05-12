import React, { useState } from 'react';
import { Container, Heading, Input, VStack, Button } from '@chakra-ui/react';

const ForgetPassword = () => {

  const [email, setEmail] = useState('');

  return (
    <Container py='16' h='90vh'>
      <form>
        <Heading
          children="Forgot Password"
          my='16'
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
        />
      </form>
      <VStack spacing={'8'}>
        <Input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your Email Address'
          type='email'
          focusBorderColor='blue.500'
        />
        <Button type='submit' width='full' colorScheme='blue'>
          Send Password reset link
        </Button>
      </VStack>
    </Container>
  )
}

export default ForgetPassword