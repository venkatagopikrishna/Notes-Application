import { create } from "zustand";
import axios from "axios";

const notesStore = create((set) => ({
  notes: null,

  createForm: {
    title: "",
    body: "",
  },

  updateForm: {
    _id: null,
    title: "",
    body: "",
  },

  resetUpdateForm: () => {
    set({
      updateForm: {
        _id: null,
        title: "",
        body: "",
      },
    });
  },

  //Fetch Notes
  fetchNotes: async () => {
    try {
      const res = await axios.get("http://localhost:5000/notes", {
        withCredentials: true, // ✅ Include credentials
      });
      set({ notes: res.data.notes });
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  },
  

  //UpdateCreateFormField
  updateCreateFormField: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        createForm: {
          ...state.createForm,
          [name]: value,
        },
      };
    });
  },

  //UpdateUpdateFormField
  updateUpdateFormField: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        updateForm: {
          ...state.updateForm,
          [name]: value,
        },
      };
    });
  },

  //CreateNote
  createNote: async (e, onSuccess) => {
    e.preventDefault();

    const { createForm, notes } = notesStore.getState();

    try {
      const res = await axios.post("/notes", createForm);

      set({
        notes: [...notes, res.data.note],
        createForm: {
          title: "",
          body: "",
        },
      });

      if (onSuccess) onSuccess("Note created successfully!");
    } catch (error) {
      console.error("Error creating note:", error);
    }
  },

  // UpdateNote
  updateNote: async (e, onSuccess) => {
    e.preventDefault();

    const { updateForm, notes, resetUpdateForm } = notesStore.getState();
    const { title, body, _id } = updateForm;

    try {
      const res = await axios.put(`/notes/${_id}`, { title, body });

      const newNotes = [...notes];
      const noteIndex = notes.findIndex((note) => note._id === _id);
      newNotes[noteIndex] = res.data.updatedNote;

      set({ notes: newNotes });

      setTimeout(() => resetUpdateForm(), 300);

      if (onSuccess) onSuccess("Note updated successfully!");
    } catch (error) {
      console.error("Error updating note:", error);
    }
  },

  //DeleteNote
  deleteNote: async (_id) => {
    const res = await axios.delete(`/notes/${_id}`);

    const { notes } = notesStore.getState();

    const newNotes = notes.filter((note) => {
      return note._id !== _id;
    });

    set({ notes: newNotes });
  },

  // ToggleUpdate
  toggleUpdate: (note) => {
    const { _id, title, body } = note;

    set({
      updateForm: {
        _id: _id,
        title: title,
        body: body,
      },
    });
  },
}));

export default notesStore;
