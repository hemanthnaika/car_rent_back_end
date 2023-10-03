import { Avatar, Box, Flex, Heading, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
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
  Table,
  TableContainer,
  Td,
  Thead,
  Tr,
  Th,
  Tbody,
} from "@chakra-ui/react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase/firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import AlertDialogM from "../../components/Alert";

export const Brand = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const TH = ["ID", "Brand Name", "Image", "Action"];

  const [file, setFile] = useState("");
  const { register, handleSubmit, setValue, reset } = useForm({});

  const [per, setPer] = useState(null);
  useEffect(() => {
    const uploadFile = () => {
      // eslint-disable-next-line no-unused-vars
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setPer(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setValue("img", downloadURL);
          });
        }
      );
    };
    file && uploadFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const onSubmit = async (data) => {
    try {
      await addDoc(collection(db, "Brand"), {
        ...data,
        timeStamp: serverTimestamp(),
      });

      toast.success("Car Brand Add Successful 😀 ");
      reset(data);
    } catch (error) {
      console.log(error);
      toast.error("Error Occurred In Car Brand Add 🙄");
    }
  };

  const [brand, setbrand] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "Brand"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setbrand(list);
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
      <Flex justify={"space-between"} alignItems={"center"}>
        <Heading as={"h3"} fontSize={"xl"}>
          Car Brands
        </Heading>
        <Button onClick={onOpen} colorScheme={"blue"}>
          Add Brand
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
            <AlertDialogHeader>Add Car Brand</AlertDialogHeader>
            <AlertDialogCloseButton />
            <form onSubmit={handleSubmit(onSubmit)}>
              <AlertDialogBody>
                <Flex
                  justify={"center"}
                  w={"full"}
                  mb={5}
                  position={"relative"}
                >
                  <img
                    width={"100px"}
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                  />

                  <Input
                    onChange={(e) => setFile(e.target.files[0])}
                    type="file"
                    position={"absolute"}
                    left={"20%"}
                    top={"20%"}
                    w={"50%"}
                    opacity={0}
                  />
                </Flex>

                <Input
                  type="text"
                  placeholder="Enter the brand name"
                  {...register("brandName", { required: true })}
                />
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button
                  ref={cancelRef}
                  onClick={onClose}
                  colorScheme="green"
                  type="submit"
                  isLoading={per !== null && per < 100}
                >
                  Save
                </Button>
                <Button colorScheme="red" ml={3}>
                  Cancel
                </Button>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      </Flex>
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
            {brand.map((brand, i) => (
              <Tr key={i}>
                <Td>{i + 1}</Td>
                <Td>{brand.brandName}</Td>
                <Td>
                  <Avatar size="xl" src={brand.img} />
                </Td>
                <Td>
                  <AlertDialogM
                    label="Delete"
                    collection={"Brand"}
                    id={brand.id}
                    msg={"Brand" + " " + brand.brandName}
                    nav={"/brand"}
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
