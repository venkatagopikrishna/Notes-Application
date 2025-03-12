import { Box, Button, Typography } from "@mui/material";
import notesStore from "../stores/notesStore";

export default function Note({ note }) {
    const store = notesStore()

    return (
        <Box
        sx={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "16px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
        >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Title: <Typography component="span">{note.title}</Typography>
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "8px" }}>
                Body: <Typography component="span">{note.body}</Typography>
            </Typography>


        <Box sx={{ display: "flex", gap: "8px", marginTop: "16px" }}>
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => store.deleteNote(note._id)}
                >
                    Delete Note
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => store.toggleUpdate(note)}
                >
                    Update Note
                </Button>
            </Box>
    </Box>);
}
