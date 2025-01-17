import { useState } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import baseService from "../../services/axios/baseService";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!username || !password) {
      setError("Please enter both username and password.");
      setLoading(false);
      return;
    }

    try {
      const response: any = await baseService.post("/login", {
        username,
        password,
      });
      setLoading(false);
      if (response.status == "200") {
        navigate("/home");
      }
    } catch (err: any) {
      setLoading(false);
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        <form onSubmit={handleLogin} noValidate sx={{ width: "100%", mt: 1 }}>
          {error && (
            <Typography color="error" variant="body2" align="center" mb={2}>
              {error}
            </Typography>
          )}

          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            required
            autoFocus
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
