import { userServiceInstance } from "../user/user.services";
import fetch from "node-fetch";
import { ErrorException } from "../../interfaces";
//import { User } from "../user/user.model";

export class FacebookLoginService {


  constructor(
   private readonly UserService = userServiceInstance
  ) {
  }

  async LoginFacebook(datos: any): Promise<any>{
    let urlGraphFacebook = `https://graph.facebook.com/${datos.userId}?access_token=${datos.accessToken}`
   let response: any
    await fetch(urlGraphFacebook, {
        method: 'GET'
    }).then(res => res.json())
    .then(async res => {
      response = res
      console.log("response",response)
    })
    let user = await this.UserService.retrieve({email_address: datos.email})
    if (user instanceof ErrorException) return user
    if (response.error){
      return response.error 
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

export const facebookLoginServiceInstance = new FacebookLoginService();
