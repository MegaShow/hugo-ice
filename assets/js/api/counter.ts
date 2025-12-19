interface Response {
  code: number;
  message: string;
  data?: unknown;
}

interface CountResponse {
  object_id?: string;
  count?: number;
}

export class CounterService {
  private apiPath: string;
  private tenantId: string;

  constructor(apiPath: string, tenantId: string) {
    this.apiPath = apiPath;
    this.tenantId = tenantId;
  }

  private async doHttp<T>(uri: string, init?: RequestInit): Promise<T> {
    const resp = await fetch(this.apiPath + uri, {
      headers: {
        'Content-Type': 'application/json',
        'X-Tenant-Id': this.tenantId,
      },
      ...init,
    });
    const respBody = (await resp.json()) as Response;
    if (respBody.code !== 0) {
      throw new Error(respBody.message);
    }
    return respBody.data as T;
  }

  async getCounter(objectId: string): Promise<number> {
    const data = await this.doHttp<CountResponse>(`/v1/count?object_id=${objectId}`);
    return data.count ?? 0;
  }

  async incrCounter(objectId: string, upsert?: boolean) {
    await this.doHttp<CountResponse>(`/v1/count/incr`, {
      method: 'POST',
      body: JSON.stringify({
        object_id: objectId,
        upsert: upsert,
      }),
    });
  }
}
