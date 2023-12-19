import {
  Box,
  Button,
  Card,
  Center,
  Icon,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link} from "react-router-dom";

const RegisterSuccess = () => {
  return (
    <Center minH="100vh">
        <Card
          bg={{
            base: "white",
            md: "white",
          }}
          p={{
            base: "4",
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
          //  showCard={true}
        >
          <VStack spacing={6}>
            <Icon as={FaCheckCircle} boxSize="48px" color="#059669" />
            <Text textStyle="h4" fontWeight="medium" color="p.black">
              Successfully Registration
            </Text>
            <Text textAlign="center" textStyle="p2" color="black.60">
              Hurray! You have successfully created your account. Enter the app
              to explore all it’s features.
            </Text>
            <Box w="full">
              <Link to={"/signin"}>
                <Button w="full">Enter the App</Button>
              </Link>
            </Box>
          </VStack>
        </Card>
    </Center>
  );
};

export default RegisterSuccess;
