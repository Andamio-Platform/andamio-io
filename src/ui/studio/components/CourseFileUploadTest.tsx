import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface FormData {
  file: FileList;
}

interface FileUploadFormProps {
  onSubmit: (file: File) => void;
}

const FileUploadForm: React.FC<FileUploadFormProps> = ({ onSubmit }) => {
  const [jsonContent, setJsonContent] = useState<object | null>(null);
  const { handleSubmit, control } = useForm<FormData>();

  const handleFormSubmit = async (data: FormData) => {
    if (data.file[0]) {
        // todo: check file type
      const uploadedFile = data.file[0];
      const reader = new FileReader();

      reader.onload = () => {
        try {
          const jsonData: object = JSON.parse(reader.result as string);
          // Set the JSON content to the state
          if (JSON.stringify(jsonData).length < 500) {
              setJsonContent(jsonData);
          } else {
            alert("File is too big!");
          }
        } catch (error) {
          alert("Please upload a valid JSON file.");
        }
      };

      reader.readAsText(uploadedFile);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Controller
          name="file"
          control={control}
          render={({ field }) => (
            <input
              type="file"
              onChange={(e) => field.onChange(e.target.files)}
            />
          )}
        />
        <button type="submit">Upload</button>
      </form>
      {/* Display JSON content */}
      {jsonContent && (
        <div>
          <h2>JSON Content:</h2>
          <pre>{JSON.stringify(jsonContent, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default function CourseFileUploadTest() {
  const [fileData, setFileData] = useState<string | undefined>(undefined);
  const handleFileUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const _fileString = JSON.stringify(formData);
      setFileData(_fileString);

      // Make API call to upload the file and save it to the database
      // Example: fetch('/upload', { method: 'POST', body: formData });
      console.log("File uploaded:", file);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  return (
    <div className="my-5 rounded-lg border border-gray-400 p-5">
      <h1>Upload JSON File</h1>
      <FileUploadForm onSubmit={handleFileUpload} />
      <pre>{fileData}</pre>
    </div>
  );
}
