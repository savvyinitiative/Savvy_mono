import axios from "axios";
import { getServerSession,  } from "next-auth";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
export const ApiClient = () => {
    const instance = axios.create({
      baseURL: baseUrl,
    });
  
    let lastSession: any | null = null;
  
    instance.interceptors.request.use(
      async (request) => {
        if (lastSession == null || Date.now() > Date.parse(lastSession.expires)) {
          const session = await getServerSession();
          lastSession = session;
        }
  
        if (lastSession) {
          request.headers.Authorization = `Bearer ${lastSession.accessToken}`;
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
  
    return instance;
  };