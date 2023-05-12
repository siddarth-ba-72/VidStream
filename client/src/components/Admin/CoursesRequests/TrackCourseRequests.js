import React, { useEffect } from 'react';
import { Box, Button, Grid, Heading, HStack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { trackAllCourseRequests } from '../../../redux/actions/admin';
import toast from 'react-hot-toast';

const TrackCourseRequests = () => {

  const { courseReqs, error, loading, message } = useSelector(state => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    dispatch(trackAllCourseRequests());
  }, [dispatch, error, message]);

  return (
    <Grid
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Box p={['0', '16']} overflowX="auto">
        <Heading
          textTransform={'uppercase'}
          children="Course Requests"
          my="16"
          textAlign={['center', 'left']}
        />
        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size="lg">
            <TableCaption>All course Requests by users</TableCaption>
            <Thead>
              <Tr>
                <Th>Username</Th>
                <Th>Email</Th>
                <Th>Query</Th>
                <Th>Answered</Th>
              </Tr>
            </Thead>
            <Tbody>
              {courseReqs &&
                courseReqs.map(item => (
                  <Row
                    key={item._id}
                    item={item}
                  />
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Sidebar />
    </Grid>
  );
};

export default TrackCourseRequests;

function Row({ item }) {
  return (
    <Tr>
      <Td>{item.username}</Td>
      <Td>{item.userEmail}</Td>
      <Td>{item.queryMsg}</Td>
      <Td>{
        item.answered === true ? "Answered" : "Not Answered"
      }</Td>
    </Tr>
  );
};