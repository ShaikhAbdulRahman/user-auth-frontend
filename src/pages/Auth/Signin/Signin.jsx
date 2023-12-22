import {
    Box,
    Button,
    Card,
    Center,
    Checkbox,
    Container,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    Spinner,
    Stack,
    Text,
    useToast,
  } from "@chakra-ui/react";
  import React, { useState } from "react";
  import { Link} from "react-router-dom";
  import { Formik, Form, Field } from "formik";
  import { object, string, ref } from "yup";
import useAuth from "../../../hooks/useAuth";

const signinValidationSchema = object({
    email: string().email("Email is invalid").required("Email is required"),
    password: string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

const SignIn = () => {
  const [loading , setLoading]=useState(false)
  const toast = useToast()
  const {login}= useAuth()
  const handleSignIn= async(values)=>{
    try {
      setLoading(true)
      const response= await fetch("https://user-authentication-backend-six.vercel.app/user/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify(values)
      });
      
      const data = await response.json()
  if (response.ok){
    toast({
      title:"Successfully Login",
      status:"success",
      duration:3000,
      isClosable:true
    })
    const {token}=data;
    if (token){
      login(token)
    }
  } else{
    toast({
      title: `${data.message}`,
      status:"error",
      duration:3000,
      isClosable:true
    })
  }
    } catch (error) {
      toast({
        title:"Something Went Wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    } finally{
      setLoading(false)
    }
  }


    return(
        // <Container bg={{ base: "white", md: "none" }}>
        <Center minH="100vh">
          <Card
            bg={{
              base: "white",
              md: "white",
            }}
            p={{
              base: "6",
              md: "6",
            }}
            borderRadius={{
              base: "16px",
              md: "1rem",
            }}
            boxShadow={{
              base: "none",
              md: "0px 4px 20px rgba(0,0,0,0.05)",
            }}
            width={{
              base: "360px",
              md: "456px",
            }}
          >
            <Text textStyle="h1" fontWeight={500}>
              Welcome to Crypto App
            </Text>
            <Text textStyle="p2" color="black.60" mt="16px">
              Enter your credentials to access the account.
            </Text>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={handleSignIn}
              validationSchema={signinValidationSchema}
            >
              {() => (
                <Form>
                  <Stack mt="40px" spacing={6}>
                    <Field name="email">
                      {({ field, meta }) => (
                        <FormControl isInvalid={!!(meta.error && meta.touched)}>
                          <FormLabel htmlFor="email">Email</FormLabel>
                          <Input
                            {...field}
                            name="email"
                            placeholder="Enter your email..."
                          />
                          <FormErrorMessage>{meta.error}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="password">
                      {({ field, meta }) => (
                        <FormControl isInvalid={!!(meta.error && meta.touched)}>
                          <FormLabel htmlFor="password">Password</FormLabel>
                          <Input
                            {...field}
                            name="password"
                            type="password"
                            placeholder="Enter your password..."
                          />
                          <FormErrorMessage>{meta.error}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <HStack justify="space-between">
                      <Checkbox>
                        <Text fontSize="12px">Remember me</Text>
                      </Checkbox>
                      <Text>
                        <Link to="/forgot-password">
                          <Text textStyle="p3" as="span" color="p.purple">
                            Forget Password?
                          </Text>
                        </Link>
                      </Text>
                    </HStack>
                    <Box>
                      <Button
                        isLoading={loading}
                        w="full"
                        type="submit"
                        colorScheme="gray"
                      >
                {loading ? <Spinner/> : "Log In"}
                      </Button>
                      <Link to="/signup">
                        <Button mt={3} w="full" variant="outline">
                          Create New Account
                        </Button>
                      </Link>
                    </Box>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Card>
        </Center>
      // </Container>
    )
  }
export default SignIn;