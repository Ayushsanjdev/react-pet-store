import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Grid } from "@material-ui/core";
import ModalComponent from "../Modal/ModalComponent";

const menuItems = [
  {
    id: "none",
    name: "None",
    value: "",
  },
  {
    id: "sold",
    name: "Sold",
    value: "sold",
  },
  {
    id: "available",
    name: "Available",
    value: "available",
  },
  {
    id: "pending",
    name: "Pending",
    value: "pending",
  },
];

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const StatusBar = (props) => {
  const {
    status,
    statusChange,
    open,
    setOpen,
    formValues,
    setFormValues,
    handlePutReq,
    isSubmitting,
    setIsSubmitting,
  } = props;
  const classes = useStyles();

  return (
    <Grid container justifyContent='space-between' alignItems='center'>
      <Grid item>
        <FormControl variant='outlined' className={classes.formControl}>
          <InputLabel>Status</InputLabel>
          <Select
            color='primary'
            value={status}
            onChange={statusChange}
            label='Status'
          >
            {menuItems.map((item) => {
              return (
                <MenuItem key={item.id} value={item.value}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      {status !== "" && (
        <Grid item>
          <ModalComponent
            open={open}
            setOpen={setOpen}
            formValues={formValues}
            setFormValues={setFormValues}
            handlePutReq={handlePutReq}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default StatusBar;
