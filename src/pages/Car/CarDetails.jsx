import {
  Grid,
  GridItem,
  Box,
  Heading,
  Flex,
  ButtonGroup,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import TableC from "../../components/Table";

import AlertDialogM from "../../components/Alert";
import { useParams } from "react-router-dom";
import { GetData } from "../../firebase";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default function CarDetails() {
  const { id } = useParams();
  const data = GetData(id);
  const [Booking, setBooking] = useState([]);
  const TH = ["User Name", "Start Date", "End Date", "Status"];

  useEffect(() => {
    const getBooking = async () => {
      try {
        const q = query(
          collection(db, "rentHistory"),
          where("Data.carID", "==", id)
        );
        const querySnapshot = await getDocs(q);
        let list = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setBooking(list);
      } catch (error) {
        console.log(error);
      }
    };
    getBooking();
  }, [id]);

  const ReButton = ({ label, link, col }) => {
    return (
      <Link to={link}>
        <Button colorScheme={col}>{label}</Button>
      </Link>
    );
  };

  return (
    <>
      {data?.carname ? (
        <Box
          backgroundColor={"#FCFCFC"}
          p={5}
          mt={{ base: "28", md: "5" }}
          rounded={"md"}
        >
          <Flex justify={"space-between"} alignItems={"center"} mb={2}>
            <Heading as="h1" fontSize={"2xl"} color={"#11142D"}>
              Details
            </Heading>
            <ButtonGroup>
              <ReButton label="Back" col="blue" link="/view" />
              <ReButton label="Edit" col="blue" link={`/car/edit/${id}`} />
              <AlertDialogM label="Delete" collection={"car"} id={id} />
            </ButtonGroup>
          </Flex>
          <Box>
            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
              gap={6}
            >
              <GridItem w="100%">
                <Box w="100%">
                  <Image src={data?.img} w={"100%"} rounded={"lg"} />
                </Box>
                <Box px={{ base: "1", md: "7" }} py={5}>
                  <Flex justify={"space-between"} alignItems={"center"}>
                    <Heading as="h4" fontSize={"2xl"}>
                      {data?.carname}
                    </Heading>
                    <Heading as="h5" fontSize={"xl"} color={"#475BE8"}>
                      Price <br />₹ {data?.price}
                    </Heading>
                  </Flex>

                  <Text textAlign={"justify"} mt={"5"}>
                    {data?.desc}
                  </Text>
                </Box>
              </GridItem>
              <GridItem>
              <Box mt={5}>
                    <Heading as="h6" fontSize={"2xl"} pl={2}>
                      Overview
                    </Heading>
                    <Grid
                      templateColumns="repeat(2, 1fr)"
                      gap={3}
                      mt={5}
                      pl={5}
                    >
                        
                      <GridItem w="100%">
                        <Text fontWeight={"500"}>Model:- {data?.carmodel}</Text>
                      </GridItem>
                      <GridItem w="100%">
                        <Text fontWeight={"500"}>Brand:- {data?.Brand}</Text>
                      </GridItem>
                      <GridItem w="100%">
                        <Text fontWeight={"500"}>Categories:- {data?.cat}</Text>
                      </GridItem>
                      <GridItem w="100%">
                        <Text fontWeight={"500"}>Reg No:- {data?.regno}</Text>
                      </GridItem>
                      <GridItem w="100%">
                        <Text fontWeight={"500"}>Seating Capacity:- {data?.seat}</Text>
                      </GridItem>
                      <GridItem w="100%">
                        <Text fontWeight={"500"}>Fuel:- {data?.fuel}</Text>
                      </GridItem>
                      <GridItem w="100%">
                        <Text fontWeight={"500"}>MPG:- {data?.mpg}</Text>
                      </GridItem>
                      <GridItem w="100%">
                        <Text fontWeight={"500"}>AC:- {data?.ac}</Text>
                      </GridItem>
                      <GridItem w="100%">
                        <Text fontWeight={"500"}>GPS:- {data?.gps}</Text>
                      </GridItem>
                      <GridItem w="100%">
                        <Text fontWeight={"500"}>Music:- {data?.music}</Text>
                      </GridItem>
                      <GridItem w="100%" colSpan={2}>
                        <Text fontWeight={"500"}>
                          Transmission:-{" "}
                          {data.transmission}
                        </Text>
                      </GridItem>
                    </Grid>
                  </Box>
              </GridItem>
            </Grid>
          </Box>
          <Box></Box>
        </Box>
      ) : (
        <>no data</>
      )}
    </>
  );
}
