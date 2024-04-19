enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}



const users = [
  {
    id: 1,
    name: "farah",
    email: "farah@email.com",
    role: Role.ADMIN
  },
  {
    id: 2,
    name: "nour",
    email: "nour@email.com",
    role: Role.USER
  }
];



const skills = [
  { id: 1, designation: "PHP" },
  { id: 2, designation: "SQL" },
];

const cvs = [
  {
    id: 1,
    name: "cv1",
    age: 21,
    job: "data analyst",
    skills:[1],
    user: 1,
  },
  {
    id: 2,
    name: "cv2",
    age: 20,
    job: "software engineer",
    skills:[2,1],
    user: 2,
  }


];

export const db = {
  skills,
  users,
  cvs,
};