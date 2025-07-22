const conf = {
  appwriteUrl: String(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT),
  appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
  appwritePapersCollectionId: "papers",
  appwriteSubjectsCollectionId: "subjects",
  appwriteGradesCollectionId: "grades",
  appwriteSubjectGradeCollectionId: "subjects_has_grades",
  appwriteStorageId: "paper_vault_img",
  appwriteBooksCollectionId: "books"
};

export default conf;
