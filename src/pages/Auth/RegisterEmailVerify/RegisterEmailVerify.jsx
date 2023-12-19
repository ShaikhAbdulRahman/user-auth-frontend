import {
  Box,
  Button,
  Card,
  Center,
  Icon,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { MdEmail } from "react-icons/md";

const RegisterEmailVerify = () => {
  return (
    <Center minH="100vh">
      <Card
        bg={{
          base: "transparent",
          md: "white",
        }}
        p={{
          base: "0",
          md: "6",
        }}
        borderRadius={{
          base: "none",
          md: "1rem",
        }}
        boxShadow={{
          base: "none",
          md: "0px 4px 20px rgba(0,0,0,0.05)",
        }}
        width="456px"
        showCard={true}
      >
        <VStack spacing={6}>
          <Icon as={MdEmail} boxSize="48px" color="p.purple" />
          <Text textStyle="h4" fontWeight="medium" color="p.black">
            Email Verification
          </Text>
          <Text textAlign="center" textStyle="p2" color="black.60">
            We have sent you an email verification to{" "}
            <Box as="b" color="black">
              {/* {email} */}
            </Box>
            . If you didn’t receive it, click the button below.
          </Text>
          <Button
            w="full"
            variant="outline"
          >
            Re-Send Email
          </Button>
        </VStack>
      </Card>
    </Center>
  );
};
export default RegisterEmailVerify;
