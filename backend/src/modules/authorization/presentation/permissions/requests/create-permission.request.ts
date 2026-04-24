import { IsEnum } from 'class-validator';
import { ICreatePermissionRequest } from '../../../application/permission-use-cases/create-permission/create-permission.request';
import { Action } from '../../../domain/permission-aggregate/enums/action.enum';
import { Resource } from '../../../domain/permission-aggregate/enums/resource.enum';

export class CreatePermissionRequest implements ICreatePermissionRequest {
  @IsEnum(Resource)
  public readonly resource: Resource;

  @IsEnum(Action)
  public readonly action: Action;

  public constructor(resource: Resource, action: Action) {
    this.resource = resource;
    this.action = action;
  }
}
