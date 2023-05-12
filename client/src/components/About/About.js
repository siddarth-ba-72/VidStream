import React from 'react';
import { Avatar, Box, Button, Container, HStack, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import ProfileImg from '../../assets/images/profileImg.jpeg';
import { Link } from 'react-router-dom';
import introVideo from '../../assets/videos/intro.mp4';
import { RiSecurePaymentFill } from 'react-icons/ri';
import termsAndConditions from '../../assets/docs/termsAndCondition';

const Founder = () => (
  <Stack
    direction={['column', 'row']}
    spacing={['4', '16']}
    padding='8'
  >
    <VStack>
      <Avatar src={ProfileImg} boxSize={['40', '48']} />
      <Text children='Co-Founder' opacity={'0.7'} />
    </VStack>
    <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
      <Heading children='Siddarth Ambannavar' size={['md', 'xl']} />
      <Text
        children={'Passionate Web Developer and Aspiring Data Analyst. Our platform focuses on one of the best courses at very affodable price'}
        alignItems={'center'}
      />
    </VStack>
  </Stack>
);

const VideoPlayer = () => (
  <Box>
    <video
      autoPlay
      muted
      loop
      controls
      src={introVideo}
      controlsList='nodownload nofullscreen noremteplayback'
      disablePictureInPicture
      disableRemotePlayback
    >
    </video>
  </Box>
);

const TandC = ({ termsAndConditions }) => (
  <Box>
    <Heading
      size='md'
      children='Terms and Conditions'
      textAlign={['center', 'left']}
      my='4'
    />
    <Box h='sm' p='4' overflowY={'scroll'}>
      <Text
        textAlign={['center', 'left']}
        letterSpacing={'widest'}
        fontFamily={'heading'}
      >
        {termsAndConditions}
      </Text>
      <Heading my='4' size='xs' children='Refund only applicable for cancellation within 7 days' />
    </Box>
  </Box>
);

const About = () => {
  return (
    <Container maxW='container.lg' padding='16' boxShadow='lg'>
      <Heading children="About Me" textAlign={['center', 'left']} />
      <Founder />
      <Stack margin={'8'} direction={['column', 'row']} alignItems={'center'}>
        <Text fontFamily={'cursive'} m='8' textAlign={['center', 'left']}>
          We are a video streaming platform with some premium courses available only for premium users
        </Text>
        <Link to='/subscribe'>
          <Button variant={'ghost'} colorScheme='blue'>
            Checkout Our Plan
          </Button>
        </Link>
      </Stack>
      <VideoPlayer />
      <TandC termsAndConditions={termsAndConditions} />
      <HStack my='4' p='4'>
        <RiSecurePaymentFill />
        <Heading
          children="Payment is secured by Razorpay"
          size='xs'
          fontFamily={'sans-serif'}
          textTransform={'uppercase'}
        />
      </HStack>
    </Container>
  );
};

export default About;