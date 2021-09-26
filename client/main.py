import json
from fastapi import FastAPI, WebSocket, Request, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from typing import List
import json
import time
from pygtail import Pygtail



json_path = "log-paths.json"
log_lists = json.load(open(json_path))


app = FastAPI()
msgs = []
templates = Jinja2Templates(directory="templates")
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)


manager = ConnectionManager()
@app.get("/")
async def get(request : Request):
    return templates.TemplateResponse("index.html", {"request" : request, "msgs" : msgs})

@app.get("/logsinfo")
def LogsInfo():
    return log_lists

log_path = "example.log"


@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    await manager.connect(websocket)
    try:
        while True:
            manager.broadcast(json.dumps({'msgs' : msgs}))
            data = await websocket.receive_text()
            msgs.append(data)
            print(client_id)

            # for line in Pygtail(log_path):
            #     msgs.append(line)
            #     print('yolo')
            await manager.broadcast(json.dumps({'msgs' : msgs}))

            # with open(log_path) as f:
            #     line_read = f.readline()
            #     if line_read != "":
            #         msgs.append(line_read)
                
            
    except WebSocketDisconnect:
        manager.disconnect(websocket)
