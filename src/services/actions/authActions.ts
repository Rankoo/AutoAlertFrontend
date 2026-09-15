import { autoAlertBackend } from "../../api/AutoAlertBackend";
import type { Permission } from "../../utils/permissions";

interface LoginCredentials {
  email: string;
  password: string;
}

export const logInAction = async (credentials: LoginCredentials) => {
  const { data } = await autoAlertBackend.post("/auth/login", credentials);
  return data;
}

export interface CurrentUserInfo {
  user:      UserInfo;
  expiresIn: number;
}

export interface UserInfo {
  id:          string;
  names:       string;
  lastNames:   string;
  email:       string;
  role:        string;
  permissions: Permission[];
}

export const getCurrentUserInfoAction = async ():Promise<CurrentUserInfo> => {
  const { data } = await autoAlertBackend.get<CurrentUserInfo>("/auth/me");
  return data;
}

export const logOutAction = async () => {
  const { data } = await autoAlertBackend.post("/auth/logOut");
  return data;
}

export interface OwnProfile {
  names: string;
  lastNames: string | null;
  email: string;
  documentTypeId: string;
  phoneNumber: string | null;
  address: string | null;
  documentNumber: string | null;
}

export interface DocumentTypeOption {
  id: string;
  name: string;
}

export const getOwnProfileAction = async (): Promise<OwnProfile> => {
  const { data } = await autoAlertBackend.get<OwnProfile>('/auth/profile');
  return data;
}

export const getOwnProfileDocumentTypesAction = async (): Promise<DocumentTypeOption[]> => {
  const { data } = await autoAlertBackend.get<DocumentTypeOption[]>('/auth/profile/document-types');
  return data;
}

export const updateOwnProfileAction = async (profile: OwnProfile): Promise<OwnProfile> => {
  const { data } = await autoAlertBackend.put<OwnProfile>('/auth/profile', profile);
  return data;
}

export interface ChangeOwnPasswordRequest {
  newPassword: string;
  confirmPassword: string;
}

export const changeOwnPasswordAction = async (password: ChangeOwnPasswordRequest): Promise<void> => {
  await autoAlertBackend.put('/auth/profile/password', password);
}
