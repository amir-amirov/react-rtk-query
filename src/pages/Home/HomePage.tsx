import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  IconButton,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import {
  useCreateLessonMutation,
  useDeleteLessonMutation,
  useGetLessonsQuery,
  useUpdateLessonMutation,
} from "../../services/RTKQuery/endpoints/lessons/lesson";

const HomePage = () => {
  const { data: lessons, error, isFetching, refetch } = useGetLessonsQuery();
  const [createLesson, { isLoading: isCreating }] = useCreateLessonMutation();
  const [deleteLesson, { isLoading: isDeleting }] = useDeleteLessonMutation();
  const [updateLesson, { isLoading: isUpdating }] = useUpdateLessonMutation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const handleCreateOrUpdateLesson = async () => {
    if (!title || !content)
      return alert("Both title and content are required.");

    if (editMode && editId) {
      await updateLesson({ id: editId, data: { title, content } });
    } else {
      await createLesson({ title, content });
    }

    setTitle("");
    setContent("");
    setEditMode(false);
    setEditId(null);
    await refetch();
  };

  const handleEditLesson = (lesson: any) => {
    setTitle(lesson.title);
    setContent(lesson.content);
    setEditId(lesson._id);
    setEditMode(true);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Lessons
      </Typography>

      {/* Show loading */}
      {isFetching && <CircularProgress />}
      {error && <Typography color="error">Failed to fetch lessons</Typography>}

      {/* Lessons List */}
      <Grid container spacing={2}>
        {lessons?.map((lesson: any) => (
          <Grid item xs={12} key={lesson._id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">ID: {lesson._id}</Typography>
                <Typography variant="h6">Title: {lesson.title}</Typography>
                <Typography>Content: {lesson.content}</Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  onClick={() => handleEditLesson(lesson)}
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={async () => {
                    await deleteLesson(lesson._id);
                  }}
                  color="error"
                  disabled={isDeleting}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create/Edit Lesson Form */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">
          {editMode ? "Edit Lesson" : "Create Lesson"}
        </Typography>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Content"
          variant="outlined"
          fullWidth
          margin="normal"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={isCreating || isUpdating}
          sx={{ mt: 2 }}
          onClick={handleCreateOrUpdateLesson}
        >
          {editMode ? "Update" : "Create"}
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
