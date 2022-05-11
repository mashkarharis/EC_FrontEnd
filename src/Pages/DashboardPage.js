import { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import CommonService from "../APIServices/CommonService";
import DashCard from "../Components/DashCard";
import ElderHouseMap from "../Components/Map/ElderHouseMap";
import ElderHomeModal from "../Components/Modal/ElderHomeModal";
import ElderHouseMapModel from "../Components/Modal/ElderHouseMapModel";
import Colors from "../Constants/colors";
export default function DashboardPage({ updateView }) {
  const [show, setShow] = useState(false);
  const [disableBtn,setDisableBtn]=useState(true);

  const [summary, setSummary] = useState({
    noOfDevices: "-",
    noOfHomes: "-",
    noOfElders: "-",
    noOfCareTakers: "-",
    homes:[]
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    CommonService.get().then((request) => {
      setSummary(request.data);
      setDisableBtn(false);
    });
  }, []);

  return (
    <Container>
      <Row style={{ justifyContent: "end" }}>
        <Button
          onClick={() => {
            localStorage.clear();
            updateView(<DashboardPage updateView={updateView} />);
          }}
          variant="primary"
          style={{
            width: "350px",
            height: "50px",
            fontSize: 20,
            backgroundColor: "red",
            border: "none",
          }}
        >
          LogOut
        </Button>
      </Row>
      <Row>
        <DashCard header={"Registered Eldery Homes"} number={summary.noOfHomes}></DashCard>
      </Row>
      <Row style={{ justifyContent: "end" }}>
        <Button
          onClick={handleShow}
          disabled={disableBtn}
          variant="primary"
          style={{
            width: "350px",
            height: "50px",
            fontSize: 20,
            backgroundColor: Colors.primary,
            border: "none",
          }}
        >
          View On Map
        </Button>
      </Row>
      <Row>
        <DashCard header={"Number of Elders"} number={summary.noOfElders}></DashCard>
      </Row>
      <Row>
        <DashCard header={"No of Caretakers"} number={summary.noOfCareTakers}></DashCard>
      </Row>
      <Row>
        <DashCard header={"No of Devices"} number={summary.noOfDevices}></DashCard>
      </Row>
      <ElderHouseMapModel handleClose={handleClose} homes={summary.homes} show={show} />
    </Container>
  );
}
