import { check } from "k6";
import http from "k6/http";

const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";

export const options = {
  stages: [
    { duration: "10s", target: 10 },
    { duration: "10s", target: 100 },
    { duration: "10s", target: 10 },
    { duration: "10s", target: 0 },
  ],
};

export default function () {
  const res = http.get(`${BASE_URL}/api/users`);
  check(res, {
    "Get status is 200": r => r.status === 200,
  });
}
