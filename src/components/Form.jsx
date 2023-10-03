import {
  FormControl,
  Grid,
  GridItem,
  Input,
  FormLabel,
  Box,
  Heading,
  RadioGroup,
  Stack,
  Radio,
  Select,
  Flex,
  Image,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { carInput, overview } from "../constants";
import { useState } from "react";
import { Logo } from "../assets";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";

const Form = ({ type, editData }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [Hide, setHide] = useState(false);

  const navigate = useNavigate();
  const values = editData;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: editData,
    values,
  });

  const SelectOption = ({ label, Option, name }) => {
    return (
      <GridItem>
        <FormControl isRequired>
          <FormLabel>{label}</FormLabel>
          <Select {...register(name, { required: true })}>
            <option>
               {label}
            </option>
            {Option.map((item, i) => (
              <option value={item} key={i}>
                {item}
              </option>
            ))}
          </Select>
        </FormControl>
      </GridItem>
    );
  };

  // Save Data
  const upload = async () => {
    setHide(true);
    const name = new Date().getTime() + selectedFile.name;
    const storageRef = ref(storage, name);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error);
        toast.error("Error Occurred In uploading Image");
        setHide(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          toast.success("Image successfully Uploaded");
          setValue("img", downloadURL);
        });
      }
    );
  };
  const { id } = useParams();

  const onSubmit = async (data) => {
    setProgress(true);
    if (type === "Add") {
      try {
        await addDoc(collection(db, "car"), {
          ...data,
          timeStamp: serverTimestamp(),
        });
        reset(data);
        toast.success("Car successfully added ");
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      } catch (error) {
        console.log(error);
        toast.error("Error Occurred In Car Added");
      }
    }
    if (type == "Edit") {
      const up = doc(db, "car", id);
      try {
        await updateDoc(up, {
          ...data,
        });
        toast.success("Car successfully Updated ");
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    }

    setProgress(false);
  };

  return (
    <Box backgroundColor={"#ffff"} p={10} mt={{ base: "20", md: "0" }} mb={5}>
      <Flex justify={"space-between"} mb={5}>
        <Heading as={"h6"} fontSize={"2xl"}>
          {type} Car
        </Heading>
        <Link to={"/view"}>
          <Button colorScheme="blue">Back</Button>
        </Link>
      </Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
          gap={6}
        >
          {carInput.map((car, i) => (
            <GridItem w="100%" key={i}>
              <FormControl isRequired>
                <FormLabel> {car.label} </FormLabel>
                <Input
                  type={car.type}
                  placeholder={car.placeholder}
                  {...register(`${car.name}`, { required: true })}
                />
              </FormControl>
            </GridItem>
          ))}

          <SelectOption
            name="Brand"
            label="Select Brand"
            Option={[
              "Toyota",
              "Honda",
              "Ford",
              "Chevrolet",
              "Nissan",
              "BMW",
              "Audi",
              "Hyundai",
              "Tesla",
              "Kia",
            ]}
          ></SelectOption>
          <SelectOption
            name="transmission"
            label="Select Transmission"
            Option={["Automatic", "Manual"]}
          ></SelectOption>
          <SelectOption
            name="fuel"
            label="Fuel Type"
            Option={["Gas", "Electric", "Petrol"]}
          ></SelectOption>
          <SelectOption
            name="cat"
            label="Categories"
            Option={[
              "Economy",
              "Premium",
              "Standard",
              "Specialty",
              "Minivan",
              "Convertible",
            ]}
          ></SelectOption>

          <GridItem colSpan={{ base: "1", md: "2" }} w="100%">
            <Flex
              w="100%"
              justify={"space-around"}
              flexDirection={{ base: "column", md: "row" }}
              gap={2}
            >
              {overview.map((item, i) => (
                <RadioGroup  key={i}>
                  <FormLabel>{item.label}</FormLabel>
                  <Stack spacing={5} direction="row">
                    <Radio
                      colorScheme="green"
                      value="Yes"
                      name={item.name}
                      {...register(item.name, { required: true })}
                    >
                      Yes
                    </Radio>
                    <Radio
                      colorScheme="red"
                      value="No"
                      name={item.name}
                      {...register(item.name, { required: true })}
                    >
                      No
                    </Radio>
                  </Stack>
                </RadioGroup>
              ))}
            </Flex>
          </GridItem>

          <GridItem>
            <FormLabel>Upload Car Image</FormLabel>
            <Flex
              alignItems={"center"}
              gap={5}
              flexDirection={{ base: "column", md: "row" }}
            >
              <Flex
                alignItems={"center"}
                gap={5}
                className="custom-file-input "
              >
                <Image
                  borderRadius="full"
                  boxSize="100px"
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : editData?.img
                      ? editData?.img
                      : Logo
                  }
                  alt="Car Image"
                />
                <input
                  type="file"
                  id="fileInput"
                  className="input-file"
                  {...register("img")}
                  onChange={(e) => (
                    setSelectedFile(e.target.files[0]), setHide(false)
                  )}
                />
                <label htmlFor="fileInput" className="custom-button">
                  Choose File
                </label>
                <span className="file-name">
                  {selectedFile ? selectedFile.name : "No file selected"}
                </span>
              </Flex>
              {selectedFile ? (
                <Button isDisabled={Hide} onClick={upload}>
                  Upload
                </Button>
              ) : (
                <></>
              )}
            </Flex>
          </GridItem>

          <GridItem>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Enter Description About Car"
              {...register("desc", { required: true })}
            />
          </GridItem>

          <GridItem colSpan={{ base: "1", md: "2" }}>
            <Flex justify={"center"}>
              <Button
                colorScheme="teal"
                variant="solid"
                type="submit"
                w={"20%"}
                isLoading={
                  progress !== null && progress < 100 && progress !== false
                    ? true
                    : false
                }
              >
                Save
              </Button>
            </Flex>
          </GridItem>
        </Grid>
      </form>
    </Box>
  );
};

export default Form;
