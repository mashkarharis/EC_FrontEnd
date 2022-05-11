import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-cool-form";
import Colors from "../../Constants/colors";
import { ElderHouseMap } from "../Map/ElderHouseMap";

export default function ElderHouseMapModel({ show, handleClose,homes }) {
  
  return (
    <Modal
      show={show}
      onHide={handleClose}
      keyboard={false}
    >
      <div style={{width:"100vw",height:"85vh", alignSelf:"center"}}>
        <ElderHouseMap homes={homes}/>
        </div>
    </Modal>
  );
}
