import base from "./base.service";

const instance = base.service(true);

export const getAll = () => {
    return instance.get("/incidentTypes");
  };

  export const getAllIncidentsByType = (id) => {
    return instance.get(`/incidentTypes/${id}`);
  };

  export default {
    getAll,
    getAllIncidentsByType
  };