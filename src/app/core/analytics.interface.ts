export interface DataLayerPayload {
  readonly event: DataLayerEventType;
  readonly id?: string;
  readonly data?: {
    [propName: string]: string | number | boolean;
  };
}

export enum DataLayerEventType {
  domEvent = 'domEvent',
}
