import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import emailjs from 'emailjs-com';

// @mui
import { Grid, Button, Container, Stack, Typography, TextField, Box } from '@mui/material';
import { Form, Input, TextArea } from 'semantic-ui-react';
// components
import Swal from 'sweetalert2';
import Iconify from '../components/iconify';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];
const SERVICE_ID = 'service_3k0ua7g';
const TEMPLATE_ID = 'template_5sw2wi9';
const USER_ID = 'D6DKJjcrvzaH6b4fU';

// ----------------------------------------------------------------------

export default function ContactUs() {
  const handleOnSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID).then(
      (result) => {
        console.log(result.text);
        Swal.fire({
          icon: 'success',
          title: 'Message Sent Successfully',
        });
      },
      (error) => {
        console.log(error.text);
        Swal.fire({
          icon: 'error',
          title: 'Ooops, something went wrong',
          text: error.text,
        });
      }
    );
    e.target.reset();
  };

  return (
    <>
      <Helmet>
        <title> Contact Page | IIT Bhilai Dinning System </title>
      </Helmet>
      <div style={{ display: 'flex' }}>
        <Container>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 'auto',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: 600,
                mx: 'auto',

                p: 2,
                // border: '2px solid  #000000',
                borderRadius: '12px',
                boxShadow: 6,
              }}
            >
              <Typography variant="h3" align="center" mb={4}>
                Mess-Coordinator Details
              </Typography>
              <Typography variant="h5" align="left" mb={4}>
                Mess: Kumar
              </Typography>
              {/* <Box
              sx={{
                
                maxWidth: 600,
                mx: 'auto',

                p: 2,
                // border: '2px solid  #000000',
                borderRadius: '12px',
              }}
              /> */}
              <hr/>
              <Typography variant="h5" align="left" mb={1}>
                Himanshu Rana
              </Typography>
              <Typography subtitle1='h6' align="left" mb={2}>
                +91-92345 67845
              </Typography>
              <Typography variant="h5" align="left" mb={1}>
                Himanshu Rana Singh
              </Typography>
              <Typography subtitle1='h6' align="left" mb={2}>
                +91-92345 67845
              </Typography>
            </Box>
          </Box>
        </Container>
        <Container>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 'auto',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: 600,
                mx: 'auto',

                p: 2,
                // border: '2px solid  #000000',
                borderRadius: '12px',
                boxShadow: 6,
              }}
            >
              <Typography variant="h3" align="center" mb={2}>
                Contact Us
              </Typography>

              <Form onSubmit={handleOnSubmit}>
                <TextField
                  fullWidth
                  margin="normal"
                  id="form-input-control-email"
                  control={Input}
                  label="Email"
                  name="user_email"
                  placeholder="Email"
                  required
                  icon="mail"
                  iconPosition="left"
                />
                <TextField
                  fullWidth
                  margin="normal"
                  id="form-input-control-last-name"
                  control={Input}
                  label="Name"
                  name="from_name"
                  placeholder="Name"
                  required
                  icon="user circle"
                  iconPosition="left"
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="form-input-control-id"
                  control={Input}
                  label="Id"
                  name="from_id"
                  placeholder="ID Number"
                  required
                  icon="user circle"
                  iconPosition="left"
                />
                <TextField
                  fullWidth
                  margin="normal"
                  id="form-textarea-control-opinion"
                  control={TextArea}
                  label="Message"
                  name="message"
                  placeholder="Message…"
                  required
                />
                <Button
                  fullWidth
                  type="submit"
                  sx={{
                    mt: 2,
                    backgroundColor: '#000',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#111',
                    },
                  }}
                >
                  Submit
                </Button>
              </Form>

              {/* <form onSubmit={handleSubmit} action="mailto:piyushc@iitbhilai.ac.in">
              <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                margin="normal"
                required
                type="id"
              />
              <TextField
                fullWidth
                label="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                margin="normal"
                required
                multiline
                rows={4}
              /> */}

              {/* <Button
                fullWidth
                type="submit"
                sx={{
                  mt: 2,
                  backgroundColor: '#000',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#111',
                  },
                }}
              >
                Submit
              </Button> */}
              {/* </form> */}
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
}
