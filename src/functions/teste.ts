import { document } from "../utils/dinamoClient";
import { v4 as uuidv4 } from "uuid";

export const handle = async (event) => {
  const id = uuidv4();
 
    await document
      .put({
        TableName: "todos",
        Item: {id},
      }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Atividade criada com sucesso",
    }),
    headers: {
      "Content-type": "application/json",
    },
  };
};
