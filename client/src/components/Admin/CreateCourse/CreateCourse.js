import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Grid, Heading, Image, Input, Select, VStack } from '@chakra-ui/react';
import Sidebar from '../Sidebar';
import { fileUploadCss } from '../../Auth/Register';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createCourse } from '../../../redux/actions/admin';

const CreateCourse = () => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [imagePrev, setImagePrev] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector(state => state.admin);

  const categories = [
    'Backend Development',
    'Web development',
    'Data Analytics',
    'Database',
    'Artificial Intellegence',
    'DevOps',
    'Data Structure & Algorithm',
    'App Development',
    'Data Science',
    'Game Development',
  ];

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = e => {
    e.preventDefault();
    const newCourseForm = new FormData();
    newCourseForm.append('title', title);
    newCourseForm.append('description', description);
    newCourseForm.append('category', category);
    newCourseForm.append('createdBy', createdBy);
    newCourseForm.append('file', image);
    dispatch(createCourse(newCourseForm));
    navigate('/admin/courses');
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  const fileUploadStyle = {
    "&::file-selector-button": fileUploadCss
  }

  return (
    <Grid
      minH='100vh'
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Container>
        <form onSubmit={submitHandler}>
          <Heading
            textTransform={'uppercase'}
            children='Create Course'
            my='16'
            textAlign={['center', 'left']}
          />
          <VStack m='auto' spacing='8'>
            <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder='Title'
              type='text'
              focusBorderColor='purple.500'
            />
            <Input
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder='Description'
              type='text'
              focusBorderColor='purple.500'
            />
            <Input
              value={createdBy}
              onChange={e => setCreatedBy(e.target.value)}
              placeholder='Creator name'
              type='text'
              focusBorderColor='purple.500'
            />
            <Select
              focusBorderColor='purple.500'
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="">Category</option>
              {
                categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))
              }
            </Select>
            <Input
              accept='image/*'
              required
              id='chooseAvatar'
              type='file'
              focusBorderColor='purple.300'
              css={{
                '&::file-selector-button': {
                  ...fileUploadCss,
                  color: 'purple.300'
                }
              }}
              onChange={changeImageHandler}
            />
            {
              imagePrev && (
                <Image src={imagePrev} boxSize={'64'} objectFit={'contain'} />
              )
            }
            <Button w='full' colorScheme='purple' type='submit'>
              Create
            </Button>
          </VStack>
        </form>
      </Container>
      <Sidebar />
    </Grid>
  )
}

export default CreateCourse