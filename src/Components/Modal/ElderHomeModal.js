import { Button, Container, Modal } from "react-bootstrap";
import { useForm } from "react-cool-form";
import uuid from "react-uuid";
import HomeService from "../../APIServices/HomeService";
import Colors from "../../Constants/colors";
import "./style.css";

export default function ElderHomeModal({
  data,
  editableId,
  backUI,
  updateView,
}) {
  console.log(data);
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

  const Select = ({ label, id, children, ...rest }) => (
    <div>
      <label htmlFor={id}>{label}</label>
      <select id={id} {...rest}>
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
    defaultValues: data,
    onSubmit: (values) => {
      console.log(values);
      editableId
        ? HomeService.add(values).then((response)=>{updateView(backUI)})
        : HomeService.update(values).then((response)=>{updateView(backUI)});
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
          <Modal.Title>Add/Update Elder Home</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form ref={form}>
            <Field
              initValue={data.id}
              editable={editableId}
              label="ID"
              id="id"
              name="id"
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
              initValue={data.lat}
              editable={true}
              label="Latitude"
              id="lat"
              name="lat"
              required
              ftype="number"
            />
            <Field
              initValue={data.lon}
              editable={true}
              label="Longitude"
              id="lon"
              name="lon"
              required
              ftype="number"
            />

            <input type="submit" />
          </form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
