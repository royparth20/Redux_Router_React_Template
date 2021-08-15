import client from "./client";

export default function addAuthTokenInterceptor(store) {
  client.interceptors.request.use((req) => {
    const token = store.getState().auth.token;
    if (!token) return req;
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  });
}
