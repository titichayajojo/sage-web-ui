
import axios from "axios";
import { ERROR_CODES, HTTP_METHODS, STATUS_CODES } from "./constant";

export async function request({
  // baseURL = process.env.NEXT_PUBLIC_BASE_URL,
  baseURL = "http://localhost:3000",
  body = null, // eg. for POST
  method = HTTP_METHODS.get,
  token = "",
  url = "",
}) {
  // TODO: find all component test cases that not handle promise then next line could be removed
  // const newToken =
  //   withAuthorization && forceRenewToken ? await renewToken() : token;

  return axios({
    baseURL,
    method,
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: body,
  });
}
