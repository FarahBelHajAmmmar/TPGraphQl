import { GraphQLError, printSchema } from "graphql";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const Mutation = {

    addCv: async (_, { inputDataCv }, { db,pubsub} ) => {
        console.log(inputDataCv);
        const { name, age, job, user, skills } = inputDataCv;

        const userDB = await prisma.user.findUnique({ where: { id: user } });
        if (!userDB) {
            throw new GraphQLError(`L'utilisateur d'identifiant ${user} n'existe pas.`);
        }

        // Verify if all skills exist
        if (skills !== undefined) {
            const skillsDB = await prisma.skill.findMany({ where: { id: { in: skills } } });
            if (skillsDB.length !== skills.length) {
                throw new GraphQLError("Il y a des skills qui n'existent pas dans la base");
            }
        }
        const cvr = prisma.cv.create({
            data: {
                name: name,
                age: age,
                job: job,
                user: { connect: { id: userDB.id } }
            },
            include: { user: true, skills: true }
        })
        db.cvs.push(cvr);
      pubsub.publish("NewCv" , cvr) ;
        
        return cvr;
    }
    ,
updateCv:async (_,{id , updatecv},{pubsub})=>{

    const { user, skillsid, ...userdata } = updatecv;

    // Verify if the CV exists
    const cvuser = await prisma.cv.findUnique({ where: { id } });
    if (!cvuser) {
        throw new GraphQLError(`Le cv d'identifiant ${id} n'existe pas.`);
    }

    // Verify if the user exists
    const userDB = await prisma.user.findUnique({ where: { id: user } });
    if (!userDB) {
        throw new GraphQLError(`L'utilisateur d'identifiant ${user} n'existe pas.`);
    }

    if (skillsid === undefined) {
        throw new GraphQLError("skillsid is undefined");
    }

    const skillsDB = await prisma.skill.findMany({ where: { id: { in: skillsid } } });

    if (skillsDB.length !== skillsid.length) {
        throw new GraphQLError("Il y a des skills qui n'existent pas dans la base");
    }

    const updatedCv = await prisma.cv.update({
        where: { id },
        data: {
            ...userdata,
            user: { connect: { id: user } },
            skills: { set: skillsid.map(skillId => ({ id: skillId })) }
        },
        include: { user: true, skills: true }
    });
    pubsub.publish("NewCv", updatedCv);

    return updatedCv;
    }
    ,
    DeleteCv: async (_, { id } , {pubsub}) => {
         const cv = await prisma.cv.findUnique({ where: { id } });
        if (!cv) {
            throw new GraphQLError(`Le CV d'identifiant ${id} n'existe pas.`);
        }

        // Delete the CV
        const deletedCv = await prisma.cv.delete({
            where: { id }
        });
        console.log(deletedCv) ; 

        // Publish the delete CV event
        pubsub.publish("NewCv", deletedCv);

        return deletedCv;
    }

}