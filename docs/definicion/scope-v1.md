# Scope
Fecha: 2026-10-26

## Fase 1: MVP
 - Home: Presentación, bio técnica, enlaces a perfiles y stack tecnológico destacado.
 - Proyectos: Catálogo de proyectos destacados con título, descripción, tecnologías utilizadas, enlaces a repositorios/demos y capturas.
 - Contacto: Formulario con validación tanto en cliente (Data Validation attributes de ASP.NET) como en servidor, con notificación por email (vía servicio SMTP/SendGrid encapsulado tras una interfaz).
 - Seeding de datos iniciales para que la web no esté vacía hasta la fase 2.
 - Descarga del CV
 - Página 404 personalizada: Configurar UseStatusCodePagesWithReExecute para no mostrar la pantalla de error por defecto si alguien escribe una ruta inexistente.
 - Seguridad anti-spam de contacto: Los formularios abiertos en internet reciben bots casi de inmediato. Bastará con meter una técnica simple de Honeypot (un campo oculto por CSS que si viene relleno invalida la petición) o Turnstile/reCAPTCHA.
 - Persistencia de mensajes (además del mail) en una tabla ContactMessages.


 ## Fase 2: Panel de administración
 - Autenticación/Autorización: Implementación de ASP.NET Core Identity (o autenticación basada en Cookies) para acceder a una ruta /admin.
- CRUD de Proyectos: Crear, editar, ocultar y eliminar proyectos sin tocar la base de datos a mano.
- Subida de imágenes: Guardar capturas de los proyectos (localmente en wwwroot o en almacenamiento blob).
- Vista de ContactMessages

## Fase 3: Extensión de scope
- Micro-blog
- Métricas sencillas: Contador anónimo de visitas o logs de descargas (por ejemplo, del CV en PDF).