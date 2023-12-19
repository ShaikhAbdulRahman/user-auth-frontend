import {
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
import { HiOutlineArrowLeft } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { object, string, ref } from "yup";

const forgotValidationSchema = object({
  email: string().email("Email is invalid").required("Email is required"),
});

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleForgotPassword = async (values) => {
    try {
      setLoading(true);
      const response = await fetch("https://user-authentication-backend-six.vercel.app/user/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Password reset instructions sent to your email",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate(`/forgot-success/${values.email}`);
      } else {
        toast({
          title: `${data.status}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Something went Wrong. Please try again later",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
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
        <Link to="/signin">
          <Icon as={HiOutlineArrowLeft} boxSize={6} />
        </Link>
        <Text mt={4} textStyle="h1" fontWeight="medium" color="p.black">
          Forgot Password
        </Text>
        <Text mt="16px" textStyle="p2" color="black.60">
          Enter your email address for which account you want to reset your
          password.
        </Text>
        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={(values) => {
            setEmail((prev) => (prev = values.email));
            handleForgotPassword({ email: values.email });
          }}
          validationSchema={forgotValidationSchema}
        >
          {() => (
            <Form>
              <Stack mt="30px" spacing={6}>
                <Field name="email">
                  {({ field, meta }) => (
                    <FormControl isInvalid={!!(meta.error && meta.touched)}>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input
                        {...field}
                        name="email"
                        placeholder="Enter your email..."
                      />{" "}
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Stack>
              <Button isLoading={loading} mt="24px" w="full" colorScheme="gray" type="submit">
                {loading ? <Spinner/> : "Reset Password"}
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Center>
  );
};
export default ForgotPassword;
