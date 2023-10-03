import { Box,Card, CardBody, Text } from "@chakra-ui/react";
import AlertDialogM from "../../../components/Alert";

const Message = ({ data }) => {
  return (
    <Card mb={2}>
      <CardBody>
        <Text>Name: {data.name}</Text>
        <Text>Email: {data.email}</Text>
        <Text>Message: {data.message}</Text>
        <Box mt={2}>
          <AlertDialogM
            label={"Delete"}
            collection={"contactUs"}
            id={data.id}
            msg={"Message"}
            nav={"/"}
          />
        </Box>
      </CardBody>
    </Card>
  );
};

export default Message;
