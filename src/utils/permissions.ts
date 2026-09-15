export const ROLE_PERMISSIONS = {
  Admin: [
    'VIEW_SERVICES',
    'VIEW_COMPANIES',
    'CREATE_COMPANIES',
    'VIEW_USERS',
    'DELETE_COMPANIES',
    'UPDATE_PERMISSIONS',
    'DELETE_USERS',
    'EDIT_SERVICES',
    'EDIT_STORES',
    'CREATE_USERS',
    'CREATE_STORES',
    'CREATE_SERVICES',
    'DELETE_STORES',
    'DELETE_SERVICES',
    'EDIT_COMPANIES',
    'VIEW_STORES',
    'EDIT_USERS',
    'VIEW_ALERTS',
    'CREATE_ALERTS',
    'EDIT_ALERTS',
    'DELETE_ALERTS',
    'VIEW_NOTIFICATIONS',
  ],
  Supervisor: [
    'DELETE_SERVICES',
    'EDIT_SERVICES',
    'VIEW_STORES',
    'CREATE_STORES',
    'CREATE_COMPANIES',
    'CREATE_SERVICES',
    'VIEW_SERVICES',
    'CREATE_USERS',
    'VIEW_COMPANIES',
    'EDIT_COMPANIES',
    'UPDATE_PERMISSIONS',
    'EDIT_STORES',
    'DELETE_STORES',
    'DELETE_USERS',
    'VIEW_USERS',
    'DELETE_COMPANIES',
    'EDIT_USERS',
  ],
  Auditor: [
    'EDIT_COMPANIES',
    'VIEW_STORES',
    'CREATE_STORES',
    'UPDATE_PERMISSIONS',
    'EDIT_SERVICES',
    'EDIT_USERS',
    'EDIT_STORES',
    'CREATE_USERS',
    'DELETE_STORES',
    'CREATE_SERVICES',
    'VIEW_USERS',
    'DELETE_COMPANIES',
    'VIEW_SERVICES',
    'VIEW_COMPANIES',
    'CREATE_COMPANIES',
    'DELETE_SERVICES',
    'DELETE_USERS',
  ],
  User: [
    'VIEW_USERS',
    'DELETE_SERVICES',
    'VIEW_COMPANIES',
    'CREATE_STORES',
    'VIEW_SERVICES',
    'CREATE_USERS',
    'UPDATE_PERMISSIONS',
    'EDIT_SERVICES',
    'DELETE_COMPANIES',
    'CREATE_SERVICES',
    'VIEW_STORES',
    'EDIT_STORES',
    'EDIT_USERS',
    'EDIT_COMPANIES',
    'DELETE_USERS',
    'CREATE_COMPANIES',
    'DELETE_STORES',
  ],
} as const;

export type Role = keyof typeof ROLE_PERMISSIONS;
export type Permission = (typeof ROLE_PERMISSIONS)[Role][number];

export const getRolePermissions = (role?: string): readonly Permission[] => {
  const matchedRole = Object.keys(ROLE_PERMISSIONS).find(
    (key) => key.toLowerCase() === role?.toLowerCase(),
  ) as Role | undefined;

  if (matchedRole) {
    return ROLE_PERMISSIONS[matchedRole];
  }

  return ROLE_PERMISSIONS.User;
};
