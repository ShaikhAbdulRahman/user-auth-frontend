import {
  Box,
  Button,
  Card,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  Spinner,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { object, string } from "yup";

const forgotValidationSchema = object({
  number: string().required("OTP is required"),
});

const ForgotPasswordSent = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { email, } = useParams();
  const [id,setId]=useState(null)
  const [token,setToken]=useState(null)

  const handleOTPVerification = async (values) => {
    try {
      const response = await fetch("https://user-authentication-backend-six.vercel.app/forgot-password-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp: values.number,
        }),
      });
  
      const data = await response.json();
      console.log(data);
  
      if (response.ok) {
        toast({
          title: "OTP Verified Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        if (data.id && data.token) {
        setId(data.id);
        setToken(data.token);
        } else {
          console.error("ID or token is missing in the server response");
        }
      } else {
        toast({
          title: `${data.status}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast({
        title: "Something went wrong. Please try again later",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } 
  };

  useEffect(()=>{
    if(id !==null && token !== null){
      navigate(`/reset-password-verify/${id}/${token}`)
    }
  },[id,token,navigate])
  return (
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
        <VStack spacing={6}>
          <Icon as={FaCheckCircle} boxSize="48px" color="#059669" />
          <Text textStyle="h4" fontWeight="medium" color="p.black">
            Successfully Sent
          </Text>
          <Text textAlign="center" textStyle="p2" color="black.60">
            We have sent the OTP on your email address {" "}
            <Box as="b" color="black">
              {email}
            </Box>
            . Please follow the instructions from the email.
          </Text>
        </VStack>
        <Formik
          initialValues={{
            number: "",
          }}
          onSubmit={(values) => {
            handleOTPVerification(values);
          }}
          validationSchema={forgotValidationSchema}
        >
          {() => (
            <Form>
              <Stack mt="30px" spacing={6}>
                <Field name="number">
                  {({ field, meta }) => (
                    <FormControl isInvalid={!!(meta.error && meta.touched)}>
                      <FormLabel htmlFor="number">OTP</FormLabel>
                      <Input
                        {...field}
                        name="number"
                        placeholder="Enter your OTP..."
                      />{" "}
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Stack>
              <Button mt="24px" w="full" colorScheme="gray" type="submit">
              Enter the OTP
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Center>
  );
};

export default ForgotPasswordSent;
