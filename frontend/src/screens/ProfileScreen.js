import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Flex,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Link,
  Spacer,
  Grid,
} from '@chakra-ui/react';

import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { getUserDetails } from '../actions/userActions';
import { userDetailsReducer } from '../reducers/userReducer';

const ProfileScreen = ({ history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'));
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [history, userInfo, user, dispatch]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword ) {
            setMessage('Password do not match');
        } else { 

        }
    };

    return (
        <Grid templateColumns={{ sm: '1fr', md: '1fr 1fr' }} py="5" gap="10">
        <Flex w="full" alignItems="center" justifyContent="center" py="5">
        <FormContainer>
            <Heading as="h1" mb="8" fontSize="3xl">
            User Profile
            </Heading>
            {error && <Message type="error">{error}</Message>}
            {message && <Message type="error">{message}</Message>}

            <form onSubmit={submitHandler}>
            <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input 
                type="text"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
            <Spacer h="3" />
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <Spacer h="3" />
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Spacer h="3" />
            <FormControl id="confirmPassword">
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter password again"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" isLoading={loading} mt="4" colorScheme="teal">
              Update
            </Button>
            </form>
        </FormContainer>
        </Flex>
        <Flex direction="column">
        <Heading as="h2">My Orders</Heading>
        </Flex>
        </Grid>
    );
};

export default ProfileScreen;
