export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const enum HttpCodes {
  BadRequest = 400,
  Unauthorized = 401,
  UserNotFound = 403,
  ServerError = 500,
}

export const REFRESH_URL = "/auth/login/access-token";