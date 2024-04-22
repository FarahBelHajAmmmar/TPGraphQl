
export const Cv = {
    user: ({user}, _, {db}) => {
        return db.users.find((user1) => user1.id === user);
    },
    skills: ({ skills }, _, { db }) => {
        if (!skills) return [];
        return skills.map(skillId => db.skills.find(skill => skill.id === skillId));
    },
   

}

