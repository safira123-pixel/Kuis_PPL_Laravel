//login
import { findBetween } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";
import http from "k6/http";
import { check, group, sleep, fail } from "k6";

export const options = {
  // vus: 1, // 1 user looping for 1 minute
  // duration: "1m",

  // thresholds: {
  //   http_req_duration: ["p(99)<1500"], // 99% of requests must complete below 1.5s
  // },
  stages: [
    { duration: "60s", target: 60 },
    { duration: "30s", target: 60 },
    { duration: "50s", target: 0 },
  ],
  thresholds: {
    // http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    // http_req_duration: ["p(99)<200"], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = "http://127.0.0.1:8000";
const EMAIL = "superadmin@gmail.com";
const PASSWORD = "password";

export default () => {
  const loginRes = http.post(`${BASE_URL}/login`, {
    email: EMAIL,
    password: PASSWORD,
  });

  check(loginRes, {
    "logged in successfully": (resp) => resp.json("token") !== "",
  });

  const authHeaders = {
    headers: {
      "X-CSRF-TOKEN": `$('meta[name="csrf-token"]').attr("content")`,
    },
  };

  const userList = http.get(`${BASE_URL}/user-management/user`, authHeaders);

  check(userList, {
    "is status 200": (r) => r.status === 200,
  });
  const title = findBetween(userList.body, "<h1>", "</h1>");
  check(title, {
    "title is correct": (t) => t === "User List",
  });

  http.get(`${BASE_URL}/auth/logout`, authHeaders);

  sleep(1);
};
// import http from 'k6/http';
// import { sleep } from 'k6';

// export default function () {
//   http.get('http://127.0.0.1:8000/');
//   sleep(1);
// }