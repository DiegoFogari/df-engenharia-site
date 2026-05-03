FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]
MONGO_URL = mongodb+srv://diihfogari:<db_password>@cluster0.nnzw1av.mongodb.net/?appName=Cluster0
EMERGENT_LLM_KEY = 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
CORS_ORIGINS = http://localhost:3000
