import { Box, Flex, Heading, Button, Icon } from "@chakra-ui/react";
import CarCard from "../../components/card";
import { GrAdd } from "react-icons/gr";
import { Link } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";

const ViewCar = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "car"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setCars(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  return (
    <Box
      rounded={"md"}
      p={5}
      backgroundColor={"#ffff"}
      mt={{ base: "28", md: "5" }}
    >
      <Flex justify={"space-between"} alignItems={"center"} mb={5}>
        <Heading as="h6" size="md">
          All Cars
        </Heading>
        <Link to={`/car/add`}>
          <Button colorScheme="blue">
            <Icon as={GrAdd} boxSize={4} mr={3} />
            Add Car
          </Button>
        </Link>
      </Flex>
      <Flex mt={4} flexWrap={"wrap"} gap={10} justify={"center"}>
        {cars?.map((item, i) => (
          <Link to={`/details/${item.id}`} key={i}>
            <CarCard data={item} />
          </Link>
        ))}
      </Flex>
    </Box>
  );
};

export default ViewCar;
