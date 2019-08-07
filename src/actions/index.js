import axios from "axios";

export const FETCH_OOMPAS = "FETCH_OOMPAS";
export const FETCH_OOMPA = "FETCH_OOMPA";

const ROOT_URL = "https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas";

export function fetchOompas() {
  const request = axios.get(ROOT_URL);

  return {
    type: FETCH_OOMPAS,
    payload: request
  };
}

export function fetchOompa(id) {
  const request = axios.get(`${ROOT_URL}/${id}`);

  return {
    type: FETCH_OOMPA,
    payload: request
  };
}
