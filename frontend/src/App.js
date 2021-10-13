import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

const App = () => {
    return (
        <Router>
        <Header/>
        <Flex as="main" 
        direction="column"
        mt="72px"
        minH="xl"
        py="6"
        px="6"
        bgColor="gray.200">
        <Route path="/" exact component={HomeScreen}/>
        <Route path="/product/:id" component={ProductScreen}/>
        </Flex>
        <Footer/>
        </Router>
    );
};

export default App;