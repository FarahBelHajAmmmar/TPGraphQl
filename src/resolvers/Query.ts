import { GraphQLError } from "graphql";

export const Query = {
  getAllcvs: (_, __, { db }) => {
      console.log(db) ; 
      return db.cvs;
  },
  getCvById: (_, { id }, { db }) => {
      const cv = db.cvs.find(cv => cv.id === id);
      if (!cv) {
        throw new GraphQLError("CV not found");
      }
    return cv;
  }
}
    


