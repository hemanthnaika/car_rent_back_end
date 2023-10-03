import { Card, Flex, Heading } from "@chakra-ui/react";

import { CardBody} from "@chakra-ui/react";
import { Count } from "../../../firebase";

const CardC = ({ coll, name }) => {
  const data = Count(coll);
  return (
    <Card>
      <CardBody>
      <Heading size="md" textAlign={"center"}>
          Total {name} :- {data}
        </Heading>
      </CardBody>
    </Card>
  );
};

export default CardC;
