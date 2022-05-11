import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import uuid from "react-uuid";
import HomeService from "../../APIServices/HomeService";
import HomePage from "../../Pages/HomePage";
import ElderHomeModal from "../Modal/ElderHomeModal";

export default function ElderHomeTable({updateView }) {
  const [homes, setHomes] = useState([]);
  const [tableSnapShotId, setTableSnapShotId] = useState(uuid().toString());

  useEffect(() => {
    HomeService.get().then((response) => {
      console.log(response.data);
      if (response.status == 200) {
        setHomes(response.data);
      }
    });
  }, [tableSnapShotId]);

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>HomeId</th>
          <th>HomeName</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Lat</th>
          <th>Lon</th>
          <th>No of CareTakers</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {homes.map((data) => {
          return (
            <tr key={data.homeId}>
              <td>{data.homeId}</td>
              <td>{data.homeName}</td>
              <td>{data.homeAddress}</td>
              <td>{data.phone}</td>
              <td>{data.lat}</td>
              <td>{data.lon}</td>
              <td>{data.careTakers.length}</td>
              <td>
                <Button
                  onClick=
                  {()=>{
                    updateView(<ElderHomeModal data={{
                      id: data.homeId,
                      name: data.homeName,
                      address: data.homeAddress,
                      phone: data.phone,
                      lat: data.lat,
                      lon: data.lon,
                    }} editableId={false} backUI={<HomePage updateView={updateView}/>} updateView={updateView}/>)
                  }}                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  onClick={() => {
                    console.log("Delete");
                    HomeService.delete(data.homeId).then((response) => {
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
