export interface IActionExistsChecker {
  isExist(id: string): Promise<boolean>;
}

export const ACTION_EXISTS_CHECKER = 'IActionExistsChecker';
