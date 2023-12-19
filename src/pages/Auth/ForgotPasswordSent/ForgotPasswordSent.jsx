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
import { useParams } from "react-router-dom";

const ForgotPasswordSent = () => {
    const params = useParams();
    const { email } = useParams();
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
            We have sent instructions on how to reset your password to{" "}
            <Box as="b" color="black">
              {email}
            </Box>
            . Please follow the instructions from the email.
          </Text>
        </VStack>
      </Card>
    </Center>
  );
};

export default ForgotPasswordSent;
