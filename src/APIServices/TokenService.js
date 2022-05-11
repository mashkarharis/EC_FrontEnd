import axios from "axios";
import URLS from "../Constants/urls";

export default class TokenService {
  static introspect() {
    var token = localStorage.getItem("token");
    const body = { token: token!=null?token:'' };
    return axios.post("/web/protected/introspect", body,{
        headers: {
          'Content-Type': 'application/json'
        }
      });
  }

  static login(username,password){
      const body={
          username:username,
          password:password
      }
      return axios.post("/web/protected/login", body,{
        headers: {
          'Content-Type': 'application/json'
        }
      });
  }
}
