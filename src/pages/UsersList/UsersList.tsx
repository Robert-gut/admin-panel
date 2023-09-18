import React, { ReactNode, useEffect, useState } from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import { visuallyHidden } from "@mui/utils";
import "./UsersList.css";
import Modal from "@mui/material/Modal";
import UpdateUserAll from "./UpdateUserEdit/UpdateUserEdit";
import {
  getAllUsers,
  deleteUser,
} from "../../services/api-user-service/api-user-service";

interface Data {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  roles: string;

  edit: string;
}

const headCells: HeadCell[] = [
  {
    id: "firstName",
    numeric: false,
    disablePadding: true,
    label: "First Name",
  },
  {
    id: "lastName",
    numeric: false,
    disablePadding: false,
    label: "Last Name",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "phone",
    numeric: true,
    disablePadding: false,
    label: "Phone Number",
  },
  {
    id: "roles",
    numeric: false,
    disablePadding: false,
    label: "Roles",
  },
  {
    id: "edit",
    numeric: false,
    disablePadding: false,
    label: "Edit",
  },
];

function createData(
  firstName: string,
  lastName: string,
  email: string,
  phone: number,
  roles: string,
  edit?: ReactNode
): Data {
  return {
    firstName,
    lastName,
    email,
    phone,
    roles,
    edit,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: Data[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const styleByEd = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              hideSortIcon={orderBy !== headCell.id}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: keyof Data;
  rowCount: number;
}

const EnhancedTableToolbar = (props: EnhancedTableProps) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%", fontSize: "2.5rem", fontWeight: "bold" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          UsersList :
        </Typography>
      )}
    </Toolbar>
  );
};

export default function EnhancedTable() {
  const [open, setOpen] = useState(false);
  const [showUpdateUserAll, setShowUpdateUserAll] = useState(false);
  const [usersList, setUsersList] = useState<Data[]>([]);
  const [deleteUserId, setDeleteUserId] = useState<string>("");

  const handleDeleteUser = async (deleteUserId: string) => {
    console.log(deleteUserId);
    
    try {
      const updatedUsersList = usersList.filter(
        (user) => user.id !== deleteUserId
      );
      setUsersList(updatedUsersList);

      await deleteUser(deleteUserId);

      alert(`Користувач успішно видалений.`);
    } catch (error) {
      console.error(error);
      alert(`Помилка при видаленні користувача`);
    } finally {
      handleClose();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllUsers();
        setUsersList(result.response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleOpen = (deleteUserId: string) => {
    setOpen(true);
    setDeleteUserId(deleteUserId);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteUserId(deleteUserId);
  };

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("name");
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = usersList.map((user) => user.id);

      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - usersList.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onRequestSort={handleRequestSort}
          onSelectAllClick={handleSelectAllClick}
          order={order}
          orderBy={orderBy}
          rowCount={usersList.length}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
              rowCount={usersList.length}
            />
            <TableBody>
              {stableSort(usersList, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow className="table" key={row._id}>
                    <TableCell align="center">{row.firstName}</TableCell>
                    <TableCell align="center">{row.lastName}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.phone}</TableCell>
                    <TableCell align="center">{row.roles}</TableCell>
                    <TableCell align="center" sx={styleByEd}>
                      <UpdateUserAll />
                      <IconButton
                        color="error"
                        onClick={() => handleOpen(row._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={usersList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Підтвердження видалення
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Ви впевнені, що бажаєте видалити користувача?
          </Typography>
          <button
            className="btnModal"
            onClick={() => handleDeleteUser(deleteUserId)}
          >
            Так
          </button>

          <button className="btnModal" onClick={handleClose}>
            Ні
          </button>
        </Box>
      </Modal>
    </Box>
  );
}
