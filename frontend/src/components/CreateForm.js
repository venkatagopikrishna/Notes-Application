import notesStore from "../stores/notesStore";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

export default function CreateForm({ showSuccessNotification }) {
  const store = notesStore();

  return (
    !store.updateForm._id && (
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
          Create Note
        </Typography>
        <form onSubmit={(e) => store.createNote(e, showSuccessNotification)}>
          <TextField
            name="title"
            label="Title"
            fullWidth
            variant="outlined"
            value={store.createForm.title}
            onChange={store.updateCreateFormField}
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            name="body"
            label="Body"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={store.createForm.body}
            onChange={store.updateCreateFormField}
            sx={{ marginBottom: "16px" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            sx={{ padding: "10px", fontWeight: "bold" }}
          >
            Create
          </Button>
        </form>
      </Box>
    )
  );
}
