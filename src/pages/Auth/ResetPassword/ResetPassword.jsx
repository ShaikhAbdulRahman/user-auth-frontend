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
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { object, string, ref } from "yup";

const resetValidationSchema = object({
  password: string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  repeatpassword: string()
    .oneOf([ref("password"), null], "Passwords must match")
    .required("Repeat password is required"),
});

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const {id,token}= useParams()
  const toast = useToast();
  const navigate=useNavigate()

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true)
    try {
      const response = await axios.post(`https://user-authentication-backend-six.vercel.app/reset-password/${id}/${token}`,
      {
        password: values.password,
      });
     
    if (response.status === 200){
      toast({
        title: "Password reset successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/reset-success")
    } else {
      toast({
        title: "error",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
    } catch (error) {
      toast({
        title:"Something went Wrong. Please try again later",
        status:"error",
        duration:1000,
        isClosable:true
      });
    } finally {
      setSubmitting(false);
    } setLoading(false)
  };
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
        <Text textStyle="h1" fontWeight="medium" color="p.black">
          Reset Password
        </Text>
        <Text mt="16px" textStyle="p2" color="black.60">
          Enter your new password.
        </Text>
        <Formik
          initialValues={{
            password: "",
            repeatpassword: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={resetValidationSchema}
        >
          {() => (
            <Form>
              <Stack mt="30px" spacing={6}>
                <Field name="password">
                  {({ field, meta }) => (
                    <FormControl isInvalid={!!(meta.error && meta.touched)}>
                      <FormLabel htmlFor="password">New Password</FormLabel>
                      <Input
                        {...field}
                        name="password"
                        type="password"
                        placeholder="Enter your password..."
                      />{" "}
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="repeatpassword">
                  {({ field, meta }) => (
                    <FormControl isInvalid={!!(meta.error && meta.touched)}>
                      <FormLabel htmlFor="repeatpassword">
                        Repeat New Password
                      </FormLabel>
                      <Input
                        {...field}
                        name="repeatpassword"
                        type="password"
                        placeholder="Enter your repeatPassword..."
                      />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Stack>
              <Button mt="24px" w="full" colorScheme="gray" type="submit">
                {loading ? <Spinner/> : "Reset Password"}
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Center>
  );
};

export default ResetPassword;
