import conf from "@/conf/config";
import { Client, Account, ID } from "appwrite";

type LoginUserAccount = {
  email: string;
  password: string;
};

const appwriteClient = new Client();

appwriteClient.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

export const account = new Account(appwriteClient);

export class AppwriteService {
  
  async login({ email, password }: LoginUserAccount) {
    try {
      return await account.createEmailPasswordSession(email, password);
    } catch (error: any) {
      throw error;
    }
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const data = await this.getCurrentUser();
      return Boolean(data);
    } catch (error: any) {
      console.warn("User not logged in or session expired:", error.message);
      return false;
    }
  }

  async getCurrentUser() {
    try {
      return account.get();
    } catch (error) {
      console.log("Get Current User error: " + error);
    }
    return null;
  }

  async logout() {
    try {
      return await account.deleteSession("current");
    } catch (error: any) {
      console.log("logout error: " + error);
    }
  }

  //update user name
  async updateName(name: string) {
    try {
      return await account.updateName(name);
    } catch (error: any) {
      throw error;
    }
  }

  //update user email
  async updateEmail(email: string, password: string) {
    try {
      return await account.updateEmail(email, password);
    } catch (error: any) {
      throw error;
    }
  }

  //update user password
  async updatePassword(newPassword: string, oldPassword: string) {
    try {
      return await account.updatePassword(newPassword, oldPassword);
    } catch (error: any) {
      throw error;
    }
  }
}

const appwriteService = new AppwriteService();

export default appwriteService;
