import {
  CircularProgress,
  CircularProgressLabel,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";

const TotalRevenue = () => {
  return (
    <Card maxW="sm">
      <CardHeader>
        {" "}
        <Heading as="h5" size="md">
          Total Revenue
        </Heading>
      </CardHeader>
      <Flex
        h="full"
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box>
          <CircularProgress value={40} color="green.400" size="200px">
            <CircularProgressLabel>40%</CircularProgressLabel>
          </CircularProgress>
        </Box>
        <Box mb="5">
          <Text fontSize="2xl" fontWeight={"bold"}>
            Total Income
          </Text>
          <Text fontSize="lg" fontWeight={"bold"} textAlign={"center"}>
            $200000
          </Text>
        </Box>
      </Flex>
    </Card>
  );
};

export default TotalRevenue;
