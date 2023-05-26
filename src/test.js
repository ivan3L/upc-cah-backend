import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 60, // 60 virtual users
  iterations: 60,
  //duration: '12s', // Run the test for 30 seconds
};

export default function () {
  //const res = http.get('http://localhost:8080/test');
  const res = http.get('http://loadbalancer.wtm-upc.online:8080/test');
  console.log(res.status);

  // Counter variable to track the number of iterations
  //sleep(5);
  
}
