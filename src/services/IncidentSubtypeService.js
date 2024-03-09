import base from "./base.service";

const instance = base.service(true);

export const findByTypeId = (id) => {
    return instance.get(`/incidentSubtypes/types/${id}`);
};

export default {
    findByTypeId
};
