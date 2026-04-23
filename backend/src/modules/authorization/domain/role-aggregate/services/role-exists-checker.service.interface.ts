export interface IRoleExistsChecker {
  isExist(id: string): Promise<boolean>;
}
