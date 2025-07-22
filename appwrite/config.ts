import conf from "@/conf/config";
import { Client, Account, Databases, ID, Query, Storage } from "appwrite";

type LoginUserAccount = {
  email: string;
  password: string;
};

const appwriteClient = new Client();

export const databases = new Databases(appwriteClient);
export const storage = new Storage(appwriteClient);
export { ID };

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

  //database
  async createPaper(data: any) {
    try {
      return await databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwritePapersCollectionId,
        ID.unique(),
        data
      );
    } catch (error: any) {
      throw error;
    }
  }

  async getPapers() {
    try {
      return await databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwritePapersCollectionId,
        [
          Query.isNotNull("subjectsHasGrades"), // Only get papers with valid relations
        ]
      );
    } catch (error: any) {
      throw error;
    }
  }

  async getSubjectGrade(subjectsHasGrades: string) {
    try {
      const subjectGrade = await databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteSubjectGradeCollectionId,
        subjectsHasGrades
      );

      const subject = await databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteSubjectsCollectionId,
        subjectGrade.subjects
      );

      const grade = await databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteGradesCollectionId,
        subjectGrade.grades
      );

      return {
        subject: subject.subject_name,
        grade: grade.grade_name,
      };
    } catch (error: any) {
      throw error;
    }
  }

  async getSubjects() {
    return databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteSubjectsCollectionId
    );
  }

  async getGrades() {
    return databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteGradesCollectionId
    );
  }

  async getSubjectGradePairs() {
    return databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteSubjectGradeCollectionId
    );
  }

  async getPapersBySubjectGrade(subjectGradeId: string) {
    return databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwritePapersCollectionId,
      [Query.equal("subjectsHasGrades", subjectGradeId)]
    );
  }

  async uploadFile(file: File): Promise<string> {
    try {
      const uploadedFile = await storage.createFile(
        conf.appwriteStorageId,
        ID.unique(),
        file
      );

      // Return URL to view the file
      return storage.getFileView(conf.appwriteStorageId, uploadedFile.$id);
    } catch (error: any) {
      throw error;
    }
  }

  async createBook(data: any) {
    try {
      return await databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteBooksCollectionId,
        ID.unique(),
        data
      );
    } catch (error: any) {
      throw error;
    }
  }

  async getBooks() {
    try {
      return await databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteBooksCollectionId,
        []
      );
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }
}

const appwriteService = new AppwriteService();

export default appwriteService;
