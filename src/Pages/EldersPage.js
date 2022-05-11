import { Button, Container, Row } from "react-bootstrap";
import ElderHomeTable from "../Components/Tables/ElderHomeTable";
import EldersTable from "../Components/Tables/EldersTable";
import Colors from "../Constants/colors";
import { useEffect, useState } from "react";
import ElderModal from "../Components/Modal/ElderModal";
import HomeService from "../APIServices/HomeService";

export default function EldersPage({updateView}) {
  const [homes, setHomes] = useState([]);
  const [homedata,setHomeData]=useState([]);
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    HomeService.get().then((response) => {
      console.log(response.data);
      if (response.status == 200) {
        var array = [];
        array.push(<option value={null}></option>);
        response.data.forEach((element) => {
          array.push(
            <option value={element["homeId"]}>{element["homeId"]}</option>
          );
        });
        console.log(homes);
        setHomeData(response.data);
        setHomes(array);
        setHidden(false);
      }
    });
  }, []);
  return (
    <Container>
      <h2>Elders</h2>
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
              <ElderModal
              homedata={homedata}
                data={{
                  homeIds: homes,
                  careTakerNics:[<option value={null}></option>],
                  nic: "",
                  name: "",
                  address: "",
                  phone: "",
                  mac: "",
                }}
                editableId={true}
                backUI={<EldersPage updateView={updateView} />}
                updateView={updateView}
              />
            );
          }}
        >
          Add New
        </Button>
      </Row>
      <EldersTable updateView={updateView} homes={homes} homedata={homedata}/>
    </Container>
  );
}
