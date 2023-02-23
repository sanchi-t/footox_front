import {
    Box,
    Button,
    Image,
    Flex,
    useMediaQuery,
    Heading,
    Text,
    border,
    Spacer,
    Input,
  } from "@chakra-ui/react";
  import { useNavigate } from "react-router-dom";
  import React from "react";
  import axios from "axios";
  import { useEffect, useState } from "react";
  import { useLocation } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import Container from "react-bootstrap/Container";
  import Header from "../components/Header";
  import Footer from "../components/Footer";
  import Row from "react-bootstrap/Row";
  import Col from "react-bootstrap/Col";
  import { Select } from "@chakra-ui/react";
  import {
    deleteCoupon,
    getCoupon,
    getData,
    deleteData,
    updateData,
  } from "../redux/DataReducer/action";
  import { DeleteIcon, Icon, EditIcon, ArrowForwardIcon } from "@chakra-ui/icons";
  const WishlistPage = () => {
   const [prod, setProd] = useState([]);
       const [nishu, setNishu] = useState({
      orders: [],
      products: [],
    });
    let num = 0;
    var filteredProducts1 = [];
  
      // const [products, setProducts] = useState(null);
      const location = useLocation();
      const email = location.state.email;
    
      const axiosTest = async () =>{
        const response = await axios.get("http://localhost:4000/getOrder");
  
         const response1 = await axios.get("http://localhost:4000/getImage");
    
      // prod.push(response.data);
      // prod.push(response1.data);
      // const orders = response.data;
      // const products = response1.data;
      setProd(response.data);
  
      setNishu({
          orders: response.data,
          products : response1.data,
      })
       
      }
     
    
      useEffect(()=>{
        axiosTest();
    
      }, []);
      const myStyle = {
          borderRadius:'2px',
          borderColor:'black'
      }
  
  
      console.log('prod2', nishu.orders);
       console.log('prod', prod);
      // setProd(nishu.orders);
      const prod1 = nishu.orders.filter((items) =>items.email_reciever === email);
      console.log(prod1,'aman');
       console.log('prod233', nishu.products);
  
      //  const items = prod1[0].items;
      //  const id = [];
      //  for(let i = 0 ; i< items.length; i++){
      //     id.push( items[i].id.split("/"));
      //  }
      //  console.log('ids', id);
  
       {prod1.map((item, num1) => (
            <>
              {item.items.map((orders, index) => {
                  num = num + 1;
                
                  //  const id = [];
                   const id = orders.id.split("/");
                   const proid = id[0];
                   console.log(proid);
      
  
                  //   var sku = products.productId + "/" + col + "/" + item;
  
                     var products = nishu.products?.find((item1)=>item1.productId===proid); 
                     console.log(products)
                    
  
                    filteredProducts1[num - 1] = {
                      user : item.name_reciever,
                      productName: products.productName,
                      image : products.image[0][0],
                      Quantity: orders.quantity,
                      price :orders.price ? orders.price: 0,
                      Status : item.status,
                      // Quantity: nishu.Quantity ,
                    };
                    console.log(filteredProducts1,'asdcfv');
                    
  
              })}
            </>
          ))}
  
    
  
    return (
      <>
        {/* <AdminNavbar /> */}
        <br />
        <Header/>
        
        <Heading style={{paddingLeft:'3%',fontSize:'40px'}}>Wishlist</Heading>
        <br></br>
  
        <Box
          m="auto"
          w={"95%"}
          bg={'#50CF96'}
          boxShadow={"rgba(80, 270, 150, 0.24) 0px 3px 8px"}
          p={"1.1rem"}
        >
          {/* <Flex alignItems={"left"} textAlign={"left"}>
            <Box
              m="auto"
              w={"40%"}
              p={"1rem"}
            >
              <Flex
                alignItems={"center"}
                textAlign={"center"}
                justifyContent={"stretch"}
                my={"1"}
              >
                <Container className="rounded border-right-0-dark">
                  <Row>
                    <Col className="rounded border border-dark">
  
                      <Select
                        //   name="Color"
                        // variant="outline"
                        style={{border: 'none'}}
                        placeholder="Attribute"
                        onChange={(e) => handleAttributes(e)}
                      >
                        <option value="Product Id">Product Id</option>
                        <option value="Product Name">Product Name</option>
                        <option value="Status">Status</option>
                        <option value="Quantity">Quantity</option>
                      </Select>
                    </Col>
                    <Col className="rounded border border-dark">
                      <Select
                        //   name="Color"
                        style={{border: 'none'}}
                        placeholder="Operations"
                        onChange={(e) => handleOperator(e)}
                      >
                        <option value="Contains">Contains</option>
                        <option value="Equals">Equals</option>
                      </Select>
                    </Col>
                    <Col className="rounded border border-dark">
                      <Input
                        type={"text"}
                        style={textStyle}
                        onChange={handleInputFilter}
                        value={InputFilter}
                      ></Input>
                    </Col>
  
                   
                  </Row>
  
                  
                </Container>
              </Flex>
            </Box>
            <Spacer />
          </Flex> */}
         
         
          {filteredProducts1.map((item, index) => (
              <>
             <Box
          m="auto"
          w={"95%"}
          bg={'#F5F5F4'}
          boxShadow={"rgba(12, 0, 0, 0.24) 0px 3px 8px"}
          p={"1.1rem"}
        >
            
            <Flex
              alignItems={"center"}
              textAlign={"center"}
              justifyContent={"space-between"}
              my={"5"}
              fontSize={["7px", "10px", "12px", "15px"]}
            >
              {/* <Box w="15%">{index + 1}</Box> */}
              <Box width={"10%"} mx={"2"}>
                <Image
                  width={"50%"}
                  src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ae07b5f1-8847-4f07-957b-6bc625b9b308/sb-force-58-skate-shoes-LJNW5L.png"
                  alt={item.productName}
                />
              </Box>
              <Box w="15%"><Text fontSize='1.4em' fontWeight='bold' >{item.productName}</Text></Box>
              {/* <Box w="15%"><Text fontSize='1.4em' fontWeight='bold' >Qty:{item.Quantity}</Text></Box> */}
             
              {/* {isLargerThan ? <Box w="15%">{item.productName}</Box> : null} */}
              {/* <Box w="15%">{item.productGender}</Box> */}
              <Box w="10%"><Text fontSize='1.4em' fontWeight='bold' > Rs. {item.price}</Text></Box>
              
              <Box
                w="15%"
              //   bg={item.Status === "Stock Updated" ? "#198754" : "#DC3444"}
              >
                {/* <Text fontSize='1.4em' fontWeight='bold'> {item.Status}</Text> */}
              </Box>
              <Box>
                <Flex
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  w="10%"
                >
                  {/* <Box mx={"3"}>
                    <Button>
                      <Icon
                        as={DeleteIcon}
                        color="red"
                        onClick={() => deleteProduct(item.productId)}
                      />
                    </Button>
                  </Box> */}
                  <Box mx={"3"}>
                   
                      {/* id={item.productId}
                      products={products}
                      dispatch={dispatch} */}
                    
                    
                  </Box>
                </Flex>
              </Box>
            </Flex>
            </Box>
            <br></br>
            </>
            
            
          ))}
  
        </Box>
        <br>
        </br>
        <Footer/>
      </>
    );
  };
  
  export default WishlistPage;