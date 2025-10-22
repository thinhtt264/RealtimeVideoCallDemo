import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError,
} from 'axios';
import { API_BASE_URL } from '@/constants';
import store from '@/store/store';

interface ApiErrorResponse {
  message: string;
  code: string;
  status: number;
  errors?: Record<string, string[]>;
  timestamp?: string;
}

interface CustomRequestConfig extends InternalAxiosRequestConfig {
  startTime?: number;
}

export class ApiService {
  private static instance: ApiService;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      timeout: 10000,
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const onBeforeRequest = (config: CustomRequestConfig) => {
      const token = store.getState().auth.accessToken;
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      config.startTime = Date.now();
      return config;
    };

    const onBeforeRequestError = (error: unknown) => {
      return Promise.reject(error);
    };

    const onResponseSuccess = (response: AxiosResponse) => response;

    const onResponseError = (error: unknown) => {
      return Promise.reject(error);
    };

    axios.interceptors.request.use(onBeforeRequest, onBeforeRequestError);
    axios.interceptors.response.use(onResponseSuccess, onResponseError);
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  public async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get(url, config);
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post(url, data, config);
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put(url, data, config);
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete(url, config);
  }

  public async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.patch(url, data, config);
  }

  // Helper method for handling API errors
  public handleError(error: AxiosError): ApiErrorResponse {
    if (error.response) {
      // Server responded with error status
      const response = error.response.data as any;
      return {
        message: response.message || 'An error occurred',
        code: response.code || 'UNKNOWN_ERROR',
        status: error.response.status,
        errors: response.errors,
        timestamp: response.timestamp,
      };
    } else if (error.request) {
      // Request was made but no response received
      return {
        message: 'No response received from server',
        code: 'NO_RESPONSE',
        status: 0,
      };
    } else {
      // Error in request setup
      return {
        message: error.message || 'Request failed',
        code: 'REQUEST_ERROR',
        status: 0,
      };
    }
  }
}

// Export a singleton instance
export const apiService = ApiService.getInstance();
