import { XMLParser } from "fast-xml-parser";
import externalApiClient from "../../../api/ExternalApiClient";
import type { AxiosInstance } from "axios";
import apiClient from "../../../api/ApiClient";

export default abstract class BaseWidgetApi {
  protected formatEndpoint(endpoint: string, params: Record<string, string>): string {
    let url = endpoint;
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, value);
    });
    return url;
  }

  protected async getJson<T>(client: AxiosInstance, url: string, params?: any, loadingKey?: string): Promise<T> {
    const param = {
      ...params,
      meta: {
        loadingKey,
      },
    };

    const response = await client.get<T>(url, param);
    return response.data;
  }

  protected async getExternalJson<T>(url: string, loadingKey?: string): Promise<T> {
    return await this.getJson<T>(externalApiClient, url, null, loadingKey);
  }

  protected async getInternalJson<T>(url: string, params?: any, loadingKey?: string): Promise<T> {
    return await this.getJson<T>(apiClient, url, params ?? null, loadingKey);
  }

  protected async postExternalJson<T>(url: string, header: any, body: any, loadingKey?: string): Promise<T> {
    return await this.postJson<T>(externalApiClient, url, header, body, loadingKey);
  }

  protected async postInternalJson<T>(url: string, header: any, body: any, loadingKey?: string): Promise<T> {
    return await this.postJson<T>(apiClient, url, header, body, loadingKey);
  }

  protected async postJson<T>(
    client: AxiosInstance,
    url: string,
    header: any,
    body: any,
    loadingKey?: string,
  ): Promise<T> {
    header = {
      ...header,
      meta: {
        loadingKey,
      },
    };

    const response = await client.post<T>(url, body, header);
    return response.data;
  }

  protected async getXml<T>(url: string, loadingKey?: string): Promise<T> {
    const response = await externalApiClient.get<string>(url, {
      responseType: "text",
      meta: {
        loadingKey,
      },
    });
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      transformTagName: (tagName) => tagName.replace(/:/g, "_"), // safety if colons remain (media:content -> media_content)
      transformAttributeName: (attrName) => attrName.replace(/^@_/, ""),
    });
    return parser.parse(response.data) as T;
  }
}
