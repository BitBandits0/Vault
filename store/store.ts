import { create } from "zustand";

interface AppState {
  //* piece of state which detects if modal for deleting is open
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (open: boolean) => void;

  //*  piece of state which detects if modal for renaming is open
  isRenameModalOpen: boolean;
  setIsRenameModalOpen: (open: boolean) => void;

  //* keep track of what file we are interacting  with
  fileId: string | null;
  setFileId: (field: string) => void;

  //* method/way to modify the filename
  filename: string;
  setFilename: (filename: string) => void;
}

//* Reducer
//* Allowing us to modify our global stores, so that we can use it in global scope however we want to use it.
export const useAppStore = create<AppState>()((set) => ({
  fileId: null,
  setFileId: (fileId: string) => set((state) => ({ fileId })),

  filename: "",
  setFilename: (filename: string) => set((state) => ({ filename })),

  isDeleteModalOpen: false,
  setIsDeleteModalOpen: (open) => set((state) => ({ isDeleteModalOpen: open })),

  isRenameModalOpen: false,
  setIsRenameModalOpen: (open) => set((state) => ({ isRenameModalOpen: open })),
}));
