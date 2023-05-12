import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Heading, VStack, Box, Input, FormLabel, Button, Textarea } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { courseRequest } from '../../redux/actions/other';
import toast from 'react-hot-toast';

const Request = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loading,
    error,
    message: stateMessage,
  } = useSelector(state => state.other);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');

  const submitCourseRequestHandler = e => {
    e.preventDefault();
    dispatch(courseRequest(name, email, course));
    navigate('/');
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (stateMessage) {
      toast.success(stateMessage);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, stateMessage]);

  return (
    <Container height={'90vh'}>
      <VStack h='full' justifyContent={'center'} spacing='16'>
        <Heading children="Request for a New Course" />
        <form
          onSubmit={submitCourseRequestHandler}
          style={{ width: '100%' }}
        >
          <Box my={'4'}>
            <FormLabel htmlFor="name" children="Name" />
            <Input
              required
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name"
              type={'text'}
              focusBorderColor="blue.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="email" children="Email" />
            <Input
              required
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="example@domain.com"
              type={'email'}
              focusBorderColor="blue.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="course" children="Course" />
            <Textarea
              required
              id="course"
              value={course}
              onChange={e => setCourse(e.target.value)}
              placeholder="Explain the Course"
              focusBorderColor="blue.500"
            />
          </Box>
          <Button my="4" colorScheme={'blue'} type="submit">
            Send Mail
          </Button>
          <Box my="4">
            See available courses{' '}
            <Link to="/courses">
              <Button colorScheme={'blue'} variant="link">
                Click
              </Button>{' '}
              here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  )
};

export default Request;