import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import uuid from "react-uuid";
import ElderService from "../../APIServices/ElderService";
import EldersPage from "../../Pages/EldersPage";
import ElderModal from "../Modal/ElderModal";
import ReactRoundedImage from "react-rounded-image";

export default function EldersTable({ updateView, homedata }) {
  const [elders, setElders] = useState([]);
  const [tableSnapShotId, setTableSnapShotId] = useState(uuid().toString());

  useEffect(() => {
    ElderService.get().then((response) => {
      console.log(response.data);
      if (response.status == 200) {
        setElders(response.data);
      }
    });
  }, [tableSnapShotId]);
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Image</th>
          <th>NIC</th>
          <th>Name</th>
          <th>Init. Address</th>
          <th>Family Contact No.</th>
          <th>House ID</th>
          <th>CareTaker NIC</th>
          <th>Device MAC</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {elders.map((data) => {
          return (
            <tr key={uuid()}>
              <td>
                <ReactRoundedImage
                  imageWidth="60"
                  imageHeight="60"
                  roundedSize="0"
                  image={data.image.length>0?data.image:"https://www.collinsdictionary.com/images/full/tree_267376982.jpg"}
                />
              </td>
              <td>{data.nic}</td>
              <td>{data.name}</td>
              <td>{data.address}</td>
              <td>{data.phone}</td>
              <td>{data.houseid}</td>
              <td>{data.careTakerNic}</td>
              <td>{data.mac}</td>
              <td>
                <Button
                  onClick={() => {
                    updateView(
                      <ElderModal
                        homedata={homedata}
                        data={{
                          homeIds: [
                            <option value={data.houseid}>
                              {data.houseid}
                            </option>,
                          ],
                          careTakerNics: [
                            <option value={data.careTakerNic}>
                              {data.careTakerNic}
                            </option>,
                          ],
                          nic: data.nic,
                          name: data.name,
                          address: data.address,
                          phone: data.phone,
                          mac: data.mac,
                          image: data.image,
                        }}
                        editableId={false}
                        backUI={<EldersPage updateView={updateView} />}
                        updateView={updateView}
                      />
                    );
                  }}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  onClick={() => {
                    console.log("Delete");
                    ElderService.delete(
                      data.houseid,
                      data.careTakerNic,
                      data.nic
                    ).then((response) => {
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
