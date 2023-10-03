import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Tfoot,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";

const TableC = ({ th, data }) => {
 
  return (
    <TableContainer mt={5}>
      <Table variant="simple">
        <Thead>
          <Tr >
            {th.map((item, i) => (
              <Th key={i}>{item}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data ? (
            data.map((item, i) => (
              <Tr key={i}>
                <Td>{i + 1}</Td>
                <Td>{item.userName}</Td>
                
                <Td>
                  <Flex align={"center"} gap={3} flexDirection={"column"} justifyItems={"center"}>
                    <Image src={item.img} width={"100px"} />
                    {item.carName}
                  </Flex>
                </Td>
                <Td>
                  {item.dropDate} {item.dropUpTime}
                </Td>
                <Td>
                  {item.pickupDate} {item.pickupTime}
                </Td>

                <Td>{item.pickLocation}</Td>
                <Td>{item.dropLocation}</Td>

                <Td>
                  <Text
                    background={
                      item.status === "Cancelled" ? "red.500" : "green.500"
                    }
                    px={2}
                    py={2}
                    textColor={"white"}
                  >
                    {item.status}
                  </Text>
                </Td>
              </Tr>
            ))
          ) : (
            <></>
          )}
        </Tbody>
        <Tfoot></Tfoot>
      </Table>
    </TableContainer>
  );
};

export default TableC;
