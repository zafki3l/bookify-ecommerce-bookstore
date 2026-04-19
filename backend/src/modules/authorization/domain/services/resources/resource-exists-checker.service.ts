export interface IResourceExistsChecker {
  isExist(id: string): Promise<boolean>;
}

export const RESOURCE_EXISTS_CHECKER = 'IResourceExistsChecker';
