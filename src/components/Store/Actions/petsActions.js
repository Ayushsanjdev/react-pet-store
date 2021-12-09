import axios from "axios";

export const getPetsRequest = () => {
  return {
    type: "GET_PETS_REQUEST",
  };
};

export const getPetsSuccess = (pets) => {
  return {
    type: "GET_PETS_SUCCESS",
    payload: pets,
  };
};

export const getPetsFailure = (error) => {
  return {
    type: "GET_PETS_ERROR",
    payload: error,
  };
};

export const fetchPets = (status) => {
  return (dispatch) => {
    if (status === "") {
      dispatch(getPetsSuccess([]));
    } else {
      dispatch(getPetsRequest());
      axios
        .get(`https://petstore.swagger.io/v2/pet/findByStatus?status=${status}`)
        .then((response) => {
          const pets = response.data;
          const filterDataId = () => {
            const result = [];
            pets.forEach((item) => {
              const isItemExist = result.some((val) => val.id === item.id);
              if (!isItemExist) {
                result.push(item);
              }
            });
            return dispatch(getPetsSuccess(result));
          };
          filterDataId();
        })
        .catch((error) => {
          dispatch(getPetsFailure(error.message));
        });
    }
  };
};
