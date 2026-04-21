export interface IRoleExistsChecker {
  isExist(id: string): Promise<boolean>;
}

export const ROLE_EXISTS_CHECKER = 'IRoleExistsChecker';
