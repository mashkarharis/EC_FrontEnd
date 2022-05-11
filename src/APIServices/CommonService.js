import axios from "axios";

export default class CommonService {
  static get() {
    return axios.get("/web/private/summary");
  }
}