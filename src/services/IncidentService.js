import base from "./base.service";

const instance = base.service(true);

export const getAll = () => {
    return instance.get("/incidents");
  };

  export const getAllApproved = () => {
    return instance.get("/incidents/approved");
  };

  export const getAllNotApproved = () => {
    return instance.get("/incidents/notApproved");
  };

  export const getAllRejected = () => {
    return instance.get("/incidents/rejected");
  };

export const addIncident = (data) => {
  return instance.post("/incidents", data);
}

export const deleteIncident = (id) => {
  return instance.delete(`/incidents/${id}/deleteIncident`);
};

export const approveIncident = (id) => {
  return instance.put(`/incidents/${id}/approveIncident`);
};

export const rejectIncident = (id) => {
  return instance.put(`/incidents/${id}/rejectIncident`);
};

  export default {
    getAll, 
    addIncident,
    getAllApproved,
    getAllNotApproved,
    getAllRejected,
    deleteIncident,
    approveIncident,
    rejectIncident
  };