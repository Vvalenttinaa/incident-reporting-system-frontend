import base from "./base.service";

const instance = base.service(true);

export const login = (username, password) => {
    return instance.get(`/users/username/${username}`);
  }

  export default {
    login
  };

