import { useEffect, useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import { useForm } from "react-cool-form";
import CareTakerService from "../../APIServices/CareTakerService";
import ElderService from "../../APIServices/ElderService";
import Colors from "../../Constants/colors";
import "./style.css";

export default function ElderModal({
  data,
  editableId,
  backUI,
  updateView,
  homedata,
}) {
  console.log("-------");
  console.log(homedata);

  const [ctNICS, SetCTNICS] = useState(data.careTakerNics);
  const [homeId, SetHomeID] = useState(data.homeIds[0].value);
  const [ctNIC, SetCTNIC] = useState(data.careTakerNics[0].value);


  useEffect(() => {
    homedata.forEach((element) => {
      if (element.homeId == homeId) {
        console.log(element.careTakers);
        var array = [];
        array.push(<option value={null}></option>);
        element.careTakers.forEach((ct) => {
          array.push(<option value={ct.nic}>{ct.nic}</option>);
        });
        SetCTNICS(array);
      }
    });
  }, [homeId]);

  useEffect(() => {
    SetCTNIC(ctNICS.length > 0 ? ctNICS[0].value : null);
  }, [ctNICS]);

  const Field = ({
    label,
    id,
    ftype,
    editable,
    initValue,
    required,
    ...rest
  }) => (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        step="0.01"
        defaultValue={initValue}
        disabled={!editable}
        id={id}
        {...rest}
        required={required}
        type={ftype}
      />
    </div>
  );

  const Select = ({
    value,
    disabled,
    onChange,
    label,
    id,
    children,
    ...rest
  }) => (
    <div>
      <label htmlFor={id}>{label}</label>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        id={id}
        {...rest}
        required
      >
        {children}
      </select>
    </div>
  );

  const Textarea = ({ label, id, ...rest }) => (
    <div>
      <label htmlFor={id}>{label}</label>
      <textarea id={id} {...rest} />
    </div>
  );

  const { form } = useForm({
    onSubmit: (values) => {
      console.log(values);
      editableId
        ? ElderService.add(values).then((response) => {
            updateView(backUI);
          })
        : ElderService.update(values).then((response) => {
            updateView(backUI);
          });
    },
    onError: (errors) => console.log("onError: ", errors),
  });

  return (
    <Container >
      <Modal
        show={true}
        onHide={() => {
          updateView(backUI);
        }}
        backdrop="static"
        keyboard={false}
        style={{
          backgroundColor: Colors.primary,
        }}
      >
        <Modal.Header
          style={{
            alignSelf: "stretch",
          }}
          closeButton
        >
          <Modal.Title>Add/Update Elders</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form ref={form}>
            <Select
              value={homeId}
              children={data.homeIds}
              onChange={(event) => {
                console.log(event.target.value);
                SetHomeID(event.target.value);
              }}
              label="House ID"
              id="homeId"
              name="homeId"
              disabled={!editableId}
            />
            <Select
              value={ctNIC}
              onChange={(event) => {
                SetCTNIC(event.target.value);
              }}
              children={ctNICS}
              label="CareTaker NIC"
              id="careTakerNic"
              name="careTakerNic"
              disabled={!editableId}
            />

            <Field
              initValue={data.nic}
              editable={editableId}
              label="Elder NIC"
              id="nic"
              name="nic"
              required
              ftype="text"
            />

            <Field
              initValue={data.name}
              editable={true}
              label="Name"
              id="name"
              name="name"
              required
              ftype="text"
            />
            <Field
              initValue={data.address}
              editable={true}
              label="Address"
              id="address"
              name="address"
              required
              ftype="text"
            />
            <Field
              initValue={data.phone}
              editable={true}
              label="Phone"
              id="phone"
              name="phone"
              required
              ftype="text"
            />

            <Field
              initValue={data.mac}
              editable={true}
              label="Device MAC"
              id="mac"
              name="mac"
              ftype="text"
            />

            <input type="submit" />
          </form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
