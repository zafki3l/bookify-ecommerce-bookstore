import { Action } from '../../../domain/permission-aggregate/enums/action.enum';
import { Resource } from '../../../domain/permission-aggregate/enums/resource.enum';

export interface ICreatePermissionRequest {
  resource: Resource;
  action: Action;
}
