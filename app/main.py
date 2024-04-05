from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

from .auth.handlers import router as auth_router
from .files.handlers import router as files_router
from .live_socket.handlers import router as ws_router
from .nosql.handlers import router as nosql_router
from .songs.handlers import router as song_router

app = FastAPI()

app.include_router(song_router)
app.include_router(auth_router)
app.include_router(files_router)
app.include_router(ws_router)
app.include_router(nosql_router)

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://127.0.0.1:3000",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/ping")
async def pong():
    return {"ping": "pong!"}


@app.get("/bootstrap", response_class=HTMLResponse)
async def read_item(request: Request, user_id: str):
    templates = Jinja2Templates(directory="app/templates")
    return templates.TemplateResponse(
        request=request, name="index.html", context={"id": user_id}
    )
