import React, { useEffect } from 'react';
import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { buySubscription } from '../../redux/actions/user';

const Subscribe = ({ user }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, subscriptionId } = useSelector(
    state => state.subscription
  );
  const { error: courseError } = useSelector(state => state.course);

  const subscribeHandler = () => {
    dispatch(buySubscription());
    toast.success("Subscribed");
    navigate('/paymentsuccess');
  };

  useEffect(() => {
    if (user?.subscription?.status === 'Subscribed') {
      navigate('/profile');
      toast.success("Already subscribed!");
    }
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (courseError) {
      toast.error(courseError);
      dispatch({ type: 'clearError' });
    }
  }, [dispatch, error, courseError]);

  return (
    <Container h='90vh' p='16'>
      <Heading
        children='Welcome'
        my='8'
        textAlign={'center'}
      />
      <VStack
        boxShadow={'lg'}
        alignItems={'stretch'}
        borderRadius={'lg'}
        spacing={'0'}
      >
        <Box bg='blue.400' p='4' css={{ borderRadius: "8px 8px 0 0" }}>
          <Text color='black' children={`Premium pack - ₹299.00`} />
        </Box>
        <Box p='4'>
          <VStack textAlign={'center'} px='8' mt='4' spacing={'8'}>
            <Text children={`Join Premium pack and get access to all content`} />
            <Heading size='md' children={`₹299 only`} />
          </VStack>
          <Button
            isLoading={loading}
            onClick={subscribeHandler}
            my='8'
            w='full'
            colorScheme='blue'
          >
            Buy Now
          </Button>
        </Box>
        <Box bg='blackAlpha.600' p='4' css={{ borderRadius: "0 0 8px 8px" }}>
          <Heading color='white' textTransform={'uppercase'} size='sm' children='100% refund at cancellation' />
          <Text fontSize={'xs'} color='white' children='*Terms and Conditions Apply' />
        </Box>
      </VStack>
    </Container>
  )
}

export default Subscribe;