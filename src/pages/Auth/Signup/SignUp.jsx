import {
  Button,
  Card,
  Center,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { object, string, ref } from "yup";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
// import { useMutation } from "react-query";

const signupValidationSchema = object({
  name: string().required("Name is required"),
  surname: string().required("Surname is required"),
  email: string().email("Email is invalid").required("Email is required"),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  repeatpassword: string()
    .oneOf([ref("password"), null], "Passwords must match")
    .required("Repeat password is required"),
});

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const toast = useToast()
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [showRepPassword, setShowRepPassword] = useState(false);
  const handleClick = () => setShow(!show);
  const handleRepPassword = () => setShowRepPassword(!showRepPassword)

  const handleSignUp = async (values) => {
    try {
      setLoading(true);
      const response = await fetch("https://user-authentication-backend-six.vercel.app/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
       toast({
        title:"Registration successful",
        status:"success",
        duration:3000,
        isClosable:true
       });
       setTimeout(()=>{
        navigate("/email-verify")
       },2000);
       
      } else{
        toast({
          title: `${data.message}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      }
    } catch(error){
      toast({
        title: "Error during registration",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    // <Container>
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
          <Text textStyle="h1" fontWeight="meduim">
            Welcome to Crypto App
          </Text>
          <Text textStyle="p2" color="black.60" mt="16px">
            Create a free account by filling data below.
          </Text>
          <Formik
            initialValues={{
              name: "",
              surname: "",
              email: "",
              password: "",
              repeatpassword: "",
            }}
            onSubmit={handleSignUp}
            validationSchema={signupValidationSchema}
          >
            {() => (
              <Form>
                <Stack mt="40px" spacing={6}>
                  <Flex gap="24px">
                    <Field name="name">
                      {({ field, meta }) => (
                        <FormControl isInvalid={!!(meta.error && meta.touched)}>
                          <FormLabel htmlFor="name">Name</FormLabel>
                          <Input
                            {...field}
                            name="name"
                            placeholder="Enter your name..."
                          />
                          <FormErrorMessage>{meta.error}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="surname">
                      {({ field, meta }) => (
                        <FormControl isInvalid={!!(meta.error && meta.touched)}>
                          <FormLabel htmlFor="surname">Surname</FormLabel>
                          <Input
                            {...field}
                            name="surname"
                            placeholder="Enter your surname..."
                          />
                          <FormErrorMessage>{meta.error}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
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
                      <InputGroup size="md">
                        <Input
                          {...field}
                          name="password"
                          type={show ? "text" : "password"}
                          placeholder="Enter your password..."
                        />
                        <InputRightElement width="2.8rem">
                          <IconButton isRound={true} h="1.75rem" size="md" bg="white" colorScheme="gray" onClick={handleClick}>
                            {show ? <ViewIcon />: <ViewOffIcon/>}
                          </IconButton>
                        </InputRightElement>
                      </InputGroup>
                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="repeatpassword">
                    {({ field, meta }) => (
                      <FormControl isInvalid={!!(meta.error && meta.touched)}>
                        <FormLabel htmlFor="repeatpassword">
                          Repeat Password
                        </FormLabel>
                      <InputGroup size="md">
                        <Input
                          {...field}
                          name="repeatpassword"
                          type={showRepPassword ? "text" : "password"}
                          placeholder="Enter your repeatPassword..."
                        />
                        <InputRightElement width="2.8rem">
                          <IconButton isRound={true} h="1.75rem" size="md" bg="white" colorScheme="gray" onClick={handleRepPassword}>
                            {showRepPassword ? <ViewIcon />: <ViewOffIcon/>}
                          </IconButton>
                        </InputRightElement>
                      </InputGroup>
                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  
                  <Checkbox>
                    <Text textStyle="p3">
                      I agree with{" "}
                      <Text as="span" color="p.purple">
                        Terms & Conditions.
                      </Text>
                    </Text>
                  </Checkbox>
                  <Button isLoading={loading} type="submit">
                {loading ? <Spinner/> : "Create Account"}
                  t</Button>
                  <Text
                    fontStyle={500}
                    textStyle="p3"
                    color="black.60"
                    textAlign="center"
                  >
                    Already have an account?{" "}
                    <Link to="/signin">
                      <Text as="span" color="p.purple">
                        Log In
                      </Text>
                    </Link>
                  </Text>
                </Stack>
              </Form>
            )}
          </Formik>
        </Card>
      </Center>
    // </Container>
  );
};
export default SignUp;
