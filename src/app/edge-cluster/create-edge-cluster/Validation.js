const validate = values => {
  const errors = {};
  const requiredFields = ['name', 'clusterSecret'];

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  return errors;
};

export default validate;
