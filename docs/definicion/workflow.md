# Workflow
## git
- **`main`**: Rama de producción siempre estable y desplegable.
- **`develop`**: Rama de integración. Los merges de develop a main se hacen únicamente al completar y testear una fase completa.
- **ramas de funcionalidad**: dev-<descripcion-de-la-funcionalidad>: Cada rama se reintegra en develop mediante PR.

### Checklist antes de Merge / Deploy
- [ ] No hay secretos, passwords ni cadenas de conexión reales en el código fuente ni en appsettings.json.
- [ ] El archivo .gitignore incluye carpetas .vs/, bin/, obj/, archivos *.db, *.db-shm, *.db-wal (SQLite) y appsettings.Development.json (si contiene datos sensibles).
- [ ] El comando dotnet build compila sin errores ni warnings críticos.
- [ ] El CSS generado por Tailwind está actualizado.

