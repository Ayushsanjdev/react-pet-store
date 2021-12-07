import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { InputLabel } from "@mui/material";
import { Typography } from "@material-ui/core";
import { formDefaultValues } from "../Constants/Constants";

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

const FormComponent = (props) => {
  const {
    setOpen,
    formValues,
    setFormValues,
    handlePutReq,
    isSubmitting,
    imgUrl
  } = props;

  const handleInputChange = (e) => {
    const val = {
      ...formValues,
    };
    if (e.target.name === "category") {
      val["category"] = {
        id: Math.floor(Math.random() * 10) * 36,
        name: e.target.value,
      };
    } else {
      val["photoUrls"] = [imgUrl];
      val[e.target.name] = e.target.value;
    }
    setFormValues(val);
  };

  const handlePostReq = () => {
    fetch("https://petstore.swagger.io/v2/pet", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        ...formValues,
      }),
    })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  const handleSubmit = () => {
    if (formValues !== formDefaultValues) {
      handlePostReq();
      setFormValues(formDefaultValues);
      setOpen(false);
    } else {
      window.alert("Please fill all the fields to proceed!");
    }
  };

  return (
    <form>
      <Grid container alignItems='center' justifyContent='center' direction='column'>
        <Grid item>
          <TextField
            name='name'
            label='Name'
            type='text'
            value={formValues.name}
            onChange={handleInputChange}
          />
        </Grid>
        {!isSubmitting && (
          <Grid item style={{ margin: "1rem 0 -0.5rem 0" }}>
            <img src={imgUrl} alt='random dog' width={50} height={50} />
            <Typography>random Img</Typography>
          </Grid>
        )}
        <Grid item>
          <TextField
            name='category'
            label='Category'
            type='text'
            value={formValues.category.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField name='id' label='Id' type='text' value={formValues.id} />
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel variant='standard'>Status</InputLabel>
            <Select
              name='status'
              value={formValues.status}
              onChange={handleInputChange}
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
        {!isSubmitting ? (
          <Button
            style={{ marginTop: "10px" }}
            variant='contained'
            color='primary'
            type='button'
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>
        ) : (
          <Button
            style={{ marginTop: "10px" }}
            variant='outlined'
            color='primary'
            type='button'
            onClick={() => handlePutReq()}
          >
            Update
          </Button>
        )}
      </Grid>
    </form>
  );
};
export default FormComponent;
