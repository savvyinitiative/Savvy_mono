import axios from "axios";

import { getSession } from "next-auth/react";


// const axios = require("axios");
const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;




let client = axios.create({
  baseURL: baseUrl,
  withCredentials: true,

});

let lastSession: any | null = null;

client.interceptors.request.use(
  async (request) => {
    if (lastSession == null || Date.now() > Date.parse(lastSession.expires)) {
      const session = await getSession();
      lastSession = session;
    }

  

    if (lastSession) {
      request.headers.Authorization = `Bearer ${lastSession?.raw_token}`;
    } else {
      request.headers.Authorization = undefined;
    }

    return request;
  },
  (error) => {
    console.error(`API Error: `, error);
    throw error;
  }
);
export default client;

