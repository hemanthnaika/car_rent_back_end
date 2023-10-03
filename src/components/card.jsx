import {
  Card,
  CardBody,
  Image,
  Text,
  Flex,
  Box,
  Badge,
  Heading,
  
} from "@chakra-ui/react";

function CarCard({data}) {
  return (
    <Card maxW="xs" minH={"xs"} maxH={"xs"} _hover={{ backgroundColor: "blue.50", cursor:"pointer"}} boxShadow='lg'  rounded='md' bg='white'>
      <CardBody >
        <Image
          src={data.img}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
          p={0}
          m={0}
          w={350}
          h={200}
          objectFit={"contain"}
        />
        <Flex mt="6" spacing="3" justify={"space-between"} px={3} pb={2}>
          <Box>
            <Heading as="h6" size="md">
            {data.carname}
            </Heading>
            <Text fontSize="md" fontWeight={"500"} mt={2}>
            {data.desc}
            </Text>
          </Box>
          <Box>
            <Badge colorScheme="green" fontSize={'md'} px={2} rounded={'md'}>₹ {data.price}</Badge>
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
}

export default CarCard;
