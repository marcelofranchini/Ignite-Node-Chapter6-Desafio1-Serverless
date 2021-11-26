import { document } from '../utils/dinamoClient'
import { v4 as uuidv4 } from "uuid";


interface ITodo{
  id: string,
  user_id: string,
  title: string,
	done: boolean,
	deadline: Date
}

interface IBody{
  title: string;
  deadline: Date;
}
export const handle = async (event) => {
  const { title, deadline } = JSON.parse(event.body) as IBody;
  const { user_id } = event.pathParameters;
  const id = uuidv4()
  const deadlineResponse = new Date(deadline)
  const done = false

  const responseTodo: ITodo = {
    deadline: deadlineResponse,
    title,
    user_id,
    done,
    id
  }

  
  const response = await document
    .query({
      TableName: "todos",
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": id,
      },
    })
    .promise();


  const todoExists = response.Items[0];

  if (!todoExists) {
    await document
      .put({
        TableName: "todos",
        Item: responseTodo
      })
      .promise();
  }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Atividade criada com sucesso",
        responseTodo
      }),
      headers: {
        "Content-type": "application/json",
      },
    };
 }
