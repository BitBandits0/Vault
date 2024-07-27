import React from "react";
import { auth } from "@clerk/nextjs/server";
import Dropzone from "@/components/Dropzone";
import { currentUser } from "@clerk/nextjs/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { FileType } from "@/typings";
import TableWrapper from "@/components/table/TableWrapper";

//* We can perform top-level async-await just because it is a server side component
const page = async () => {
  const { userId }: { userId: string | null } = auth();
  const user = await currentUser();

  const docsRes = await getDocs(collection(db, "users", userId!, "files"));
  const skeletonFiles: FileType[] = docsRes.docs.map((doc) => ({
    id: doc.id,
    filename: doc.data().filename || doc.id,
    timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
    fullName: doc.data().fullName,
    downloadURL: doc.data().downloadURL,
    type: doc.data().filename.split(".")[1],
    size: doc.data().size,
  }));

  console.log(skeletonFiles);

  if (!user) return <div>Not signed in</div>;

  return (
    <div className="border-t-2">
      <h1 className="text-xl m-5 text-opacity-100 text-blue-400">
        Welcome, <b>{user?.firstName}</b>
      </h1>
      <Dropzone />
      <section>
        <h2 className="font-bold m-5 text-xl">All Files</h2>
        <div>
          <TableWrapper skeletonFiles={skeletonFiles} />
        </div>
      </section>
    </div>
  );
};

export default page;
