import { GraphQLError } from "graphql";

export const Mutation = {

    addCv: (_, { inputDataCv }, { db } ) => {
        const { name, age, job, user, skills } = inputDataCv;

        // Vérifie d'abord si l'utilisateur existe déjà
        const userDB = db.users.find((userDB) => userDB.id === user);
        if (!userDB) {
            throw new GraphQLError(`L'utilisateur d'identifiant ${user} n'existe pas.`);
        }
        // verifie si tous les skills existent
        if (skills !== undefined){
            const skillsDB = db.skills.filter((skill) => skills.includes(skill.id));
            if (skillsDB.length !== skills.length){
                throw new GraphQLError("il ya des skills qui n'existant pas dans la base") ; 
            }
        }

        const cv = {
            id: db.cvs.length + 1 ,
            name,
            age,
            job,
            user,
            skills
        };

        db.cvs.push(cv);

        return cv;
    }
    
,
updateCv:(parent,{id,updateCv},{db})=>{

    console.log(updateCv);
    const {user ,skillsid,...userdata} = updateCv;
    console.log('uSERData,',userdata);


    console.log('uSER,',user);
    console.log('Skill',skillsid);
     // Vérifie d'abord si le cv  existe déjà
     const CvIndex = db.cvs.findIndex((CvDB) => CvDB.id === id);
     if (CvIndex==-1) {
         throw new GraphQLError(`Le cv d'identifiant ${CvIndex} n'existe pas.`);
     } 
     // Vérifie d'abord si l'utilisateur existe déjà
     const userDB = db.users.find((userDB) => userDB.id === user);
     if (!userDB) {
         throw new GraphQLError(`L'utilisateur d'identifiant ${user} n'existe pas.`);
     }
      // verifie si tous les skills existent
      const skillsDB = db.skills.filter((skill) => skillsid.includes(skill.id));
      if (skillsDB.length !== skillsid.length){
          throw new GraphQLError("il ya des skills qui n'existant pas dans la base")
      }

      let cv=db.cvs[CvIndex];
      cv.skills=skillsid;
      for(let key in updateCv){
        if( key != skillsid )
          cv[key] = updateCv[key];
  
      }
      return cv ;
    }
    ,
    DeleteCv: (_, { id }, { db } , info) => {
        if (id === undefined){
            throw new GraphQLError(`L'cv d'identifiant ${id} n'existe pas.`);
        }
        const index = db.cvs.findIndex((i) => i.id == id)
        if (index === -1){
            throw new GraphQLError(`L'cv d'identifiant ${id} n'existe pas.`);
        }
        const [cv] = db.cvs.splice(index , 1 ) ;  
        return cv ; 
    }
}