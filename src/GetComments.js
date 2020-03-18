import axios from "axios";

export default (GetComments = ({ url }) => {
  let result;
  axios.get(`url`).then(res => {
    result = res.data;
  });
  return result;
});
