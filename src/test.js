import http from "k6/http";

export default function () {
  const res = http.get("http://localhost:8080/test");
  //const res = http.get('http://loadbalancer.wtm-upc.online:8080/test');
  console.log(res.status);
}
