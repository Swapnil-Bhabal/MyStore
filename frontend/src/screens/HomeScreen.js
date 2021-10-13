import { useState, useEffect } from "react";
import axios from 'axios';
import { Heading, Grid } from "@chakra-ui/layout";
import Product from "../components/Product";


const HomeScreen = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products');
            setProducts(data);
        };

        fetchProducts();
    }, []);

    return (
        <>
        <Heading as="h2" mb="8" fontSize="3xl">
        Latest Products
        </Heading>
        <Grid templateColumns="repeat(4, 1fr)" gap="8">
        {products.map((product) => (
            <Product key={product._id} product={product}/>
        ))}
        </Grid>
        </>
    );
};

export default HomeScreen;