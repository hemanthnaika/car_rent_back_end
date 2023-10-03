import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ButtonComp = ({ label, link, col }) => {
    
  return (
    <Link to={link}>
      <Button >{label}</Button>
    </Link>
  );
};

export default ButtonComp;
