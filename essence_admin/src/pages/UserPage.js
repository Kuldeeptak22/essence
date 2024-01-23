/* eslint-disable camelcase */
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState, useEffect } from 'react';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Fade,
  Modal,
  Backdrop,
  Box,
} from '@mui/material';
// components
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { baseURL } from '../utils/API';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

const TABLE_HEAD = [
  { id: 'firstName', label: 'First Name', alignRight: false },
  { id: 'lastName', label: 'Last Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'contact', label: 'Contact', alignRight: false },
  { id: 'dob', label: 'DOB', alignRight: false },
  { id: 'gender', label: 'Gender', alignRight: false },
  { id: 'about', label: 'About', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'edit' },
  { id: 'delete' },
];

// ------ Delete Modal ----
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#50C878', // Set your primary color
    },
    secondary: {
      main: '#FF0000', // Set your secondary color
    },
  },
});

export default function UserPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [fetchedData, setFetchedData] = useState([]);
  const [userID, setUserID] = useState('');

  // =========== delete Modal ==========
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const handleOpen = (id) => {
    setOpen(true);
    setUserID(id);
  };
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/employees/get_employees`);
      setFetchedData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = fetchedData.map((n) => n.firstName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, firstName) => {
    const selectedIndex = selected.indexOf(firstName);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, firstName);
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

  // New User Create
  const createNewUser = () => {
    navigate('/dashboard/user/addUser');
  };
  const editUser = (_id) => {
    navigate(`/dashboard/user/editUser/${_id}`);
  };
  const deleteUser = (Delete_ID) => {
    axios.delete(`${baseURL}/employees/delete_employee/${Delete_ID}`).then((res) => {
      handleClose();
      fetchData();
    });
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - fetchedData.length) : 0;

  const filteredUsers = applySortFilter(fetchedData, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={createNewUser}>
            New User
          </Button>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={fetchedData.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { _id, firstName, lastName, email, contact, dob, gender, about, avatar,role } = row;
                    const selectedUser = selected.indexOf(firstName) !== -1;
                    return (
                      <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, firstName)} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={firstName} src={avatar ? `${baseURL}/uploads/employees/${avatar}` : ''} />
                            <Typography variant="subtitle2" noWrap>
                              {firstName}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{lastName}</TableCell>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell align="left">{contact}</TableCell>
                        <TableCell align="left">{dob}</TableCell>
                        <TableCell align="left">{gender}</TableCell>
                        <TableCell align="left">{about}</TableCell>
                        <TableCell align="left">{role}</TableCell>
                        <TableCell align="right">
                          <ThemeProvider theme={theme}>
                            <Button
                              sx={{ color: 'white', fontWeight: 'bold' }}
                              variant="contained"
                              onClick={() => editUser(_id)}
                              color="primary"
                            >
                              Edit
                            </Button>
                          </ThemeProvider>
                        </TableCell>
                        <TableCell align="right">
                          <ThemeProvider theme={theme}>
                            <Button
                              sx={{ color: 'white', fontWeight: 'bold' }}
                              onClick={() => handleOpen(_id)}
                              variant="contained"
                              color="secondary"
                            >
                              Delete
                            </Button>
                          </ThemeProvider>
                        </TableCell>
                        {/* ========= delete modal ======= */}
                        <Modal
                          aria-labelledby="transition-modal-title"
                          aria-describedby="transition-modal-description"
                          open={open}
                          onClose={handleClose}
                          closeAfterTransition
                          slots={{ backdrop: Backdrop }}
                          slotProps={{
                            backdrop: {
                              timeout: 500,
                            },
                          }}
                        >
                          <Fade in={open}>
                            <Box sx={style}>
                              <Typography id="transition-modal-title" variant="h6" component="h2">
                                Are You Sure ?
                              </Typography>
                              <Button variant="contained" sx={{ m: '20px 12px' }} onClick={() => deleteUser(userID)}>
                                YES
                              </Button>
                              <Button variant="contained" onClick={handleClose}>
                                NO
                              </Button>
                            </Box>
                          </Fade>
                        </Modal>
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
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={fetchedData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
