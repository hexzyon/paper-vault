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

  async getAllPapersOrder() {
    try {
      const response = await databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwritePapersCollectionId,
        [Query.orderDesc("$createdAt"), Query.limit(100)]
      );
      return response.documents;
    } catch (error) {
      console.error("Error loading all papers:", error);
      return [];
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
      [
        Query.equal("subjectsHasGrades", subjectGradeId),
        Query.equal("status", true),
      ]
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

  async getTotalDownloads() {
    try {
      const response = await databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteDownloadsCollectionId,
        []
      );

      const total = response.documents.reduce((sum, doc) => {
        return sum + (doc.download_count ?? 0);
      }, 0);

      return total;
    } catch (error) {
      console.error("Error fetching downloads:", error);
      throw error;
    }
  }

  async getDownloadsLast30Days() {
    try {
      const today = new Date();
      const past30 = new Date();
      past30.setDate(today.getDate() - 30);

      const isoDate = past30.toISOString();

      return await databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteDownloadsCollectionId,
        [Query.greaterThanEqual("date", isoDate), Query.limit(1000)]
      );
    } catch (error) {
      console.error("Error fetching downloads:", error);
      throw error;
    }
  }

  async fetchDownloadsLast60Days() {
    try {
      const today = new Date();
      const sixtyDaysAgo = new Date();
      sixtyDaysAgo.setDate(today.getDate() - 59);

      const startISO = sixtyDaysAgo.toISOString();
      const endISO = today.toISOString();

      const res = await databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteDownloadsCollectionId,
        [
          Query.greaterThanEqual("date", startISO),
          Query.lessThanEqual("date", endISO),
          Query.limit(1000),
        ]
      );

      return res.documents;
    } catch (error) {
      console.error("Error fetching downloads:", error);
      return [];
    }
  }

  async updatePaper(id: string, paperData: any) {
    return await databases.updateDocument(
      conf.appwriteDatabaseId,
      conf.appwritePapersCollectionId,
      id,
      paperData
    );
  }

  async deletePaper(id: string) {
    return await databases.deleteDocument(
      conf.appwriteDatabaseId,
      conf.appwritePapersCollectionId,
      id
    );
  }

  async getPaperById(id: string) {
    return await databases.getDocument(
      conf.appwriteDatabaseId,
      conf.appwritePapersCollectionId,
      id
    );
  }

  async getBookById(bookId: string) {
    return await databases.getDocument(
      conf.appwriteDatabaseId,
      conf.appwriteBooksCollectionId,
      bookId
    );
  }

  async updateBook(bookId: string, data: any) {
    return await databases.updateDocument(
      conf.appwriteDatabaseId,
      conf.appwriteBooksCollectionId,
      bookId,
      data
    );
  }

  async deleteBook(bookId: string) {
    return await databases.deleteDocument(
      conf.appwriteDatabaseId,
      conf.appwriteBooksCollectionId,
      bookId
    );
  }

  async findSubjectGradeRelation(gradeId: string, subjectId: string) {
    const res = await databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteSubjectGradeCollectionId,
      [
        Query.equal("grades", gradeId),
        Query.equal("subjects", subjectId),
        Query.limit(1),
      ]
    );
    return res.documents[0] || null;
  }

  async getGradesById(gradeId: string) {
    return databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteGradesCollectionId,
      [Query.equal("$id", gradeId)]
    );
  }

  async getSubjectsById(subjectId: string) {
    return databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteSubjectsCollectionId,
      [Query.equal("$id", subjectId)]
    );
  }

  async getRecentPapers(limit = 3) {
    return await databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwritePapersCollectionId,
      [Query.orderDesc("date"), Query.limit(limit), Query.equal("status", true)]
    );
  }

  async getDownloadByDate(subjectId: string, date: string) {
    return await databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteDownloadsCollectionId,
      [Query.equal("subjects", subjectId), Query.equal("date", date)]
    );
  }

  async updateDownload(docId: string, count: number) {
    return await databases.updateDocument(
      conf.appwriteDatabaseId,
      conf.appwriteDownloadsCollectionId,
      docId,
      {
        download_count: count,
      }
    );
  }

  async createDownload(subjectId: string, date: string) {
    return await databases.createDocument(
      conf.appwriteDatabaseId,
      conf.appwriteDownloadsCollectionId,
      ID.unique(),
      {
        subjects: subjectId,
        date: date,
        download_count: 1,
      }
    );
  }

  async getMarkingPapersOnly() {
    return databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwritePapersCollectionId,
      [Query.equal("marking_scheme", true), Query.equal("status", true)]
    );
  }

  async getPapersByType(type: string) {
    return databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwritePapersCollectionId,
      [Query.equal("type", type), Query.equal("status", true)]
    );
  }

  async getPapersByTitle(type: string) {
    return databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwritePapersCollectionId,
      [Query.equal("title", decodeURIComponent(type)), Query.equal("status", true)]
    );
  }
}

const appwriteService = new AppwriteService();

export default appwriteService;
