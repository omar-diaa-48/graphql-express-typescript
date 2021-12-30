import { GraphQLSchema } from "graphql";
import mutation from "./mutations";
import RootQueryType from "./types/root_query_type";

export default new GraphQLSchema({
    query:RootQueryType,
    mutation
})