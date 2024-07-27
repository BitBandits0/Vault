"use client";

import DropzoneComponent from "react-dropzone";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import toast from "react-hot-toast";

const Dropzone = () => {
  const [loading, setLoading] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("File reading was aborted");
      reader.onabort = () => console.log("File reading has failed");
      reader.onload = async () => {
        await uploadFile(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  //* Singleton span - prevents spamming the area for uploading files/documents
  const uploadFile = async (selectedFile: File) => {
    if (loading) return;
    if (!user) return;

    setLoading(true);
    const toastId = toast.loading("Uploading⬆️...");

    const docRef = await addDoc(collection(db, "users", user.id, "files"), {
      userId: user.id,
      filename: selectedFile.name,
      fullName: user.fullName,
      profileImg: user.imageUrl,
      timestamp: serverTimestamp(),
      type: selectedFile.type,
      size: selectedFile.size,
    });

    const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);

    uploadBytes(imageRef, selectedFile).then(async (snapshot) => {
      const downldURL = await getDownloadURL(imageRef);

      await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
        downloadURL: downldURL,
      });
    });

    toast.success("Uploaded Successfully👍", {
      id: toastId,
    });

    setLoading(false);
  };
  //* max file size ~20MB
  const maxUploadSize = 20000000;

  return (
    <DropzoneComponent minSize={0} maxSize={maxUploadSize} onDrop={onDrop}>
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 &&
          fileRejections[0].file.size > maxUploadSize;

        return (
          <section className="m-4">
            <div
              {...getRootProps()}
              className={cn(
                "w-full h-52 flex items-center justify-center p-5 border border-dashed rounded-lg text-center",
                isDragActive
                  ? "bg-[#d0cfcd] text-white animate-pulse"
                  : "bg-slate-400 dark:bg-slate-600/80 text-slate-50"
              )}
            >
              <input {...getInputProps()} />
              {!isDragActive && "Click here or drop to upload!"}
              {isDragActive && !isDragReject && "Drop to upload !"}
              {isDragReject && "Document type not accepted"}
              {isFileTooLarge && (
                <div className="text-danger mt-2">Document is too large</div>
              )}
            </div>
          </section>
        );
      }}
    </DropzoneComponent>
  );
};

export default Dropzone;
