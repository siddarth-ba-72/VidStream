import React from 'react';
import { Button, Heading, Stack, VStack, Text, Image, Box, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { CgGoogle, CgYoutube } from "react-icons/cg";
import { SiCoursera, SiUdemy } from "react-icons/si";
import { DiAws } from "react-icons/di";
import vg from "../../assets/images/bg.png";
import introVideo from '../../assets/videos/intro.mp4';
import "./home.css";

const Home = () => {
  return <section className='home'>
    <div className="container">
      <Stack
        direction={["column", "row"]}
        height="100%"
        justifyContent={["center", "space-between"]}
        alignItems="center"
        spacing={['16', '56']}
      >
        <VStack
          width={"full"}
          alignItems={["center", "flex-end"]}
          spacing={"8"}
        >
          <Heading children="LEARN FROM EXPERTS" size={'2xl'} />
          <Text
            fontSize={'xl'}
            textAlign={['center', 'left']}
            children="Ace Your Skills and be prepared for the most in-demand skills"
          />
          <Link to="/courses">
            <Button size={"lg"} colorScheme='blue'>Explore</Button>
          </Link>
        </VStack>
        <Image
          boxSize={"md"}
          src={vg}
          objectFit="contain"
          className='vector-graphics'
        />
      </Stack>
    </div>
    <Box padding={"8"} bg={"blackAlpha.800"}>
      <Heading
        children="OUR PARTNERS"
        textAlign={"center"}
        color={'red.400'}
        fontFamily={"body"}
      />
      <HStack
        className='brandsBanner'
        justifyContent={"space-evenly"}
        marginTop={"4"}
      >
        <CgGoogle />
        <CgYoutube />
        <SiCoursera />
        <SiUdemy />
        <DiAws />
      </HStack>
    </Box>
    <div className="container2">
      <video
        autoPlay
        controls
        src={introVideo}
        controlsList='nodownload nofullscreen noremteplayback'
        disablePictureInPicture
        disableRemotePlayback
      >
      </video>
    </div>
  </section>;
};

export default Home;