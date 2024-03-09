import base from "./base.service";

const instance = base.service(true);

export const getAll = () => {
    return instance.get("/addresses");
  };

  export default {
    getAll
  };