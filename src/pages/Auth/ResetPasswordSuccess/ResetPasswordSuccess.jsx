import {
  Box,
  Button,
  Card,
  Center,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const ResetPasswordSuccess = () => {
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
      >
        <VStack>
          <Icon as={FaCheckCircle} boxSize="48px" color="#059669" />
          <Text mt="10px" textStyle="h4" fontWeight="medium" color="p.black">
            Password Reset Done
          </Text>
          <Text mt="12px" textAlign="center" textStyle="p2" color="black.60">
            Now you can access you account.
          </Text>
          <Box w="full" mt="24px">
            <Link to={"/signin"}>
              <Button w="full">Sign In</Button>
            </Link>
          </Box>
        </VStack>
      </Card>
    </Center>
  );
};

export default ResetPasswordSuccess;
