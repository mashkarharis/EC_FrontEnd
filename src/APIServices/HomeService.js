import axios from "axios";

export default class HomeService {
  static get() {
    return axios.get("/web/private/home/list");
  }

  static delete(homeId) {
    const body = { homeId: homeId };
    return axios.post("/web/private/home/delete", body);
  }

  static add(data) {
    const body = {
      homeId: data.id,
      homeName: data.name,
      homeAddress: data.address,
      phone: data.phone,
      lat: data.lat,
      lon: data.lon,
    };
    return axios.post("/web/private/home/add", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static update(data) {
    const body = {
      homeId: data.id,
      homeName: data.name,
      homeAddress: data.address,
      phone: data.phone,
      lat: data.lat,
      lon: data.lon,
    };
    return axios.post("/web/private/home/update", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
