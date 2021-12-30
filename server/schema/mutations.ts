import { GraphQLObjectType, GraphQLString } from "graphql";
import UserType from "./types/user_type";
import * as AuthService from "../services/auth"

const mutation = new GraphQLObjectType({
    name:'mutation',
    fields:{
        signup:{
            type:UserType,
            args:{
                email:{type:GraphQLString},
                username:{type:GraphQLString},
                password:{type:GraphQLString},
            },
            resolve(parentValue, args, req){
                const {email, username, password} = args;
                return AuthService.signup(email, username, password, req)
            }
        },
        login:{
            type:UserType,
            args:{
                username:{type:GraphQLString},
                password:{type:GraphQLString},
            },
            resolve(parentValue, args, req){
                const {username, password} = args;
                return AuthService.login(username, password, req)
            }
        }
    }
})

export default mutation;