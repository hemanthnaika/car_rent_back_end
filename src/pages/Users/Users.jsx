import {
  Box,
  Heading,
  Table,
  TableContainer,
  Td,
  Thead,
  Tr,
  Th,
  Tbody,
  Avatar,
} from "@chakra-ui/react";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import AlertDialogM from "../../components/Alert";

const Users = () => {
  const TH = ["ID", "Name", "Image", "Action"];
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "user"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setUsers(list);
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
      backgroundColor={"#ffff"}
      rounded={"md"}
      p={5}
      mt={{ base: "28", md: "5" }}
    >
      <Heading as="h3" fontSize={"xl"}>
        Users
      </Heading>
      <TableContainer mt={5}>
        <Table variant="simple">
          <Thead>
            <Tr>
              {TH.map((item, i) => (
                <Th key={i}>{item}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user, i) => (
              <Tr key={i}>
                <Td>{i + 1}</Td>
                <Td>
                  {user.First_Name} {user.Last_Name}
                </Td>
                <Td>
                  <Avatar size="xl" src={user.img} />
                </Td>
                <Td>
                  <AlertDialogM
                    label="Delete"
                    collection={"user"}
                    id={user.id}
                    msg={"User"}
                    nav={"/users"}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Users;
