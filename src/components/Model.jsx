import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

const Model = ({ data }) => {
  console.log(data);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>View</Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Booking Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <UnorderedList>
              <ListItem>Booking Id: {data.id}</ListItem>
              <ListItem>Customer Name: {data.userName}</ListItem>

              <ListItem>Car Name: {data.carName}</ListItem>
              <ListItem>Pick Location:-{data.pickLocation}</ListItem>
              <ListItem>
                Pick Up Date & Time:-{data.pickupDate} {data.pickupTime}
              </ListItem>
              <ListItem>Drop Location:-{data.dropLocation}</ListItem>
              <ListItem>
                Drop Up Date & Time:-{data.pickupDate} {data.pickupTime}
              </ListItem>
              <ListItem>Status: {data.status}</ListItem>
              <ListItem>Phone No:-{data.number}</ListItem>
              <ListItem>Total Cost:-{data.totalRent}</ListItem>
            </UnorderedList>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default Model;
