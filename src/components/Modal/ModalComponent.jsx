import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import FormComponent from "../Forms/FormComponent";
import { formDefaultValues } from "../Constants/Constants";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: "25%",
    left: "25%",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ModalComponent = (props) => {
  const {
    open,
    setOpen,
    formValues,
    setFormValues,
    handlePutReq,
    isSubmitting,
    setIsSubmitting,
  } = props;
  const classes = useStyles();
  const [imgUrl, setImgUrl] = useState("");

  const genUniId = new Date().getTime();

  const getRandomImg = () => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((res) => res.json())
      .then((img) => setImgUrl(img.message));
  };

  const handleAddPet = () => {
    formValues["id"] = genUniId;
    getRandomImg();
    setFormValues(formDefaultValues);
    setOpen(true);
    setIsSubmitting(false);
  };

  const body = (
    <div className={classes.paper}>
      <FormComponent
        open={open}
        setOpen={setOpen}
        formValues={formValues}
        setFormValues={setFormValues}
        handlePutReq={handlePutReq}
        isSubmitting={isSubmitting}
        handleAddPet={handleAddPet}
        imgUrl={imgUrl}
      />
    </div>
  );

  return (
    <div>
      <Button variant="outlined" onClick={() => handleAddPet()}>
        Add Pet
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        {body}
      </Modal>
    </div>
  );
};

export default ModalComponent;
