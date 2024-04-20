export const Subscription = {
    Cv : {
        subscribe(parent , args , {pubsub} , info ) {
            console.log(pubsub) ; 
            return pubsub.asyncIterator('cv') ; 
        }
    }
}