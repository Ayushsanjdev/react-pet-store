import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@mui/icons-material/Edit";
import StatusBar from "../Tables/Statusbar";
import Pagination from "./Pagination";
import { fetchPets } from "../Store/Actions/petsActions";
import { connect } from "react-redux";

const tableHeadings = [
  {
    id: "name",
    name: "Name",
    align: "left",
    width: 30,
  },
  {
    id: "category",
    name: "Category",
    align: "left",
    width: 80,
  },
  {
    id: "photoUrl",
    name: "Photo Url",
    align: "left",
    width: 50,
  },
  {
    id: "availablity",
    name: "Availablity",
    align: "left",
    width: 50,
  },
];

const useStyles = makeStyles({
  table: {
    minWidth: 500,
    minHeight: 400,
  },
  container: {
    border: "3px groove transparent",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  },
  statusContainer: {
    width: "100%",
  },
  dataMessage: {
    textAlign: "center",
    fontFamily: "monospace",
    marginTop: "3rem",
  },
  tableRow: {
    backgroundColor: "lightGrey",
  },
  tableCell: {
    width: 30,
    fontSize: "1.1rem",
  },
  editIcon: {
    cursor: "pointer",
    fontSize: "1rem",
    verticalAlign: "middle",
    color: "orange",
  },
});

const TableComponent = (props) => {
  const {
    open,
    setOpen,
    formValues,
    setFormValues,
    fetchPets,
    petsData,
    loading,
    // dataError,
  } = props;
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, petsData.length - page * rowsPerPage);

  const rowsWithData =
    rowsPerPage > 0
      ? petsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : petsData;

  useEffect(() => {
    fetchPets(status);
  }, [status, fetchPets]);

  const handleStatusChange = (e) => {
    if (e.target.value === "") {
      setStatus("");
    } else {
      setStatus(e.target.value);
    }
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const selectUser = (id, name, categoryName, categoryId, status) => {
    const newValues = {
      id,
      category: {
        id: categoryId,
        name: categoryName,
      },
      name,
      status,
    };
    setFormValues({
      ...formValues,
      ...newValues,
    });
    setOpen(true);
  };

  const handleEditForm = (pet) => {
    selectUser(
      pet.id,
      pet.name,
      pet.category.name,
      pet.category.id,
      pet.status
    );
    setIsSubmitting(true);
  };

  const handlePutReq = () => {
    fetch("https://petstore.swagger.io/v2/pet", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...formValues,
      }),
    })
      .then((res) => {
        console.log(res);
        window.alert("your update will be applied soon!!");
      })
      .catch((err) => console.log(err));
    setOpen(false);
  };

  return (
    <>
      <StatusBar
        status={status}
        statusChange={handleStatusChange}
        open={open}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
        setOpen={setOpen}
        formValues={formValues}
        setFormValues={setFormValues}
        handlePutReq={handlePutReq}
      />
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table}>
          <TableHead>
            {status !== "" && (
              <TableRow className={classes.tableRow}>
                {tableHeadings.map((item) => {
                  return (
                    <TableCell
                      key={item.id}
                      style={{ width: item.width }}
                      align={item.align}
                    >
                      {item.name}
                    </TableCell>
                  );
                })}
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            {!loading ? (
              rowsWithData.map((pet) => (
                <TableRow key={pet.id}>
                  <TableCell
                    className={classes.tableCell}
                    component='th'
                    scope='row'
                  >
                    {pet.name}{" "}
                    <EditIcon
                      className={classes.editIcon}
                      onClick={() => handleEditForm(pet)}
                    />
                  </TableCell>
                  <TableCell style={{ width: 80 }} align='left'>
                    {pet.category ? pet.category.name : "N/A"}
                  </TableCell>
                  <TableCell style={{ width: 50 }} align='left'>
                    {pet.photoUrls && pet.photoUrls[0] ? (
                      <img
                        src={pet.photoUrls[0]}
                        alt='pet'
                        width='50px'
                        height='50px'
                      />
                    ) : (
                      <p>N/A</p>
                    )}
                  </TableCell>
                  <TableCell style={{ width: 50 }} align='left'>
                    {pet.status}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <h3 className={classes.dataMessage}>LOADING...</h3>
            )}

            {status === "" && (
              <h3 className={classes.dataMessage}>
                Tweak status to show details
              </h3>
            )}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                count={petsData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={Pagination}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    petsData: state.pets,
    loading: state.loading,
    dataError: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPets: (status) => dispatch(fetchPets(status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableComponent);
