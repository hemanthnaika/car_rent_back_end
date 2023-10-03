import {
  Box,
  Card,
  CardBody,
  Flex,
  Grid,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Cards from "./components/Card";

import BookingH from "../Booking/bookingHistory";
import { Link } from "react-router-dom";
import { BsFillCarFrontFill } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { GrAddCircle } from "react-icons/gr";
import Message from "./components/Message";
import Users from "../Users/Users";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const Home = () => {
  const Details = [
    { Heading: "Booking", coll: "rentDetails" },
    { Heading: "Customer", coll: "user" },
    { Heading: "Car", coll: "car" },
    { Heading: "Brand", coll: "Brand" },
  ];
  const More = [
    { icon: BsFillCarFrontFill, link: "/view", text: "View Car" },
    { icon: FiUsers, link: "/users", text: " View Users" },
    { icon: GrAddCircle, link: "/car/add", text: "Add Car" },
    { icon: GrAddCircle, link: "/brand", text: "Add Brand" },
  ];

  const [msg, setMsg] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "contactUs"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setMsg(list);
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
    <Box mt={{ base: "20", sm: "10" }}>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      >
        {Details.map((item, i) => (
          <Cards key={i} coll={item.coll} name={item.Heading} />
        ))}

        {More.map((item, i) => (
          <Link to={item.link} key={i}>
            <Card>
              <CardBody>
                <Flex
                  gap={5}
                  align={"center"}
                  justify={"center"}
                  fontSize={"md"}
                  fontWeight={"bold"}
                >
                  {" "}
                  <item.icon style={{ fontSize: "1.5rem", color: "blue" }} />
                  <Text>{item.text}</Text>
                </Flex>
              </CardBody>
            </Card>
          </Link>
        ))}
      </SimpleGrid>

      <Grid
        mb={5}
        mt={5}
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
        gap={6}
      >
        <Box mt={5}>
          <Card mb={3}>
            <CardBody>
              <Text>User Query:-</Text>
            </CardBody>
          </Card>
          {msg.map((item) => (
            <Message key={item.id} data={item} />
          ))}
        </Box>
        <Users />
      </Grid>
    </Box>
  );
};

export default Home;
