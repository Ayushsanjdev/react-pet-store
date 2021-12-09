const initialState = {
  loading: false,
  pets: [],
  error: "",
};

const petReducers = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PETS_REQUEST":
      return {
        ...state,
        loading: true,
        pets: [],
      };
    case "GET_PETS_SUCCESS":
      return {
        loading: false,
        pets: action.payload,
        error: "",
      };
    case "GET_PETS_FAILURE":
      return {
        loading: false,
        pets: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default petReducers;
