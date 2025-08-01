import { X, Save, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import appwriteService from "@/appwrite/config";

export default function AddNewPaperModal({
  onClose,
  existingPaper,
}: {
  onClose: () => void;
  existingPaper?: any;
}) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [gradeId, setGradeId] = useState("");
  const [language, setLanguage] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");
  const [type2, setType2] = useState("");
  const [term, setTerm] = useState("");
  const [isMarkingScheme, setIsMarkingScheme] = useState(false);

  const [subjects, setSubjects] = useState<any[]>([]);
  const [grades, setGrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingPaper) {
      setTitle(existingPaper.title);
      setUrl(existingPaper.paper_url);
      setLanguage(existingPaper.language);
      setYear(existingPaper.year);
      setType(existingPaper.type);
      setType2(existingPaper.type2);
      setTerm(existingPaper.term);
      setSubjectId(existingPaper.subjectsHasGrades?.subjects?.$id);
      setGradeId(existingPaper.subjectsHasGrades?.grades?.$id);
      setIsMarkingScheme(existingPaper.marking_scheme);
    }
  }, [existingPaper]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const subjectsRes = await appwriteService.getSubjects();
        const gradesRes = await appwriteService.getGrades();

        setSubjects(subjectsRes.documents);
        setGrades(gradesRes.documents);
      } catch (err) {
        console.error("Failed to load dropdown data", err);
      }
    };

    loadData();
  }, []);


  const handleSave = async (isPublish: boolean) => {
    if (!title || !url || !subjectId || !gradeId || !language || !year || !term) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      const subjectGradePairs = await appwriteService.getSubjectGradePairs();

      const existingPair = subjectGradePairs.documents.find(
        (pair: any) =>
          pair.subjects.$id === subjectId && pair.grades.$id === gradeId
      );

      if (!existingPair) {
        alert("Selected subject-grade pair does not exist.");
        setLoading(false);
        return;
      }

      const paperData = {
        title,
        paper_url: url,
        subjectsHasGrades: existingPair.$id,
        language,
        year: parseInt(year),
        type,
        type2,
        term,
        status: isPublish, // true for publish, false for draft
        date: new Date().toISOString(), 
        marking_scheme: isMarkingScheme,
      };

      if (existingPaper) {
        await appwriteService.updatePaper(existingPaper.$id, paperData);
        alert(isPublish ? "Paper Updated & Published" : "Updated as Draft");
      } else {
        await appwriteService.createPaper(paperData);
        alert(isPublish ? "Paper Published" : "Saved as Draft");
      }

      onClose(); 
    } catch (error) {
      console.error("Error creating paper:", error);
      alert("Failed to create paper.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-dark_grey_500 p-6 rounded-xl shadow-lg w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-gray-700 dark:text-gray-300"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl mb-6 text-gray-800 dark:text-white font-semibold">
          {existingPaper ? "Edit Paper" : "Add New Paper"}
        </h2>


        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm md:text-lg mb-1 text-gray-700 dark:text-gray-300">
              Paper Title
            </label>
            <input
              className="border rounded-md px-3 py-2 w-full"
              placeholder="Enter Paper Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm md:text-lg mb-1 text-gray-700 dark:text-gray-300">
              Add Paper URL
            </label>
            <input
              className="border rounded-md px-3 py-2 w-full"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm md:text-lg mb-1 text-gray-700 dark:text-gray-300">
              Grade/Level
            </label>
            <select className="border rounded-md px-3 py-2 w-full" value={gradeId}
              onChange={(e) => setGradeId(e.target.value)}>
              <option>Select grade/level</option>
              {grades.map((g) => (
                <option key={g.$id} value={g.$id}>{g.grade_name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm md:text-lg mb-1 text-gray-700 dark:text-gray-300">
              Subject
            </label>
            <select className="border rounded-md px-3 py-2 w-full" value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}>
              <option>Select Subject</option>
              {subjects.map((s) => (
                <option key={s.$id} value={s.$id}>{s.subject_name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm md:text-lg mb-1 text-gray-700 dark:text-gray-300">
              Language
            </label>
            <select className="border rounded-md px-3 py-2 w-full" value={language}
              onChange={(e) => setLanguage(e.target.value)}>
              <option value={""}>Select language</option>
              <option value={"Sinhala"}>Sinhala</option>
              <option value={"English"}>English</option>
              <option value={"Tamil"}>Tamil</option>
            </select>
          </div>

          <div>
            <label className="block text-sm md:text-lg mb-1 text-gray-700 dark:text-gray-300">
              Year
            </label>
            <input
              type="number"
              className="border rounded-md px-3 py-2 w-full"
              placeholder="Enter Year (1980-2100)"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              min="1980"
              max="2100"
            />
          </div>

          <div>
            <label className="block text-sm md:text-lg mb-1 text-gray-700 dark:text-gray-300">
              Type
            </label>
            <input
              type="text"
              className="border rounded-md px-3 py-2 w-full"
              placeholder="Enter Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm md:text-lg mb-1 text-gray-700 dark:text-gray-300">
              Type 2
            </label>
            <input
              type="text"
              className="border rounded-md px-3 py-2 w-full"
              placeholder="Enter Type"
              value={type2}
              onChange={(e) => setType2(e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm md:text-lg mb-1 text-gray-700 dark:text-gray-300">
              Term
            </label>
            <select className="border rounded-md px-3 py-2 w-full" value={term}
              onChange={(e) => setTerm(e.target.value)}>
              <option>Select Term</option>
              <option>First</option>
              <option>Second</option>
              <option>Third</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm md:text-lg text-gray-700 dark:text-gray-300 mt-2">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="mainSubject"
                checked={isMarkingScheme}
                onChange={(e) => setIsMarkingScheme(e.target.checked)}
                className="h-4 w-4 accent-rose-500"
              />
              <label htmlFor="mainSubject" className="text-sm md:text-lg text-gray-800 dark:text-gray-200">
                Marking Scheme
              </label>
            </div>
          </label>
          </div>
        </form>

        <div className="flex justify-end gap-2 mt-6">
          <button
            className="flex items-center gap-1 border px-4 py-2 rounded-md text-gray-700 dark:text-gray-300"
            onClick={onClose}
          >
            <X className="w-5 h-5" /> Cancel
          </button>
          <button
            className="flex items-center gap-1 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
            onClick={() => handleSave(false)}
            disabled={loading}
          >
            <Save className="w-5 h-5" /> Save as Draft
          </button>

          <button
            className="flex items-center gap-1 bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600"
            onClick={() => handleSave(true)}
            disabled={loading}
          >
            <CheckCircle className="w-5 h-5" /> Publish
          </button>
        </div>
      </div>
    </div>
  );
}
