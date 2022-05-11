import axios from "axios";

export default class ElderService {
  static get() {
    return axios.get("/web/private/elder/list");
  }

  static delete(houseid, careTakerNic, nic) {
    const body = {
      homeId: houseid,
      careTakerNic: careTakerNic,
      nic: nic,
    };
    return axios.post("/web/private/elder/delete", body);
  }

  static update(data) {
    console.log(data);
    const body = {
      homeId:data.homeId,
      careTakerNic: data.careTakerNic,
      nic: data.nic,
      name: data.name,
      address: data.address,
      phone: data.phone,
      mac:data.mac,
    };
    return axios.post("/web/private/elder/update", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static add(data) {
    console.log(data);
    const body = {
      homeId:data.homeId,
      careTakerNic: data.careTakerNic,
      nic: data.nic,
      name: data.name,
      address: data.address,
      phone: data.phone,
      mac:data.mac,
    };
    return axios.post("/web/private/elder/add", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
