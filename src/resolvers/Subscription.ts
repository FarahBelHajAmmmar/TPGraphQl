import { subscribe } from "node:diagnostics_channel";

export const Subscription = {
    NewCv: {
        subscribe: (parent, args, { pubsub }, info) => {
            return pubsub.subscribe('NewCv');
        },
        resolve: (payload) => payload,
    },
    DelCv: {
        subscribe: (parent, args, { pubsub }, info) => {
            return pubsub.subscribe('DelCv');
        },
        resolve: (payload) => payload,
    } ,
    UpdCv: {
        subscribe: (parent, args, { pubsub }, info) => {
            return pubsub.subscribe('UpdCv');
        },
        resolve: (payload) => payload,
    } ,
    newMessage: {
        subscribe: (parent, {used}, { pubsub }, info) => {
            return pubsub.subscribe('newMessage' , );
        },
        resolve: (payload) => payload,
    }
};