# 📦 Microservicio Acortador de URL

Este es un proyecto del plan de estudios de **Back End Development and APIs** de [FreeCodeCamp](https://www.freecodecamp.org/), que implementa un microservicio funcionalmente similar al disponible en:  
👉 [https://url-shortener-microservice.freecodecamp.rocks](https://url-shortener-microservice.freecodecamp.rocks)

## 🚀 Descripción

La aplicación permite acortar URLs válidas y redirigirlas a través de una versión corta. Valida las URLs usando el módulo `dns` de Node.js y no utiliza una base de datos, sino una lista en memoria.

---

## 🧪 Historias de usuario cumplidas

✅ Puedes enviar una URL válida a través de un formulario y recibir una respuesta JSON con una URL acortada.  
✅ Cuando visitas la URL corta, eres redirigido a la URL original.  
✅ Si introduces una URL inválida, recibirás una respuesta JSON con el error `{ "error": "invalid url" }`.

---

## 🔧 Cómo funciona

### ➕ POST `/api/shorturl`

Envía un formulario con la URL original a acortar:

**Ejemplo de solicitud:**

```bash
POST /api/shorturl
Content-Type: application/x-www-form-urlencoded

url=https://freecodecamp.org
```

# Respuesta esperada:

```json
{
  "original_url": "https://freecodecamp.org",
  "short_url": 1
}
```

### 🔁 GET `/api/shorturl/:short`

Accede a la URL acortada para ser redirigido a la URL original.

**Ejemplo de solicitud:**

```bash
GET /api/shorturl/1
```

# Comportamiento:

Si existe: redirige con código 302 a la URL original.

Si no existe: devuelve { "error": "No short URL found" }.
