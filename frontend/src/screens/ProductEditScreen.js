import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Flex,
  Heading,
  FormControl,
  Input,
  FormLabel,
  Spacer,
  Link,
} from '@chakra-ui/react';

import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import {
  listProductDetails,
  updateProduct,
} from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import { productUpdateReducer } from '../reducers/productReducer';

const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id;
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            history.push('/admin/productlist');
        } else {
            if (!product.name || product._id !== productId) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
            }
        }
    }, [dispatch, history, productId, product, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            category,
            description,
            countInStock,
        })
        );
    };

    return (
        <>
            <Link as={RouterLink} to="/admin/productlist">
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
                        Edit Product
                    </Heading>
                    {loadingUpdate && <Loader/>}
                    {errorUpdate && (
                        <Message type="error">{errorUpdate}</Message>
                    )}
                    {loading ? (
                        <Loader/>
                    ) : error ? (
                        <Message type="error">{error }</Message>
                    ) : (
                        <form onSubmit={submitHandler}>
                        <FormControl id="name" isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input 
                            type="text"
                            placeholder="Enter Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}/>
                            </FormControl>
                            <Spacer h="3"/>
                            <FormControl id="email" isRequired>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </FormControl>
              <Spacer h="3" />
              {/* IMAGE */}
              <FormControl id="image" isRequired>
                <FormLabel>Image</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter image url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </FormControl>
              <Spacer h="3" />
              {/* DESCRIPTION */}
              <FormControl id="text" isRequired>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
              <Spacer h="3" />
              {/* BRAND */}
              <FormControl id="brand" isRequired>
                <FormLabel>Brand</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </FormControl>
              <Spacer h="3" />
              {/* COUNT IN STOCK */}
              <FormControl id="countInStock" isRequired>
                <FormLabel>Count in Stock</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter count"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </FormControl>
              <Spacer h="3" />
              {/* CATEGORY */}
              <FormControl id="brand" isRequired>
                <FormLabel>Category</FormLabel>
                <Input
                  type="text"
                  value={category}
                  placeholder="Enter category"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </FormControl>
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

export default ProductEditScreen;