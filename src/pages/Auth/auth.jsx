import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { bgImg } from "../../assets";
import { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function SimpleCard() {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const { dispatch } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const data = {
          uid: user.uid,
          email: user.email,
          providerData: user.providerData,
        };

        navigate("/");
        toast.success("Login Success 😀");
        dispatch({ type: "LOGIN", payload: data });
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };
  return currentUser ? (
    <Navigate to={"/"} />
  ) : (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      backgroundImage={bgImg}
    >
      <Box w={"container.sm"} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box
          rounded={"lg"}
          // eslint-disable-next-line react-hooks/rules-of-hooks
          bg={useColorModeValue("white", "gray.100")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Stack >
                <Stack
                 
                  align={"start"}
                  justify={"end"}
                >
                  <Text color={"blue.400"}>Forgot password?</Text>
                </Stack>
                {error && (
                  <Text color={"red"} textAlign={"center"}>
                    Wrong email or password ! 😔
                  </Text>
                )}
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}
