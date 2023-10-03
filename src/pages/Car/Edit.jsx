import { useParams } from "react-router-dom";
import Form from "../../components/Form";
import { GetData } from "../../firebase";

const Edit = () => {
  const { id } = useParams();
  const data=GetData(id)
  return <Form type="Edit" editData={data} />;
};

export default Edit;
