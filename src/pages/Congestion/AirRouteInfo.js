import axios from "axios";

const T2Info = () => {
  const test = async () => {
    try {
      const response = await axios.get("/test");
      console.log(response.data);
    } catch (error) {}
  };
  test();
};

export default T2Info;
