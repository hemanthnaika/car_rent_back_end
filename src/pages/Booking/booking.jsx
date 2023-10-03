import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  getDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Select,
  Button,
  Image,
} from "@chakra-ui/react";

import toast from "react-hot-toast";
import Model from "../../components/Model";

const Booking = () => {
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "rentDetails"),
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

  const TH = [
    "SNO",
    "User Name",
    "Car Name",
    "Car Image",
    "Start Date",
    "Status",
    "Edit",
  ];

  // Update Status
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    const bookingId = e.target.getAttribute("data-booking-id");
    const statusRef = doc(db, "rentDetails", bookingId);
    try {
      await updateDoc(statusRef, {
        status: newStatus,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Booking
  const handleDelete = async (id) => {
    try {
      const docRef = doc(db, "rentDetails", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await addDoc(collection(db, "rentHistory"), {
          ...docSnap.data(),
          timeStamp: serverTimestamp(),
        });
        await deleteDoc(doc(db, "rentDetails", id));
        toast.success("Rent successfully Deleted");
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      backgroundColor={"#FCFCFC"}
      p={5}
      mt={{ base: "28", md: "5" }}
      rounded={"md"}
    >
      <Heading as="h3" fontSize={"lg"}>
        Booking
      </Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              {TH?.map((item, i) => (
                <Th key={i}>{item}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {booking?.map((item, i) => (
              <Tr key={i}>
                <Td>{i + 1}</Td>
                <Td>{item.userName}</Td>
                <Td>{item.carName}</Td>
                <Td>
                  <Image src={item.img} width={"100px"} />
                </Td>
                <Td>
                  {item.pickupDate} {item.pickupTime}
                </Td>
                <Td>{item.status}</Td>
                <Td>
                  <Select
                    onChange={handleStatusChange}
                    data-booking-id={item.id}
                  >
                    <option
                      value="Booked"
                      hidden={item.status === "Booked" ? true : false}
                    >
                      Booked
                    </option>
                    <option
                      value="Live"
                      hidden={item.status === "Live" ? true : false}
                    >
                      Live
                    </option>
                    <option
                      value="Completed"
                      hidden={item.status === "Completed" ? true : false}
                    >
                      Completed
                    </option>
                    <option
                      value="Cancelled"
                      hidden={item.status === "Cancelled" ? true : false}
                    >
                      Cancelled
                    </option>
                  </Select>
                </Td>
                {item.status === "Completed" || item.status === "Cancelled" ? (
                  <Td>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </Td>
                ) : (
                  <></>
                )}
                <Td>
                  <Model data={item} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default Booking;
