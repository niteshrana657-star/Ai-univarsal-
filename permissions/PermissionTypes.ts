export type PermissionStatus =
  | "Granted"
  | "Denied"
  | "Not Requested";

export interface PermissionInfo {
  id: string;
  title: string;
  description: string;
  status: PermissionStatus;
}
