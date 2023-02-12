class LoginException extends Error {
    code: number;
    httpCode: number;
    constructor (message: string, code: number, httpCode?: number) {
      super(message);
      this.code = code;
      this.httpCode = httpCode || code;
    }
  }
  
  export {
    LoginException
  }
  