from fastapi import FastAPI, Request
from fastapi.responses import Response
import httpx

app = FastAPI()

@app.api_route("/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"])
async def proxy(path: str, request: Request):
    target_url = f"http://88.198.150.195:8613/{path}"
    
    # Récupération des paramètres de requête
    query_params = str(request.url.query)
    if query_params:
        target_url += f"?{query_params}"
    
    # Préparation des headers (exclusion des headers problématiques)
    headers = dict(request.headers)
    # Suppression des headers qui peuvent causer des problèmes
    headers.pop('host', None)
    headers.pop('content-length', None)
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.request(
                method=request.method,
                url=target_url,
                headers=headers,
                content=await request.body(),
                timeout=30.0  # Timeout de 30 secondes
            )
            
            # Préparation des headers de réponse
            response_headers = dict(response.headers)
            # Suppression des headers de transfert qui peuvent causer des problèmes
            response_headers.pop('transfer-encoding', None)
            response_headers.pop('content-encoding', None)
            
            return Response(
                content=response.content,
                status_code=response.status_code,
                headers=response_headers,
                media_type=response.headers.get('content-type')
            )
            
        except httpx.RequestError as e:
            return Response(
                content=f"Erreur de connexion: {str(e)}",
                status_code=502,
                media_type="text/plain"
            )
        except httpx.TimeoutException:
            return Response(
                content="Timeout de la requête",
                status_code=504,
                media_type="text/plain"
            )
