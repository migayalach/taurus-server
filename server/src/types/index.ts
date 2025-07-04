/**
 * Basic JSON response for Controllers
 */
export type BasicResponse = {
  message: string;
};

/**
 * Error Response for Controllers
 */
export type ErrorResponse = {
  error: string;
  message: string;
};

/**
 * Interface
 */
export type AuthResponse = {
  message: string;
  token: string;
};
