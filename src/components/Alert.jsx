import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

import { doc, deleteDoc } from "firebase/firestore";

import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const AlertDialogM = ({ label, collection, id ,msg,nav}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, collection, id));
      toast.success(`${msg} successfully deleted.`);
      onClose();
      setTimeout(() => {
      navigate(nav);
      }, 2000);
    } catch (error) {
      toast.error(`Sorry, we couldn't delete the ${msg}`);
    }
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Button onClick={onOpen} colorScheme="red">
        {label}
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Confirm {msg} Deletion</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete this {msg}?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={handleDelete}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
export default AlertDialogM;
