import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    const person = localStorage.getItem('person');
    if (token) {
      if(person === 'Student')
        navigate('/dashboard/app', { replace: true });
      else if(person === 'Vendor')
      navigate('vendor/dashboard/', { replace: true });
    }
    else {
      navigate('/login', { replace: true });

    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      // console.log(response.data.person);
      localStorage.setItem("jwtToken", response.data.token);
      localStorage.setItem("person", response.data.person);
      if(response.data.person === 'Student')
        navigate('/dashboard/app', { replace: true });
      else if(response.data.person === 'Vendor')
        navigate('/vendor/dashboard', { replace: true });

    } catch (error) {
      // Handle error response here
      if (error.response && error.response.data && error.response.data.msg) {
        const errorMessage = error.response.data.msg;
        // Display the error message to the user (e.g., using an alert or on the UI)
        alert(errorMessage);
      } else {
        // Handle unexpected errors
        console.error(error);
      }
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" required onChange={(e) => setEmail(e.target.value)} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSubmit();
            }
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleSubmit}>
        Login
      </LoadingButton>
    </>
  );
}
