import { Button, Container, Modal } from "react-bootstrap";
import { useForm } from "react-cool-form";
import CareTakerService from "../../APIServices/CareTakerService";
import Colors from "../../Constants/colors";
import "./style.css";

export default function CareTakerModal({
  data,
  editableId,
  backUI,
  updateView,
}) {
  console.log("-------");
  console.log(data.homeIds);
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

  const Select = ({ disabled, label, id, children, ...rest }) => (
    <div>
      <label htmlFor={id}>{label}</label>
      <select disabled={disabled} id={id} {...rest}>
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
        ? CareTakerService.add(values).then((response)=>{updateView(backUI)})
        : CareTakerService.update(values).then((response)=>{updateView(backUI)});
    },
    onError: (errors) => console.log("onError: ", errors),
  });

  return (
    <Container>
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
          <Modal.Title>Add/Update CareTakers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form ref={form}>
            <Select children={data.homeIds} label="House ID" id="homeId" name="homeId" disabled={!editableId}>
              
            </Select>
            <Field
              initValue={data.email}
              editable={editableId}
              label="Email"
              id="email"
              name="email"
              required
              ftype="email"
            />
            <Field
              initValue={data.nic}
              editable={true}
              label="NIC"
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
              initValue={data.password}
              editable={editableId}
              label="Password"
              id="password"
              name="password"
              required
              ftype="password"
            />

            <input type="submit" />
          </form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
