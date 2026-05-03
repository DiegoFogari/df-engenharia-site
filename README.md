# DF Engenharia - Landing Page + Comercial Interativo

Projeto de landing page premium para automacao residencial da **DF Engenharia**, com tema dark cinematografico, comercial em audio interativo e captura de leads.

## Stack

- **Frontend:** React 19 + CRACO + Tailwind CSS 3 + componentes estilo shadcn/ui
- **Backend:** FastAPI + MongoDB + OpenAI TTS (via `emergentintegrations`)

## Estrutura

- `frontend/` aplicacao React
- `backend/` API FastAPI

## Rodar localmente

### 1) Backend

```bash
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
# Linux/macOS:
source .venv/bin/activate
pip install -r requirements.txt
uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

### 2) Frontend

```bash
cd frontend
yarn install
yarn start
```

O frontend usa `REACT_APP_BACKEND_URL` para apontar para a API.

## Deploy Frontend (Vercel)

1. Suba o projeto para um repositório Git.
2. No Vercel, clique em **New Project** e importe o repositório.
3. Selecione a pasta `frontend/` como Root Directory.
4. Configure variavel:
   - `REACT_APP_BACKEND_URL=https://seu-backend.railway.app`
5. Deploy.
6. O arquivo `frontend/vercel.json` ja faz rewrite SPA para `index.html`.

## Deploy Backend (Railway)

1. No Railway, crie novo projeto e conecte o repositório.
2. Defina `backend/` como diretório do serviço.
3. Railway usara `Dockerfile` e `railway.toml`.
4. Configure variaveis de ambiente:
   - `MONGO_URL`
   - `EMERGENT_LLM_KEY`
   - `CORS_ORIGINS`
5. Faça deploy e copie a URL publica.
6. Atualize `REACT_APP_BACKEND_URL` no Vercel com essa URL.

## Variaveis de ambiente

### Frontend (`frontend/.env`)

```env
REACT_APP_BACKEND_URL=http://localhost:8000
```

### Backend (`backend/.env`)

```env
MONGO_URL=mongodb://localhost:27017/df_engenharia
EMERGENT_LLM_KEY=sua-chave
CORS_ORIGINS=http://localhost:3000
```
