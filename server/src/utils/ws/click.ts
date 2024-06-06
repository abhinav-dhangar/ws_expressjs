import { WebSocket, WebSocketServer } from "ws";

const onClickWS = (
  ws: WebSocket,
  wss: WebSocketServer,
  data: any,
  isBinary?: boolean
) => {
  // let parsedData;
  // console.log(parsedData.event);
  // try {
  //   parsedData = JSON.parse(data.toString("utf-8"));
  // } catch (error) {
  //   parsedData = data.toString("utf-8");
  // }

  if (data?.event == "event:click") {
    console.log("inside warning event");

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        console.log(" onclick : ", data.response);
        let sendEventData = {
          type: data.event,
          data: data.response,
        };

        client.send(JSON.stringify(sendEventData));
      }
    });
  }
};

export { onClickWS };
