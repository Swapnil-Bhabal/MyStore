import { Flex } from '@chakra-ui/react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from './screens/HomeScreen';

const App = () => {
    return (
        <>
        <Header/>
        <Flex as="main" 
        direction="column"
        mt="72px"
        minH="xl"
        py="6"
        px="6"
        bgColor="gray.200">
        <HomeScreen/>
        </Flex>
        <Footer/>
        </>
    );
};

export default App;