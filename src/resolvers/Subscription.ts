// export const Subscription = {
//     Cv : {
//         subscribe(parent , args , {pubsub} , info ) {
//             subscribe: () => return pubsub.subscribe('Cv')  ; 
//             resolve: payload => payload
//             return pubsub.as
//         }
//     }
// }
export const Subscription = {
    NewCv: {
        subscribe: (parent, args, { pubsub }, info) => {
            return pubsub.subscribe('NewCv');
        },
        resolve: (payload) => payload,
    },
};