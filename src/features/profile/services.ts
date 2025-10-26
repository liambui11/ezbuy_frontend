// src/features/profile/services.ts
import axios from 'axios';
import { Profile } from './types';
import { axiosInstance } from '@/utils/axiosInstance';

const API_BASE = 'http://localhost:8081/api/users';
// const API_BASE_TEST = 'http://localhost:8081/api/';

export const fetchUsers = async () =>{
    const response = await axiosInstance.get(`${API_BASE}/me`)
    return response.data.data;
}



export const fetchUpdateUsers = async (profile: Profile, file?: File): Promise<Profile> => {
    const formData = new FormData();
  
    // 🧩 gửi JSON profile đúng key mà backend chờ
    formData.append("profile", new Blob([JSON.stringify(profile)], { type: "application/json" }));
  
    // 🖼️ nếu có ảnh thì gửi đúng key 'file'
    if (file) formData.append("file", file);
  
    const res = await axiosInstance.put(`${API_BASE}/me`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  
    return res.data.data;
  };

// 🔒 Đổi mật khẩu
// export interface ChangePasswordRequest {
//   oldPassword: string;
//   newPassword: string;
//   confirmPassword: string;
// }

// export const changePassword = async (data: ChangePasswordRequest): Promise<void> => {
//   await axiosInstance.post(`${API_BASE}/change-password`, data);
// };
  