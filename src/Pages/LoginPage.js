import { Button, Row } from "react-bootstrap";
import { useForm } from "react-cool-form";
import TokenService from "../APIServices/TokenService";
import DashboardPage from "./DashboardPage";
import "./style.css";

export default function LoginPage({ updateView }) {
  const Field = ({ label, id, ftype, required, ...rest }) => (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...rest} required={required} type={ftype} />
    </div>
  );

  const { form } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      TokenService.login(values.username, values.password).then((response) => {
        if (response.status == 200) {
          console.log(response.data);
          localStorage.setItem("token", response.data);
          updateView(<DashboardPage updateView={updateView} />);
        } else {
          alert("Login Failed");
        }
      });
    },
    onError: (errors) => console.log("onError: ", errors),
  });

  return (
    <div style={{display:"contents"}}>
      <form ref={form}>
        <Field
          label="Username"
          id="username"
          name="username"
          required
          ftype="text"
        />
        <Field
          label="Password"
          id="password"
          name="password"
          required
          ftype="password"
        />

        <Button type="submit">Log In</Button>
      </form>
    </div>
  );
}
