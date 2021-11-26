import { document } from "../utils/dinamoClient";

export const handle = async (event) => {
   const { user_id } = event.pathParameters;

   const response = await document
     .scan({
       TableName: "todos",
       FilterExpression:
         "contains(user_id, :user_id)",
       ExpressionAttributeValues: {
         ":user_id": user_id,
       },
     })
     .promise();
    
   
   return {
     statusCode: 200,
     body: JSON.stringify({
       response,
     }),
     headers: {
       "Content-type": "application/json",
     },
   };
};
