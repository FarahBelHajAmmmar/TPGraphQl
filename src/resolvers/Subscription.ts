export const Subscription = {
    Cv : {
        subscribe(parent , args , {pubsub} , info ) {
            subscribe: () => pubsub.subscribe('Cv')  ; 
            resolve: payload => payload
        }
    }
}