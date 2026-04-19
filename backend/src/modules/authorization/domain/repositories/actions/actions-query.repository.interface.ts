export interface IActionsQueryRepository {
  find(): Promise<{ id: string; name: string }[]>;

  findOne(id: string): Promise<{ id: string; name: string } | null>;
}

export const ACTIONS_QUERY_REPOSITORY = 'IActionsQueryRepository';
