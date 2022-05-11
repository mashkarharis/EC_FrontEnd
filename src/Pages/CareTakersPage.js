import { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import CareTakerTable from "../Components/Tables/CareTakerTable";
import EldersTable from "../Components/Tables/EldersTable";
import CareTakerModal from "../Components/Modal/CareTakerModal";
import Colors from "../Constants/colors";
import HomeService from "../APIServices/HomeService";

export default function CareTakersPage({ updateView }) {
  const [homes, setHomes] = useState([]);
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    HomeService.get().then((response) => {
      console.log(response.data);
      if (response.status == 200) {
        var array = [];
        response.data.forEach((element) => {
          array.push(
            <option value={element["homeId"]}>{element["homeId"]}</option>
          );
        });
        console.log(homes);
        setHomes(array);
        setHidden(false);
      }
    });
  }, []);
  return (
    <Container>
      <h2>Care Takers</h2>
      <Row style={{ justifyContent: "end" }} hidden={hidden}>
        <Button
          style={{
            width: "250px",
            height: "40px",
            fontSize: 15,
            backgroundColor: Colors.primary,
            border: "none",
          }}
          onClick={() => {
            updateView(
              <CareTakerModal
                data={{
                  homeIds: homes,
                  nic: "",
                  name: "",
                  address: "",
                  phone: "",
                  email: "",
                  password: "",
                }}
                editableId={true}
                backUI={<CareTakersPage updateView={updateView} />}
                updateView={updateView}
              />
            );
          }}
        >
          Add New
        </Button>
      </Row>
      <CareTakerTable updateView={updateView} homes={homes} />
    </Container>
  );
}
