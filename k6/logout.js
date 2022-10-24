// kuis logout
import http from 'k6/http';
import { check, group, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '5s', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
    { duration: '10s', target: 100 }, // stay at 100 users for 10 minutes
    { duration: '5s', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
    // 'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'http://127.0.0.1:8000/logout';
const EMAIL = 'superadmin@gmail.com';
const PASSWORD = 'password';
// export function testLogin (){
//   let res = http.get(`${BASE_URL}/dashboard`)

//   check(res, {
//     'response code was 302' : (res) => res.status == 302,
  
//   })
// }


export function testLogout (){
  let res = http.post(`${BASE_URL}`,{
    email: EMAIL,
    password: PASSWORD,
  })

  check(res, {
    'response code was 302' : (res) => res.status == 302,
  
  })
}


export default () => {
  // const loginRes = http.get(`${BASE_URL}`);

  // check(loginRes, {
  //   'logged in successfully': (resp) => resp.json('access') !== '',
  // });

 

  sleep(1);
};