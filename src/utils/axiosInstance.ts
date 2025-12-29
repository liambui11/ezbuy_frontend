import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const API_URL ="http://localhost:8081/api";
const LOGIN_URL = "/login";

declare module "axios" {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

const handleLogout = () => {
  // 1. Xóa Cookies
  Cookies.remove("accessToken");
  Cookies.remove("refresh_token");

  // 2. Xóa LocalStorage
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    
    // 3. Chuyển hướng về trang login
    // Kiểm tra để tránh reload loop nếu đang ở trang login rồi
    if (window.location.pathname !== LOGIN_URL) {
      window.location.href = LOGIN_URL;
    }
  }
};

// 🧠 Kiểm tra token hết hạn
const isTokenExpired = (token: string) => {
  try {
    const decoded: any = jwtDecode(token);
    if (!decoded.exp) return true;
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

// 🔁 Gọi API refresh token
export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken && !Cookies.get("accessToken")) {
        return null;
      }
    }

    // if (typeof window !== "undefined") {
    //   localStorage.setItem("user", JSON.stringify({}));
    //   window.dispatchEvent(new Event("auth:changed"));
    // }

    // const refreshToken = Cookies.get("refreshToken");
    // if (!refreshToken) {
    //   return null;
    // }

    const res = await axios.post(
      `${API_URL}/auth/refresh-token`,
      {},
      { withCredentials: true }
    );

    console.log("Test Token",res)
    console.log("🔍 accessToken hiện có:", Cookies.get("accessToken"));
    console.log("🔍 refresh_token hiện có:", Cookies.get("refresh_token"));


    const newAccessToken = res.data?.data?.accessToken || res.data?.accessToken;

    if (newAccessToken) {
      Cookies.set("accessToken", newAccessToken, {
        expires: 0.02, // 30 phút
        path: "/",
      });

      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", newAccessToken);
  
        if (res?.data.data.fullName) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              fullName: res.data.data.fullName,
              imageUrl: res.data.data.imageUrl || null,
              role: res.data.data.role,
            })
          );
        }
      }
      return newAccessToken;
    }

    handleLogout();
    return null;
  } catch (err) {
    console.error("🔴 Refresh token failed:", err);
    handleLogout();
    return null;
  }
};

// 🚀 axios instance
export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// 🧩 Quản lý hàng đợi refresh
let isRefreshing = false;
let failedQueue: {
  resolve: (token?: string | null) => void;
  reject: (error: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// 🛡️ Request Interceptor
axiosInstance.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    if (typeof window === "undefined") {
      return config;
    }

    let token: string | null = null;

    try {
      token = Cookies.get("accessToken") || localStorage.getItem("accessToken");
    } catch {
      token = Cookies.get("accessToken") || null;
    }

    // Nếu token hết hạn → refresh
    if (token && isTokenExpired(token)) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = await refreshAccessToken();
          console.log("Test TOken 2", newToken);
          processQueue(null, newToken);
          if (newToken) token = newToken;
        } catch (err) {
          processQueue(err, null);
        } finally {
          isRefreshing = false;
        }
      } else {
        // Nếu đang refresh thì chờ
        return new Promise<InternalAxiosRequestConfig>((resolve, reject) => {
          failedQueue.push({
            resolve: (newToken) => {
              if (!config.headers)
                config.headers = new AxiosHeaders();
              (config.headers as AxiosHeaders).set(
                "Authorization",
                `Bearer ${newToken}`
              );
              resolve(config);
            },
            reject: (err) => reject(err),
          });
        });
      }
    }

    // Gắn token vào header
    if (token) {
      if (!config.headers) config.headers = new AxiosHeaders();
      (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🚨 Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      // Nếu chưa thử refresh thì gọi refresh
      const originalRequest = error.config!;
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        const newToken = await refreshAccessToken();
        if (newToken) {
          (originalRequest.headers as any)['Authorization'] = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        }
      }
    }
    return Promise.reject(error);
  }
);

