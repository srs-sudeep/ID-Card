import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import axios from 'axios';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  // Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';
// mock
// import USERLIST from '../../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'to', label: 'To', alignRight: false },
  { id: 'from', label: 'From', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: false },
  { id: 'type', label: 'Basic/AddOn', alignRight: false },
  { id: 'mode', label: 'Mode', alignRight: false },
  { id: 'ref', label: 'Reference', alignRight: false }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    query = query.toLowerCase(); // Convert query to lowercase for case-insensitive search
    return stabilizedThis.filter(([user]) => {
      return Object.values(user).some((value) => {
        if (typeof value === 'string') {
          // If the value is a string, check if it contains the query
          return value.toLowerCase().includes(query);
        } 
        if (typeof value === 'number') {
          // If the value is a number, convert it to a string and check
          return value.toString().includes(query);
        }
        // For other data types, skip the filter
        return false;
      });
    }).map(([user]) => user);
  }
  
  return stabilizedThis.map(([el]) => el);
  
}


export default function UserPage() {
  const [txn, setTxn] = useState([]);
  const [firstVisitH, setFirstVisitH] = useState(true);
  useEffect(() => {
    const name = localStorage.getItem('name');
    async function txnData() {
      try {
        const res = await axios.post('http://localhost:5000/api/txn/details', { name });
        // console.log(res.data);
        setTxn(res.data);
        localStorage.setItem('txn', res.data);
      }
      catch (error) {
        console.log("Error fetching transaction");
        console.log(error);
      }
    }
    // const hasVisitedBeforeH = sessionStorage.getItem('hasVisitedPageH');
    // if (!hasVisitedBeforeH) {
    txnData();
    // setFirstVisitH(false);
    // sessionStorage.setItem('hasVisitedPageH', 'true');
    // }
  }, []);
  // console.log(USERLIST)


  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const users = txn.map((num, index) => ({
    accountFrom: num.account_from,
    accountTo: num.account_to,
    amount: num.amount,
    trnsType: num.trns_type,
    foodMode: num.food_type,
    trnsDate: num.trns_date,
    category: num.category,
    trnsRef: num.trns_reference,
  }));
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const filteredUsers = applySortFilter(users, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  // console.log(txn[0]);
  // txn.map((numb, index) => (
  //   console.log(numb.account_from);
  //   // return  numb ;
  // ));



  return (
    <>
      <Helmet>
        <title> History Page | IIT Bhilai Dinning System </title>
      </Helmet>

      <Container>
        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button>
        </Stack> */}

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={users.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, trnsDate, accountFrom, trnsType, accountTo, foodMode, amount, trnsRef } = row;
                    const selectedUser = selected.indexOf(trnsDate) !== -1;
                    const date = new Date(trnsDate);

                    // Define options for formatting the date
                    const options = {
                      year: 'numeric',
                      month: 'short', // Use 'short' for abbreviated month name
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true // Use 12-hour format with AM/PM
                    };

                    // Format the date using the options
                    const formattedDate = date.toLocaleString('en-US', options);


                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          {/* <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, trnsDate)} /> */}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {/* <Avatar alt={name} src={avatarUrl} /> */}
                            <Typography variant="subtitle2" noWrap>
                              {formattedDate}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{accountTo}</TableCell>

                        <TableCell align="left">{accountFrom}</TableCell>

                        <TableCell align="left">{amount}</TableCell>

                        <TableCell align="left">
                          <Label>{sentenceCase(trnsType)}</Label>
                        </TableCell>
                        <TableCell align="center">{foodMode}</TableCell>
                        {/* <TableCell align="center">{category}</TableCell> */}
                        <TableCell align="center">{trnsRef}</TableCell>
                        {/* <TableCell align="center">{trnsRef}</TableCell> */}

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            {/* <Iconify icon={'eva:more-vertical-fill'} /> */}
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={users.length}
            // count={"10"}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      {/* <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover> */}

    </>
  );
}
