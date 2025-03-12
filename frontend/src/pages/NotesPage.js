import React from "react";
import { useEffect } from "react";
import { Alert, Container, Snackbar } from "@mui/material";
import notesStore from "../stores/notesStore";
import Notes from "../components/Notes";
import UpdateForm from "../components/UpdateForm";
import CreateForm from "../components/CreateForm";

const NotesPage = (showSuccessNotification) => {
  const store = notesStore();

  useEffect(() => {
    store.fetchNotes();
  }, []);

  return (
    <Container sx={{ height: "100vh" }}>
      <UpdateForm showSuccessNotification={showSuccessNotification} />
      <CreateForm showSuccessNotification={showSuccessNotification} />
      {!store.updateForm._id && <Notes />}
    </Container>
  );
};

export default NotesPage;
