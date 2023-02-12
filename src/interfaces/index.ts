import HttpStatusCode from "../utils/httpStatusCode"

export interface Logs {
  name: string
  description: string
}

export interface Error {
  code: string
  name: string
  context?: string
  message: string
}

export class ErrorException {
  error: Error

  constructor(code: string | HttpStatusCode, name: string, context?: string) {
    this.error = {
      code: code.toString(),
      name,
      context,
      message: this.retrieveTranslate(code, name)
    }
  }

  retrieveTranslate(code: string | HttpStatusCode, name: string) {
    const [error] = ErrorList.filter(error => {
      if (name) {
        return error.name === name
      } else {
        return error.code === code
      }
    })
    return error ? error.message : "Error Genérico. Revisar logs."
  }
}


const ErrorList: Error[] = [{
  code: "700",
  name: "invalid_username_or_password",
  message: "Usuario o password inválidos."
}, {
  code: "701",
  name: "rp_conn_error",
  message: "Error de conexión a la API de Roles y Perfiles."
}, {
  code: "702",
  name: "invalid_user",
  message: "Este usuario no existe. Inténtelo otra vez."
}, {
  code: "703",
  name: "invalid_password",
  message: "Esta clave es incorrecta. Inténtelo otra vez."
}, {
  code: "704",
  name: "user_already_exist",
  message: "El nombre de usuario (email) ya se encuentra registrado."
}, {
  code: "23505",
  name: 'duplicate key value violates unique constraint "ts_shop_shop_name_uindex"',
  message: "El nombre de la tienda ya se encuentra registrado"
}, {
  code: "800",
  name: 'duplicate name',
  message: "Nombre duplicado"
}, {
  code: "801",
  name: 'Shop name already exist',
  message: "El nombre de la tienda ya existe"
}, {
  code: "900",
  name: "ruc_already_exist",
  message: "El número de ruc ya se encuentra registrado."
},
]


