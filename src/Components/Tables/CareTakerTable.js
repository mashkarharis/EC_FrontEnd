import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import uuid from "react-uuid";
import CareTakerService from "../../APIServices/CareTakerService";
import CareTakersPage from "../../Pages/CareTakersPage";
import CareTakerModal from "../Modal/CareTakerModal";

export default function CareTakerTable({updateView,homes}) {
  const [cts, setCts] = useState([]);
  const [tableSnapShotId, setTableSnapShotId] = useState(uuid().toString());

  useEffect(() => {
    CareTakerService.get().then((response) => {
      console.log(response.data);
      if (response.status == 200) {
        setCts(response.data);
      }
    });
  }, [tableSnapShotId]);
  return (
    <Table  striped bordered hover responsive>
      <thead>
        <tr>
          <th>NIC</th>
          <th>Name</th>
          <th>Address</th>
          <th>Phone No.</th>
          <th>House ID</th>
          <th>Email</th>
          <th>No Of Elders</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {cts.map((data) => {
          return (
            <tr key={uuid()}>
              <td>{data.nic}</td>
              <td>{data.name}</td>
              <td>{data.address}</td>
              <td>{data.phone}</td>
              <td>{data.houseid}</td>
              <td>{data.email}</td>
              <td>{data.noofelders}</td>
              <td>
                <Button
                  onClick=
                  {()=>{
                    updateView(<CareTakerModal data={{
                      homeIds: [<option value={data.houseid}>{data.houseid}</option>],
                      nic: data.nic,
                      name: data.name,
                      address: data.address,
                      phone: data.phone,
                      email: data.email,
                      password: "Can't Edit",
                    }} editableId={false} backUI={<CareTakersPage updateView={updateView}/>} updateView={updateView}/>)
                  }}                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  onClick={() => {
                    console.log("Delete");
                    CareTakerService.delete(data.houseid,data.email).then((response) => {
                      if (response.status == 200) {
                        setTableSnapShotId(uuid().toString());
                      }
                    });
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
