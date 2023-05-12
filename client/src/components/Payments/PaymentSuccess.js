import React from 'react';
import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { RiCheckboxCircleFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const PaymentSuccess = ({ user }) => {
  return (
    <Container h='90vh' p='16'>
      <Heading my='8' textAlign={'center'}>
        You have Premium Pack
      </Heading>
      <VStack boxShadow={'lg'} pb='16' alignItems={'center'} borderRadius={'lg'}>
        <Box w='full' bg='blue.400' p='4' css={{ borderRadius: "8px 8px 0 0" }}>
          <Text color='black'>
            Payment Success!
          </Text>
        </Box>
        <Box p='4'>
          <VStack textAlign={'center'} px='8' mt='4' spacing='8'>
            <Text>
              Congratulations! Now you are a Premium member
            </Text>
            <Heading size='4xl'>
              <RiCheckboxCircleFill />
            </Heading>
          </VStack>
        </Box>
        <Link to='/profile'>
          <Button variant={'ghost'}>Go to Profile</Button>
        </Link>
        <Heading size='xs'>
          {/* Reference: {user?.subscription.id.toString()}; */}
        </Heading>
      </VStack>
    </Container>
  );
};

export default PaymentSuccess;