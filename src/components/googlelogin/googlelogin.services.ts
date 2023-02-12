import { userServiceInstance } from "../user/user.services";
//import fetch from "node-fetch";
import { ErrorException } from "../../interfaces";
//import { User } from "../user/user.model";

export class GoogleLoginService {


  constructor(
   private readonly UserService = userServiceInstance
  ) {
  }

  async LoginGoogle(datos: any): Promise<any>{
  //   let urlGraphGoogle = `https://graph.google.com/${datos.userId}?access_token=${datos.accessToken}`
  //  let response: any
  //   await fetch(urlGraphGoogle, {
  //       method: 'GET'
  //   }).then(res => res.json())
  //   .then(async res => {
  //     response = res
  //   })
    let user = await this.UserService.retrieve({email_address: datos.email})
    if (user instanceof ErrorException) return user
    if (false){
    } else{
          if (user.length != 0){
            return user
          } else {
            let userT = await this.UserService.create({email_address: datos.email, firstname: datos.name, profile_picture_url: datos.profile_picture_url})
            return userT
            }
      }
  }
}

export const googleLoginServiceInstance = new GoogleLoginService();
