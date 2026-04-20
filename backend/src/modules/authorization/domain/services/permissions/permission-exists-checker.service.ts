export interface IPermissionExistsChecker {
  isExist(id: string): Promise<boolean>;
}

export const PERMISSION_EXISTS_CHECKER = 'IPermissionExistsChecker';
