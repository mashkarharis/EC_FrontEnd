import axios from "axios";

export default class CareTakerService {
  static get() {
    return axios.get("/web/private/caretaker/list");
  }

  static delete(houseid, email) {
    const body = {
      homeId: houseid,
      email: email,
    };
    return axios.post("/web/private/caretaker/delete", body);
  }

  static update(data) {
    console.log(data);
    const body = {
      homeId: data.homeId,
      nic: data.nic,
      name: data.name,
      address: data.address,
      phone: data.phone,
      email: data.email,
    };
      return axios.post("/web/private/caretaker/update", body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  }
  
  static add(data) {
    console.log(data);
    const body = {
      homeId: data.homeId,
      nic: data.nic,
      name: data.name,
      address: data.address,
      phone: data.phone,
      email: data.email,
      password: data.password,
    };
      return axios.post("/web/private/caretaker/add", body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  }
}
