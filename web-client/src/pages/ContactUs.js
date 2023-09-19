import { Helmet } from 'react-helmet-async';
import React, { useState } from 'react';
import emailjs from 'emailjs-com';

// @mui
import { Grid, Button, Container, Stack, Typography, TextField, Box } from '@mui/material';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
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
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
// ----------------------------------------------------------------------

export default function ContactUs() {
  const id = localStorage.getItem('id');
  const email = localStorage.getItem('email');
  const name = localStorage.getItem('name');
  // console.log(id, email, name);
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

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Helmet>
        <title> Contact Page | IIT Bhilai Dinning System </title>
      </Helmet>
      <div style={{ display: 'flex'}}>
        <Container>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: 600,
                mx: 'auto',

                p: 4,
                // border: '2px solid  #000000',
                borderRadius: '12px',
                boxShadow: 6,
                height: '513px'
              }}
            >
              <Typography variant="h3" align="center" mt={2} mb={2}>
                Mess-Coordinator Details
              </Typography>

              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="Kumar" {...a11yProps(0)} />
                  <Tab label="Galav" {...a11yProps(1)} />
                  <Tab label="Shree Sai" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <Typography variant="h5" align="left" mt={4} mb={1}>
                  Himanshu Rana
                </Typography>
                <Typography subtitle1="h6" align="left" mb={2}>
                  +91-92345 67845
                </Typography>
                <Typography variant="h5" align="left" mb={1}>
                  Himanshu Rana Singh
                </Typography>
                <Typography subtitle1="h6" align="left" mb={2}>
                  +91-92345 67845
                </Typography>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Typography variant="h5" align="left" mt={4} mb={1}>
                  Nishchay
                </Typography>
                <Typography subtitle1="h6" align="left" mb={2}>
                  +91-92345 67845
                </Typography>
                <Typography variant="h5" align="left" mb={1}>
                  Nishant
                </Typography>
                <Typography subtitle1="h6" align="left" mb={2}>
                  +91-92345 67845
                </Typography>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <Typography variant="h5" align="left" mt={4} mb={1}>
                  SRS
                </Typography>
                <Typography subtitle1="h6" align="left" mb={2}>
                  +91-92345 67845
                </Typography>
                <Typography variant="h5" align="left" mb={1}>
                  Dubey
                </Typography>
                <Typography subtitle1="h6" align="left" mb={2}>
                  +91-92345 67845
                </Typography>
              </CustomTabPanel>
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
              maxWidth: '450px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: 600,
                mx: 'auto',

                p: 4,
                // border: '2px solid  #000000',
                borderRadius: '12px',
                boxShadow: 6,
              }}
            >
              <Typography variant="h3" align="center" mt={2} mb={2}>
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
                  inputProps={{readOnly:true}}
                  defaultValue={email}
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
                  inputProps={{readOnly:true}}
                  defaultValue={name}
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
                  inputProps={{readOnly:true}}
                  defaultValue={id}             
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
