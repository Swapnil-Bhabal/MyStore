import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Link,
  Checkbox,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = ({ match, history }) => {
    const userId= match.params.id;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate, } = userUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            history.push('/admin/userlist');
        } else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId));
            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }
    },[user, dispatch, userId, history, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ _id: userId, name, email, isAdmin }));
    };

    return (
        <>
            <Link as={RouterLink} to="/admin/userlist">
                Go Back
            </Link>
            <Flex
                w="full"
                alignItems="center"
                justifyContent="center"
                py="5"
            >
            <FormContainer>
                <Heading as="h1" mb="8" fontSize="3xl">
                    Edit User
                </Heading>
                {loadingUpdate && <Loader/>}
                {errorUpdate && (
                    <Message type="error">{errorUpdate}</Message>
                )}
                {loading ? (
                    <Loader/>
                ) : error ? (
                    <Message type="error">{error}</Message>
                ) : (
                    <form onSubmit={submitHandler}>
                        <FormControl id="name" isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input
                            type="text"
                            placeholder="Enter Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        </FormControl>
                        <Spacer h="3" />
                        <FormControl id="email" isRequired>
                            <FormLabel>Email Address</FormLabel>
                            <Input
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                        </FormControl>
                        <Spacer h="3" />
              <FormControl id="isAdmin" isRequired>
                <FormLabel>Is Admin?</FormLabel>
                <Checkbox
                  size="lg"
                  colorScheme="teal"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                >
                  Is Admin?
                </Checkbox>
              </FormControl>
              <Spacer h="3" />
              <Button
                isLoading={loading}
                type="submit"
                mt="4"
                colorScheme="teal"
              >
                Update
              </Button>
            </form>
             )}
        </FormContainer>
    </Flex>
    </>
    );
};

export default UserEditScreen;