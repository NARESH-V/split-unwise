import { OAuthUser, User } from "../common/models.ts";
import { HttpWrapper } from "./httpWrapper.ts";
import localStorageDB from "./localStorageDB.ts";

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
    public async getUserByEmail(email: string): Promise<User | null> {
        try {
            // Use local storage DB
            const user = localStorageDB.getUserByEmail(email);
            return user;
        } catch (error: any) {
            console.error('Error fetching user:', error);
            return null;
        }
    }

    /**
     * registerUser
     * @param userData user data to register
     * @returns registration response
     */
    public async registerUser(userData: User): Promise<User> {
        try {
            // Save to local storage DB
            const newUser = localStorageDB.addUser(userData);
            return newUser;
        } catch (error: any) {
            console.error('Error registering user:', error);
            throw error;
        }
    }
}