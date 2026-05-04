import os
from datetime import datetime
from pathlib import Path
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
import httpx

load_dotenv()

COMMERCIAL_SCRIPT = (
    "Voce ja imaginou viver em uma casa que entende exatamente o que voce precisa, no momento em que voce precisa? "
    "O verdadeiro luxo, hoje, nao e apenas ter uma casa linda... mas uma casa inteligente. "
    "Apresento a voces o coracao da sua nova casa: o painel de automacao da DF Engenharia. "
    "Com um design sofisticado e tecnologia de ponta, ele centraliza todo o controle do seu lar... de forma segura, e invisivel. "
    "Com o nosso aplicativo, totalmente personalizado, voce tem o controle do mundo na palma da sua mao. "
    "Preparando o jantar? Um toque... e a cozinha ganha vida. "
    "Hora de descansar? As luzes do quarto se apagam, suavemente, para o seu conforto. "
    "E para os momentos em que suas maos estao ocupadas... a sua voz e o seu controle. "
    "A nossa automacao se integra, perfeitamente, com os assistentes virtuais que voce ja usa. "
    "Na DF Engenharia, nos sabemos que cada familia e unica. "
    "Por isso, nao vendemos pacotes fechados. "
    "Entregamos projetos cem por cento personalizaveis, desenhados individualmente para a sua rotina, o seu estilo... e o seu bolso. "
    "Seja qual for o tamanho do seu sonho... a tecnologia pode alcanca-lo. "
    "DF Engenharia. Automacao residencial, feita para voce. Entre em contato, e agende a sua consultoria."
)

AUDIO_CACHE_DIR = Path("audio_cache")
AUDIO_CACHE_DIR.mkdir(parents=True, exist_ok=True)
AUDIO_FILE = AUDIO_CACHE_DIR / "df_commercial.mp3"

app = FastAPI(title="DF Engenharia API")

cors_origins = [origin.strip() for origin in os.getenv("CORS_ORIGINS", "*").split(",")]
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins if cors_origins != ["*"] else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

mongo_url = os.getenv("MONGO_URL", "mongodb://localhost:27017/df_engenharia")
# Usamos AsyncIOMotorClient que já foi importado no seu topo
mongo_client = AsyncIOMotorClient(mongo_url)

# O Render/MongoDB Atlas às vezes não retorna o DB padrão na URL, 
# então definimos um nome fixo caso falhe.
db = mongo_client.get_default_database() 
if db is None:
    db = mongo_client["df_engenharia_db"]
    
leads_collection = db["leads"]


class ContactCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    phone: str = Field(min_length=8, max_length=32)
    email: str = Field(default="", max_length=200)
    message: str = Field(default="", max_length=4000)
    project_type: str = Field(default="", max_length=120)


class ContactOut(BaseModel):
    id: str
    name: str
    phone: str
    email: str
    message: str
    project_type: str
    created_at: datetime


@app.get("/api/")
async def health_check():
    return {"status": "ok", "service": "df-engenharia-backend"}


@app.get("/api/commercial/info")
async def commercial_info():
    return {
        "voice": "nova",
        "model": "tts-1-hd",
        "speed": 0.92,
        "script": COMMERCIAL_SCRIPT,
    }


async def _generate_audio_file() -> None:
    api_key = os.getenv("OPENAI_API_KEY") or os.getenv("EMERGENT_LLM_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="OPENAI_API_KEY not configured")
    try:
        async with httpx.AsyncClient(timeout=120.0) as client:
            response = await client.post(
                "https://api.openai.com/v1/audio/speech",
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": "tts-1-hd",
                    "input": COMMERCIAL_SCRIPT,
                    "voice": "nova",
                    "speed": 0.92,
                    "response_format": "mp3",
                },
            )
            if response.status_code != 200:
                raise ValueError(f"OpenAI API returned {response.status_code}: {response.text}")
            AUDIO_FILE.write_bytes(response.content)
    except httpx.HTTPError as exc:
        raise HTTPException(status_code=502, detail=f"Error calling OpenAI TTS: {exc}") from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Error generating audio: {exc}") from exc


@app.get("/api/commercial/audio")
async def commercial_audio():
    if not AUDIO_FILE.exists():
        await _generate_audio_file()
    return FileResponse(AUDIO_FILE, media_type="audio/mpeg", filename="df-comercial.mp3")


@app.post("/api/contact")
async def create_contact(payload: ContactCreate):
    data = payload.model_dump()
    data["created_at"] = datetime.utcnow()
    result = await leads_collection.insert_one(data)
    return {"ok": True, "id": str(result.inserted_id)}


@app.get("/api/contact", response_model=List[ContactOut])
async def list_contacts(limit: Optional[int] = 100):
    cursor = leads_collection.find().sort("created_at", -1).limit(max(1, min(limit or 100, 500)))
    docs = await cursor.to_list(length=limit or 100)
    response = []
    for doc in docs:
        response.append(
            ContactOut(
                id=str(doc["_id"]),
                name=doc["name"],
                phone=doc["phone"],
                email=doc["email"],
                message=doc["message"],
                project_type=doc["project_type"],
                created_at=doc["created_at"],
            )
        )
    return response
