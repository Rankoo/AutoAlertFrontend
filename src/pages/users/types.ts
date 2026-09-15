

export interface PagedUsers {
  users:      PagedUser[];
  page:       number;
  pageSize:   number;
  totalItems: number;
  totalPages: number;
}

export interface User {
  id:               string;
  documentTypeId:   string;
  documentTypeName: string;
  roleId:           string;
  roleName:         string;
  names:            string;
  lastNames:        string;
  email:            string;
  address:          string;
  phoneNumber:      string;
  documentNumber:   string;
  position:         string;
  isActive:         boolean;
  changePassword:   boolean;
  createdAt:        Date;
  updatedAt:        null;
}

export interface PagedUser {
  id:        string;
  names:     string;
  lastNames: string;
  email:     string;
  roleName:  string;
  isActive:  boolean;
  lastLoginAt: Date | null;
}

