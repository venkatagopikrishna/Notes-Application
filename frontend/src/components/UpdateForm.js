import { useEffect, useState } from "react";
import notesStore from "../stores/notesStore";
import { Box, TextField, Button, Typography } from "@mui/material";

export default function UpdateForm({ showSuccessNotification }) {
  const store = notesStore();

  const [staticTitle, setStaticTitle] = useState(store.updateForm.title);

  useEffect(() => {
    if (store.updateForm._id) {
      setStaticTitle(store.updateForm.title);
    }
  }, [store.updateForm._id]);

  const handleCancel = notesStore((state) => state.resetUpdateForm);

  return (
    store.updateForm._id && (
      <Box
        sx={{
          maxWidth: "400px",
          margin: "0 auto",
          padding: "16px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          marginTop: "16px",
        }}
      >
        <Typography
          variant="h5"
          sx={{ marginBottom: "16px", textAlign: "center" }}
        >
          Update Note : <Typography variant="h6">{staticTitle}</Typography>
        </Typography>

        <form onSubmit={(e) => store.updateNote(e, showSuccessNotification)}>
          <TextField
            name="title"
            label="Title"
            fullWidth
            variant="outlined"
            value={store.updateForm.title}
            onChange={store.updateUpdateFormField}
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            name="body"
            label="Body"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={store.updateForm.body}
            onChange={store.updateUpdateFormField}
            sx={{ marginBottom: "16px" }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              padding: "10px",
              fontWeight: "bold",
              backgroundColor: "#ffb300",
            }}
          >
            Update
          </Button>
        </form>
        <Button
          variant="contained"
          color="error"
          fullWidth
          sx={{ padding: "10px", fontWeight: "bold", marginTop: "8px" }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Box>
    )
  );
}
