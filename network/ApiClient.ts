/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Network Module
 * File: ApiClient.ts
 * -------------------------------------------------------------
 */

export interface ApiRequest {

  url: string;

  method?: string;

  headers?: Record<string, string>;

  body?: unknown;

  timeout?: number;

}

export interface ApiResponse<T = unknown> {

  success: boolean;

  status: number;

  data: T | null;

  error?: string;

}

export class ApiClient {

  /**
   * Send HTTP Request
   */
  public async request<T = unknown>(
    request: ApiRequest
  ): Promise<ApiResponse<T>> {

    try {

      const response =
        await fetch(
          request.url,
          {

            method:
              request.method ??
              "GET",

            headers:
              request.headers,

            body:
              request.body
                ? JSON.stringify(
                    request.body
                  )
                : undefined

          }
        );

      const data =
        await response.json();

      return {

        success:
          response.ok,

        status:
          response.status,

        data

      };

    } catch (error) {

      return {

        success: false,

        status: 0,

        data: null,

        error:
          error instanceof Error
            ? error.message
            : "Unknown network error"

      };

    }

  }

  /**
   * HTTP GET
   */
  public get<T = unknown>(
    url: string,
    headers?: Record<string, string>
  ) {

    return this.request<T>({
      url,
      method: "GET",
      headers
    });

  }

  /**
   * HTTP POST
   */
  public post<T = unknown>(
    url: string,
    body?: unknown,
    headers?: Record<string, string>
  ) {

    return this.request<T>({
      url,
      method: "POST",
      body,
      headers: {

        "Content-Type":
          "application/json",

        ...headers

      }

    });

  }

  /**
   * HTTP PUT
   */
  public put<T = unknown>(
    url: string,
    body?: unknown,
    headers?: Record<string, string>
  ) {

    return this.request<T>({
      url,
      method: "PUT",
      body,
      headers: {

        "Content-Type":
          "application/json",

        ...headers

      }

    });

  }

  /**
   * HTTP DELETE
   */
  public delete<T = unknown>(
    url: string,
    headers?: Record<string, string>
  ) {

    return this.request<T>({
      url,
      method: "DELETE",
      headers
    });

  }

}

const apiClient =
  new ApiClient();

export default apiClient;
