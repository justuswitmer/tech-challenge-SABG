const zipcodeReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ZIPCODES':
      return action.payload;
    default:
      return state;
  }
};

export default zipcodeReducer;




