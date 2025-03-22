import axios, { type AxiosRequestConfig, type RawAxiosRequestHeaders } from 'axios';

import { HttpStatusCode } from './enums/http_status_code';
import type { BaseError } from './interfaces/api';

export const axiosClient = axios.create({
  baseURL: process.env.EXPO_API_URL,
  // https://github.com/axios/axios/issues/5058#issuecomment-1272107602
  // Example: Params { a: ['b', 'c']}
  // From (by default - false) 'a[]=b&a[]=c'
  // To (by null) 'a=b&a=c'
  paramsSerializer: {
    indexes: null, // by default: false
  },

});

export const updateAxiosBaseUrl = (url?: string) => {
  if (url) {
    axiosClient.defaults.baseURL = url;
  }
};

axiosClient.interceptors.request.use(
  (config) => {
    // const token = useStore.getState().accessToken;

    // const existEnv = config.headers?.env;
    // const syncToken = config.headers?.Authorization;

    // if (token && !isPublicUrl) {
    //   (config.headers as RawAxiosRequestHeaders) = {
    //     ...config.headers,
    //     Authorization: `${syncToken ?? token}`,
    //   };
    // }

    // const env = useStore.getState().env;
    // if (env) {
    //   if (existEnv) {
    //     config.headers.env = existEnv;
    //   } else {
    //     config.headers.env = env;
    //   }
    // }

    // if (hasCognitoPool) {
    //   config.headers.set('api-secret', process.env.EXPO_PUBLIC_API_SECRET);
    // }

    // config.headers.clientId = useStore.getState().clientId ?? process.env.EXPO_PUBLIC_CLIENT_ID;
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// export const isNoAuthUrl = (url: string) => {
//   return LIST_NO_AUTH_URI.some((str) => url.includes(str));
// };

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case HttpStatusCode.Unauthorized:
        case HttpStatusCode.SessionTimedOut:
        default:
          break;
      }
    }

    const jsonError = error.toJSON();
    let errorObj = error;
    if (error?.response?.data) {
      errorObj = error?.response.data;
    }
    return Promise.reject<BaseError<any>>({
      error: errorObj,
      errorCode: jsonError.status,
      message: jsonError.message,
    });
  }
);

type GetParams<T> = {
  path: string;
  config?: AxiosRequestConfig;
  customHeader?: RawAxiosRequestHeaders;
  applyMiddleWare?: boolean;
  params?: T;
  baseURL?: string;
  withoutSlash?: boolean;
};

export type PostParams<T, TParams> = GetParams<TParams> & {
  data?: T;
};

export type DeleteParams<T> = {
  path: string;
  config?: AxiosRequestConfig;
  customHeader?: RawAxiosRequestHeaders;
  data?: T;
  applyMiddleWare?: boolean;
  baseURL?: string;
  withoutSlash?: boolean;
};

export const getRequestFullUrl = async <T>(url: string) => {
  const response = await axiosClient.get<T>(url);
  return response.data;
};

export const getRequest = async <T, R>({
  path,
  config,
  customHeader,
  params,
  withoutSlash = false,
  baseURL,
}: GetParams<T>) => {
  let customPath = path;
  if (!withoutSlash) {
    customPath = '/' + customPath;
  }
  const response = await axiosClient.get<R>(customPath, {
    baseURL,
    headers: {
      Accept: 'application/json',
      ...customHeader,
    },
    params,
    ...config,
  });
  return response.data;
};

export const postRequest = async <T, R, TParams>({
  path,
  config,
  customHeader,
  data,
  params,
  baseURL,
}: PostParams<T, TParams>) => {
  const response = await axiosClient.post<R>(`/${path}`, data, {
    baseURL,
    headers: {
      Accept: 'application/json',
      ...customHeader,
    },
    params,
    ...config,
  });
  return response.data;
};

export const putRequest = async <T, R, TParams>({
  path,
  config,
  customHeader,
  data,
  params,
}: PostParams<T, TParams>) => {
  const response = await axiosClient.put<R>(`/${path}`, data, {
    headers: {
      Accept: 'application/json',
      ...customHeader,
    },
    params,
    ...config,
  });
  return response.data;
};

export const patchRequest = async <T, R, TParams>({
  path,
  config,
  customHeader,
  data,
  params,
}: PostParams<T, TParams>) => {
  const response = await axiosClient.patch<R>(`/${path}`, data, {
    headers: {
      Accept: 'application/json',
      ...customHeader,
    },
    params,
    ...config,
  });
  return response.data;
};

export const delRequest = async <T, R>({ path, config, customHeader, data }: DeleteParams<T>) => {
  const response = await axiosClient.delete<R>(`/${path}`, {
    headers: {
      Accept: 'application/json',
      ...customHeader,
    },
    data,
    ...config,
  });
  return response.data;
};

export default {
  getRequestFullUrl,
  getRequest,
  postRequest,
  putRequest,
  patchRequest,
  delRequest,
  updateAxiosBaseUrl,
};
