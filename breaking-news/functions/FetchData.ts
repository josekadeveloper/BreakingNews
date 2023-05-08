import { Handler, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler: Handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const response = await fetch('https://es.wikipedia.org/wiki/Wikipedia:Portada');
    const data = await response.json();
    console.log(data);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' }),
    };
  }
};
