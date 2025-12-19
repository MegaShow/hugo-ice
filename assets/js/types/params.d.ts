declare module '@params' {
  /** 站点参数 */
  export interface Params {
    statistics?: {
      counter?: {
        apipath?: string;
        tenantid?: string;
        upsert?: boolean;
        delayincr?: number;
      };
    };
  }

  const params: Params;
  export default params;
}
