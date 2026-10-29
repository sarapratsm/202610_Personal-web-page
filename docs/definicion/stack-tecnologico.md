# Stack tecnológico

- Framework: .NET 10
- Patrón de diseño de interfaz de usuario: MVC
- Acceso a datos: Datos en memoria (seed) para la Fase 1; Entity Framework Core (EF Core) con Code-First y migraciones planificado para Fase 2
- Mapeo de objetos: Pendiente de implementar (Mapperly o similar)
- Base de datos: SQLite en desarrollo y PostgreSQL para producción (planificado)
- Estilos: Bootstrap + CSS propio en `wwwroot/css/site.css`
- Arquitectura de software: Capas simplificadas (Core, Infrastructure, Web) con separación de responsabilidades

## Tooling y Configuración
- Manejo de secretos: User Secrets en local, Variables de Entorno en producción
