import { response } from "express";
import { OAuthUser } from "../common/models.ts";
import { HttpWrapper } from "./httpWrapper.ts";

export class UserService extends HttpWrapper {

    /**
     * getUserDataFromOAuth
     */
    public getUserDataFromOAuth(user: OAuthUser) {
        const url = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`;
        const headers = {
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                Accept: 'application/json'
            }
        };

        return this.http.GET(url, headers);
    }

    /**
     * getUserByEmail
     * @param email user email Id
     * @returns user information
     */
    public getUserByEmail(email: string) {
        let userInfo = null;

        this.http.GET(`${this.baseApiRoot}/user/${email}`)
        .then((response) => {
            userInfo = response.data;
            return userInfo;
        }).catch((error: any) => console.log(error));
        return userInfo;
    }
}