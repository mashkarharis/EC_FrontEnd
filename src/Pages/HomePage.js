import { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import ElderHomeTable from "../Components/Tables/ElderHomeTable";
import ElderHomeModal from "../Components/Modal/ElderHomeModal";
import Colors from "../Constants/colors";

export default function HomePage({ updateView }) {
  return (
    <Container>
      <h2>Elder Homes</h2>
      <Row style={{ justifyContent: "end" }}>
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
              <ElderHomeModal
                data={{
                  id: "",
                  name: "",
                  address: "",
                  phone: "",
                  lat: "",
                  lon: "",
                }}
                editableId={true}
                backUI={<HomePage updateView={updateView} />}
                updateView={updateView}
              />
            );
          }}
        >
          Add New
        </Button>
      </Row>
      <ElderHomeTable updateView={updateView} />
    </Container>
  );
}
