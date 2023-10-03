import { Box, Heading } from "@chakra-ui/react";
import TableC from "../../components/Table";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const BookingH = () => {
  const TH = [
    "SNO",
    "Customer Name",
    
    "Car ",
    "Start Date",
    "End Date",
    "Pick Up",
    "Drop Up",
    "Status",
  ];
  const [Booking, setBooking] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "rentHistory"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setBooking(list);
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
      backgroundColor={"#FCFCFC"}
      p={5}
      mt={{ base: "28", md: "5" }}
      rounded={"md"}
    >
      <Heading as="h3" fontSize={"lg"}>
        Booking History
      </Heading>
      <TableC th={TH} data={Booking} />
    </Box>
  );
};
export default BookingH;
