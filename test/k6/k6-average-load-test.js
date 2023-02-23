import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

export const options = {
  stages: [
    { duration: '10s', target: 10 }, // ramp up load
    { duration: '10s', target: 10 }, // maintain load
    { duration: '10s', target: 0 }, // ramp down load
  ],
};

const sharedData = new SharedArray('Shared Logins', function () {
  const data = JSON.parse(open('../fixtures/films.json'));
  return data;
});

const baseUrl = 'http://localhost:3000';

export function setup() {
  for (let i = 0; i < sharedData.length; i += 1) {
    http.post(`${baseUrl}/api/films`, JSON.stringify(sharedData[i]), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export default function () {
  // List all resources
  let res = http.get(`${baseUrl}/api/films`);
  check(res, {
    'List resource status was 200': (r) => r.status === 200,
    'List resource transaction time OK': (r) => r.timings.duration < 200,
  });
  sleep(1);

  const films = res.json();
  const film = films[Math.floor(Math.random() * films.length)];
  res = http.get(`${baseUrl}/api/films/${film._id}`);
  check(res, {
    'Get film status is 200': (r) => r.status === 200,
    'Film title checks': (r) => r.json().title === film.title,
    'Film year checks': (r) => r.json().year === film.year,
    'Film genre checks': (r) => r.json().genre === film.genre,
    'Film director checks': (r) => r.json().director === film.director,
  });
}
