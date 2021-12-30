import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

const UserType = new GraphQLObjectType({
    name:'UserType',
    fields:{
        id:{type:GraphQLID},
        username:{type:GraphQLString},
        email:{type:GraphQLString},
    }
})

export default UserType;