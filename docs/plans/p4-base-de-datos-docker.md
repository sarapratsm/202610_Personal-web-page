# P4 — Plan de aprendizaje: base de datos en Docker y mis proyectos

**Objetivo:** montar yo misma una base de datos en un contenedor Docker, conectarla a la web con Entity Framework Core (EF Core) y guardar en ella mis proyectos, de modo que `ProyectoService` lea de la base de datos en lugar de una lista escrita en el código. Al terminar sabré levantar y destruir una base de datos con Docker Compose, modelar tablas con código (Code-First), crear migraciones, sembrar datos y probar un servicio que accede a datos.

**Alcance:** `MiWebPersonal.Core` (modelos), `MiWebPersonal.Infrastructure` (contexto, servicio, sembrado), `MiWebPersonal.Web` (registro y configuración) y un `docker-compose.yml` en la raíz. Se queda fuera, y tendrá su propio plan: el panel de administración (CRUD), la subida de imágenes, el contenedor de la propia web y el despliegue.

**Relación con otros planes:**
- **P3, paso 9:** allí quedó pendiente la decisión de ampliar `Proyecto` con año y repositorio. Este plan la resuelve (paso 4). Puedo hacer P4 antes o después de ese paso; si lo hago antes, el paso 9 de P3 ya tendrá datos reales.
- **Decisiones previas que este plan cambia:** `docs/definicion/scope-v1.md` y `docs/references/README.md` dicen que en el MVP los proyectos viven en el código. Pasan a vivir en base de datos. Lo actualizo en el paso 12.

## Reglas del juego

Las mismas que en P2 y P3: no avanzo hasta que el paso funciona, escribo el código a mano, uso la escalera de ayuda de cinco peldaños. Además:

- **El repositorio es público.** Ninguna contraseña real, cadena de conexión real ni dato privado se escribe en un fichero versionado. Las contraseñas van en un `.env` (ya está en el `.gitignore`) y en User Secrets. Lo versionado lleva solo valores de ejemplo.
- **La base de datos es desechable.** Lo que importa es que pueda destruirla y volver a crearla con dos comandos (`docker compose down -v` y `docker compose up -d`, más aplicar migraciones) y quede igual. Si no puedo, algo está mal.
- **Lo que ejecuta la base de datos lo ejecuto yo en la terminal** y leo cada mensaje de error.

## Cierre común (se repite en TODOS los pasos)

- [ ] `dotnet build` compila sin errores ni avisos míos.
- [ ] `dotnet test` pasa.
- [ ] No hay contraseñas, cadenas de conexión reales ni `.env` en lo que voy a commitear (`git status` y `git diff --staged` revisados).
- [ ] La web sigue arrancando y las demás páginas cargan.
- [ ] Sé explicar con mis palabras cada línea y cada comando que he escrito.
- [ ] Commit hecho (mensaje corto, en español, sin prefijos).

---

## Conocimientos previos

Ya conozco de las prácticas de DAM: SQL básico, tablas y relaciones, Entity Framework Core con Code-First y Docker con MariaDB. Lo nuevo es aplicarlo en esta arquitectura de capas (Core, Infrastructure, Web), con PostgreSQL, con migraciones desde la línea de comandos y con un servicio que se puede probar sin Docker.

## Herramientas

| Herramienta | Qué es y por qué la uso |
|---|---|
| **Docker Compose** | Describe en un fichero (`docker-compose.yml`) qué contenedores necesito y cómo se configuran. Cualquiera (yo en otro ordenador, o alguien que clone el repositorio) levanta la misma base de datos con `docker compose up -d`. |
| **PostgreSQL** | Base de datos relacional de código abierto. Es la que ya está planificada en `stack-tecnologico.md` para producción y la que se usa en Rutex, en el trabajo. Decisión del paso 1: la alternativa que ya conozco es MariaDB. |
| **EF Core + Npgsql** | EF Core es el ORM (mapea clases C# a tablas). Npgsql es su proveedor para PostgreSQL. Con Code-First, las clases son la fuente de verdad y las migraciones generan el SQL. |
| **Migraciones** | Ficheros que describen cada cambio del esquema. Se versionan junto al código y dejan que la base de datos de cualquier máquina se ponga al día. |
| **User Secrets** | Almacén local, fuera del repositorio, para la cadena de conexión en desarrollo (ya decidido en `stack-tecnologico.md`). |
| **SQLite en memoria (solo en tests)** | Una base de datos real, pero efímera y sin Docker, para probar el servicio. Así la integración continua de GitHub no necesita contenedores. |

## Referencias

Todas comprobadas con `curl` (200) el 2026-11-24.

- [Docker Compose (visión general)](https://docs.docker.com/compose/)
- [Referencia del fichero Compose](https://docs.docker.com/reference/compose-file/)
- [Volúmenes de Docker](https://docs.docker.com/engine/storage/volumes/)
- [Variables de entorno en Compose](https://docs.docker.com/compose/how-tos/environment-variables/set-environment-variables/)
- [Imagen oficial `postgres` en Docker Hub](https://hub.docker.com/_/postgres)
- [Documentación de PostgreSQL](https://www.postgresql.org/docs/current/)
- [Npgsql Entity Framework Core Provider](https://www.npgsql.org/efcore/)
- [Configurar un `DbContext` (EF Core)](https://learn.microsoft.com/en-us/ef/core/dbcontext-configuration/)
- [Relaciones muchos a muchos (EF Core)](https://learn.microsoft.com/en-us/ef/core/modeling/relationships/many-to-many)
- [Migraciones (EF Core)](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/?tabs=dotnet-core-cli)
- [Siembra de datos (EF Core)](https://learn.microsoft.com/en-us/ef/core/modeling/data-seeding)
- [Carga de datos relacionados, `Include` (EF Core)](https://learn.microsoft.com/en-us/ef/core/querying/related-data/eager)
- [Probar código que usa EF Core](https://learn.microsoft.com/en-us/ef/core/testing/)
- [Inyección de dependencias en ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-10.0)
- [Secretos de aplicación (User Secrets)](https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-10.0)

## Los datos de partida

Fuente: `docs/references/wireframes.html`, constantes `PROYECTOS` y `FILTRO`. Es la información que doy por fiable. **No copio este bloque a ciegas:** lo escribo yo en el código del paso 8 y lo comparo con el wireframe.

Las 15 tecnologías (lista `FILTRO` sin «Todas»): C#, .NET / ASP.NET Core, Entity Framework Core, SQLite, MariaDB, Oracle, WPF, Java, Hibernate, Spring Boot, Android, Room, Python, Odoo, Docker.

| # | Título | Año | Descripción | Tecnologías | Repositorio (`github.com/sarapratsm/…`) |
|---|---|---|---|---|---|
| 1 | Mi web personal | 2026 | Introducción a ASP.NET Core: esta misma web. | C#, .NET / ASP.NET Core | `202610_Personal-web-page` |
| 2 | PokeReport | 2026 | Práctica 3 de Diseño de interfaces. | C#, Entity Framework Core, MariaDB, WPF, Docker | `DI_P3_PokeReport` |
| 3 | PokeApp | 2026 | Práctica 2 de Diseño de interfaces. | C#, Entity Framework Core, MariaDB, WPF, Docker | `DI_P2_PokeApp` |
| 4 | GameApp | 2026 | Práctica 1 de Android. | Java, Android, Room, SQLite | `PMDM_P1_GameApp` |
| 5 | Yumeworld | 2026 | RPG, proyecto final de curso de DAM 2025/26. | C#, Entity Framework Core, MariaDB, WPF, Java, Hibernate, Spring Boot, Docker | `PR_P2_Yumeworld` |
| 6 | Módulo school plus | 2026 | Ampliación del módulo school de Odoo, práctica 2 de Gestión Empresarial. | Python, Odoo | `SGE_P2_Odoo_modul_school_plus` |
| 7 | Módulo school | 2026 | Módulo de pruebas en Odoo. | Python, Odoo | `SGE_P1_Odoo_modul_school` |
| 8 | Autofactory | 2025 | Proyecto 1 de DAM 2. | C#, Entity Framework Core, Oracle, WPF | `PR_P1_AutofactoryNET` |

**Qué hay que decidir con estos datos** (paso 1):
- El `ProyectoService` actual tiene además **Rutex** (proyecto de la empresa), que **no** está en el wireframe. ¿Lo incluyo? Es un proyecto de trabajo y el repositorio es público: decido yo qué puedo contar de él.
- El wireframe nombra la tecnología **«.NET / ASP.NET Core»**; el servicio actual usa «ASP.NET Core». Hay que quedarse con un solo nombre, porque será el texto del filtro de Proyectos.
- Orden de las fichas: de la más reciente a la más antigua; con el mismo año, el orden de la tabla (campo extra o el `Id`, a decidir en el paso 4).
- Todos los repositorios son públicos hoy, pero el wireframe prevé fichas «Repositorio privado». Por eso el repositorio es un campo **opcional** (`string?`).

---

## FASE A — La base de datos en Docker

### Paso 1 · Decisiones antes de escribir nada
- **Objetivo:** dejar por escrito las decisiones que condicionan todo el plan.
- **Conceptos:** elegir una tecnología con criterios, no por costumbre.
- **Qué hago:** respondo aquí, con una frase de porqué cada una:
  1. **Motor:** PostgreSQL (recomendado: ya está en `stack-tecnologico.md` para producción, coincide con el del trabajo y desarrollar con el mismo motor que producción evita sorpresas) o MariaDB (el que ya conozco).
  2. **Rutex:** ¿entra o no entra?
  3. **Nombre único de la tecnología .NET** (el del wireframe u otro).
  4. **Sembrado:** `HasData` (los datos van dentro de la migración) o una clase que siembra al arrancar (paso 8).
- **Pista:** `HasData` con relaciones muchos a muchos obliga a sembrar también la tabla intermedia con identificadores a mano. Mira en la documentación de siembra qué ventajas e inconvenientes tiene cada opción antes de elegir.
- **Cómo sé que funciona:** las cuatro decisiones están escritas aquí, con su porqué.

**✅ Checklist**
- [ ] Decisión 1 (motor) tomada y justificada: _______
- [ ] Decisión 2 (Rutex) tomada y justificada: _______
- [ ] Decisión 3 (nombre de la tecnología .NET): _______
- [ ] Decisión 4 (sembrado): _______
- [ ] Cierre común hecho.

### Paso 2 · `docker-compose.yml` con la base de datos
- **Objetivo:** que `docker compose up -d` deje una base de datos funcionando en mi máquina, y que sus datos sobrevivan a apagar el contenedor.
- **Conceptos:** imagen y contenedor, puerto publicado, variables de entorno, volumen con nombre, `healthcheck`, reinicio, fichero `.env`.
- **Qué hago:** creo `docker-compose.yml` en la raíz del repositorio con un servicio de base de datos. Fijo una **versión mayor concreta** de la imagen (no `latest`; las etiquetas disponibles están en Docker Hub). Usuario, contraseña y nombre de la base de datos salen de un `.env` local. Añado `.env.example` (versionado) con valores falsos y compruebo que `.env` sigue ignorado por Git. El volumen guarda los datos. Publico el puerto **solo en el propio equipo** (`127.0.0.1:...`).
- **Pista:** cada versión mayor de la imagen oficial de PostgreSQL puede esperar el volumen en una ruta distinta. Antes de escribir el `volumes:`, lee en la página de la imagen la sección que habla de `PGDATA` y de dónde guardar los datos para la versión que elijas.
- **Cómo sé que funciona:** `docker compose up -d` arranca, `docker compose ps` lo muestra como «healthy», y tras `docker compose down` (sin `-v`) y otro `up -d` la base de datos sigue teniendo sus datos.

**✅ Checklist**
- [ ] El fichero está en la raíz y la versión de la imagen no es `latest`.
- [ ] Usuario, contraseña y nombre de la base de datos vienen del `.env`, no están escritos en el compose.
- [ ] `.env` está en `.gitignore` (compruébalo con `git check-ignore -v .env`) y `.env.example` sí se versiona, con valores falsos.
- [ ] El puerto solo escucha en `127.0.0.1`.
- [ ] Hay un volumen con nombre para los datos.
- [ ] Hay un `healthcheck` y `docker compose ps` muestra «healthy».
- [ ] Sé explicar la diferencia entre `down` y `down -v`.
- [ ] Sé explicar por qué la contraseña no va en el `docker-compose.yml`.
- [ ] Cierre común hecho.

### Paso 3 · Entrar en la base de datos a mano
- **Objetivo:** comprobar con mis propios ojos que la base de datos existe y responde, antes de conectarle código.
- **Conceptos:** cliente de línea de comandos, `docker compose exec`, `\l`, `\dt`, `\q` (en PostgreSQL), o su equivalente si elijo otro motor.
- **Qué hago:** abro un cliente SQL dentro del contenedor con `docker compose exec` y listo las bases de datos y las tablas (aún no habrá tablas). Creo una tabla de juguete, inserto una fila, la consulto, y después **la borro**.
- **Pista:** si el cliente no conecta, mira `docker compose logs` y lee el último mensaje antes de tocar nada.
- **Cómo sé que funciona:** veo mi base de datos en la lista y puedo crear, consultar y borrar la tabla de prueba.

**✅ Checklist**
- [ ] Entro con el cliente y veo mi base de datos.
- [ ] He leído los registros del contenedor con `docker compose logs`.
- [ ] La tabla de juguete está borrada al terminar.
- [ ] Sé explicar a qué se refiere `localhost:PUERTO` desde mi equipo y qué es `localhost` desde dentro del contenedor.
- [ ] Cierre común hecho.

---

## FASE B — El modelo y EF Core

### Paso 4 · Ampliar el modelo
- **Objetivo:** que `Proyecto` tenga todo lo que muestra la ficha del wireframe: año, repositorio opcional y tecnologías compartidas con otros proyectos.
- **Conceptos:** relación **muchos a muchos** (un proyecto usa muchas tecnologías; una tecnología aparece en muchos proyectos), propiedad de navegación, tipos que admiten nulos (`string?`), regla: `Core` **no** conoce EF Core.
- **Qué hago:** en `Core/Models`, añado a `Proyecto` el año y la URL del repositorio (opcional), y en `Tecnologia` la lista de proyectos que la usan. Decido cómo guardar el orden de las fichas con el mismo año.
- **Pista:** hoy `Tecnologia` tiene `Id`, `Nombre` e `Icono?`. Dibuja en papel dos proyectos y tres tecnologías compartidas: ¿qué tabla necesitas en medio y de quién es?
- **Cómo sé que funciona:** compila, y el test que instancia `Proyecto` sigue pasando.

**✅ Checklist**
- [ ] `Proyecto` tiene año y repositorio opcional (`string?`).
- [ ] `Proyecto` y `Tecnologia` se referencian entre sí con listas (muchos a muchos).
- [ ] No hay ninguna referencia a EF Core ni atributos de base de datos en `Core` (o, si pongo alguno, sé justificar por qué).
- [ ] Las listas se inicializan (no son `null`).
- [ ] Sé explicar con un dibujo cómo se guarda un muchos a muchos en una base de datos relacional.
- [ ] Cierre común hecho.

### Paso 5 · Paquetes y `AppDbContext`
- **Objetivo:** tener un contexto de base de datos que describa las tablas y sus reglas, en la capa correcta.
- **Conceptos:** `DbContext`, `DbSet<T>`, `OnModelCreating`, **Fluent API** frente a atributos (*Data Annotations*), índice único, longitudes máximas.
- **Qué hago:** instalo en `Infrastructure` el paquete de EF Core para PostgreSQL (Npgsql) y el de diseño para las migraciones en `Web` (el proyecto de arranque). Creo `Infrastructure/Data/AppDbContext.cs` (la carpeta `Data` ya existe). Configuro con Fluent API: títulos y descripciones con longitud máxima y no nulos; el nombre de la tecnología con **índice único**; la relación muchos a muchos.
- **Pista:** averigua qué paquete necesita `dotnet ef` en el proyecto de arranque y cuál en el proyecto que contiene el contexto. Y por qué importa que sean distintos.
- **Cómo sé que funciona:** `dotnet build` compila y puedo explicar cada línea de `OnModelCreating`.

**✅ Checklist**
- [ ] El contexto está en `Infrastructure/Data`, no en `Core` ni en `Web`.
- [ ] Hay un `DbSet<Proyecto>` y un `DbSet<Tecnologia>`.
- [ ] El nombre de la tecnología tiene índice único y longitud máxima.
- [ ] Título y descripción tienen longitud máxima y son obligatorios.
- [ ] Los paquetes están en los proyectos correctos y las versiones son compatibles con .NET 10.
- [ ] Sé explicar por qué prefiero Fluent API (o atributos) en esta arquitectura.
- [ ] Cierre común hecho.

### Paso 6 · Conectar: cadena de conexión y registro del contexto
- **Objetivo:** que la web sepa a qué base de datos conectarse sin que la contraseña esté en el repositorio.
- **Conceptos:** cadena de conexión, `ConnectionStrings` en configuración, User Secrets, `AddDbContext`, ciclo de vida *Scoped*, `GetConnectionString`.
- **Qué hago:** inicializo User Secrets en `Web`, guardo ahí la cadena de conexión (con los mismos datos que mi `.env`) y registro el contexto en `Program.cs` con `AddDbContext`. Si falta la cadena, la web debe **fallar al arrancar con un mensaje claro**, no más tarde con un error oscuro.
- **Pista:** `appsettings.json` es un fichero versionado: ahí no va nada que sea secreto. Pregúntate qué configuración sí podría ir ahí (y cuál no) y qué prioridad tiene cada fuente de configuración al leer.
- **Cómo sé que funciona:** la web arranca con la base de datos encendida; si borro el secreto o apago el contenedor, el error es comprensible.

**✅ Checklist**
- [ ] La cadena de conexión está en User Secrets, **no** en `appsettings.json`.
- [ ] `git grep -i password` no muestra ninguna contraseña real.
- [ ] `AddDbContext` está en `Program.cs` y el contexto se inyecta por constructor.
- [ ] Si falta la cadena, la web lanza un error con un mensaje claro.
- [ ] Sé explicar por qué el contexto es *Scoped* y no *Singleton*.
- [ ] Sé explicar de dónde sale la cadena de conexión según el entorno (desarrollo y producción).
- [ ] Cierre común hecho.

### Paso 7 · Primera migración
- **Objetivo:** crear las tablas en la base de datos a partir de mis clases.
- **Conceptos:** `dotnet ef migrations add`, `dotnet ef database update`, la carpeta `Migrations`, el *snapshot* del modelo, `--project` y `--startup-project`.
- **Qué hago:** instalo la herramienta `dotnet ef`, creo la migración inicial y **leo el código que genera antes de aplicarlo**. La aplico y compruebo las tablas con el cliente del paso 3.
- **Pista:** en una solución con varios proyectos, `dotnet ef` necesita saber dónde está el contexto (`--project`) y cuál es el proyecto de arranque (`--startup-project`). Lee el mensaje de error si olvidas alguno.
- **Cómo sé que funciona:** con `\dt` (o su equivalente) veo las tablas de proyectos, tecnologías y la intermedia, con las columnas y restricciones que esperaba.

**✅ Checklist**
- [ ] La migración está versionada y su nombre dice qué hace.
- [ ] He leído el `Up` y el `Down` generados y sé explicar qué hacen.
- [ ] Veo las tres tablas en la base de datos, y el índice único del nombre de la tecnología.
- [ ] Sé destruir todo (`docker compose down -v`), volver a levantar y recrear las tablas con `database update`.
- [ ] Anoto en `docs/apuntes/comandos-interesantes.md` los comandos `dotnet ef` que uso.
- [ ] Cierre común hecho.

---

## FASE C — Los datos de mis proyectos

### Paso 8 · Sembrar las tecnologías y los 8 proyectos
- **Objetivo:** que, tras crear la base de datos, aparezcan mis proyectos con sus tecnologías, sin insertarlos a mano.
- **Conceptos:** sembrado de datos, **idempotencia** (ejecutar dos veces no duplica), reutilizar una misma tecnología en varios proyectos, `Add`/`AddRange`, `SaveChanges`.
- **Qué hago:** según mi decisión del paso 1: o bien `HasData` en el contexto con una nueva migración, o bien una clase de sembrado en `Infrastructure/Data` que se ejecuta al arrancar **solo en desarrollo** y solo si las tablas están vacías. Primero las 15 tecnologías, luego los proyectos enlazados a **las mismas instancias** de tecnología (no una tecnología nueva por proyecto).
- **Pista:** si creo `new Tecnologia { Nombre = "C#" }` en cada proyecto, ¿cuántas filas «C#» salen? Piensa en cómo guardar primero las tecnologías y buscarlas por nombre después.
- **Cómo sé que funciona:** en el cliente veo 8 proyectos, 15 tecnologías y la tabla intermedia con las filas correctas (por ejemplo, Yumeworld tiene 8 tecnologías). Si reinicio la web, nada se duplica.

**✅ Checklist**
- [ ] Hay 15 tecnologías (sin duplicados) y 8 proyectos.
- [ ] Cada proyecto tiene exactamente las tecnologías de la tabla de datos de partida (consulta de comprobación con el cliente).
- [ ] Reiniciar la web **no** duplica nada.
- [ ] El sembrado no se ejecuta en producción.
- [ ] Los repositorios están escritos tal y como en el wireframe (compruébalos pulsando algún enlace).
- [ ] Sé explicar qué es la idempotencia y cómo la consigo aquí.
- [ ] Cierre común hecho.

### Paso 9 · `ProyectoService` lee de la base de datos
- **Objetivo:** que el servicio deje de tener la lista escrita en el código y consulte la base de datos.
- **Conceptos:** inyectar `AppDbContext` en un servicio, `Include` (carga de datos relacionados), `OrderByDescending` / `ThenBy`, `ToList`, `FirstOrDefault`, `AsNoTracking` en consultas de solo lectura, y opcionalmente `async`/`await`.
- **Qué hago:** reescribo `ObtenerTodos()` para devolver los proyectos con sus tecnologías, del más reciente al más antiguo. Implemento `ObtenerProyectoPorId(int id)` (hoy lanza `NotImplementedException`). Decido qué devuelve si el `id` no existe. Decido si paso la interfaz a `async` (`Task<...>`): es lo habitual con bases de datos, pero toca controlador y tests.
- **Pista:** quita `Include` y mira qué lista de tecnologías llega a la vista. ¿Por qué? Después busca en la documentación qué hace `AsNoTracking` y cuándo sirve.
- **Cómo sé que funciona:** la página de Inicio (o Proyectos, si ya existe) muestra los 8 proyectos con sus tecnologías, leídos de la base de datos.

**✅ Checklist**
- [ ] `ProyectoService` ya no tiene la lista escrita ni el campo `proyectos` en memoria.
- [ ] Las tecnologías de cada proyecto llegan cargadas.
- [ ] El orden es del año más reciente al más antiguo, con un desempate estable.
- [ ] `ObtenerProyectoPorId` está implementado y decido (y documento) qué pasa si no existe.
- [ ] Decidido si la interfaz pasa a `async`: _______ (y, si sí, todo el camino hasta el controlador es `async`).
- [ ] Las consultas de solo lectura usan `AsNoTracking`.
- [ ] Sé explicar qué hace `Include` y qué pasaría sin él.
- [ ] Cierre común hecho.

### Paso 10 · Verlo en la web
- **Objetivo:** que las fichas de la web muestren los datos reales, incluyendo año y repositorio.
- **Conceptos:** el viaje del dato: base de datos → EF Core → servicio → controlador → vista Razor.
- **Qué hago:** adapto la vista que muestra los proyectos (hoy `Index.cshtml`; la de Proyectos, cuando exista según P3) para pintar año, descripción, etiquetas y botón «Ver repositorio» (o «Repositorio privado» si no hay URL). El diseño en sí es de P3: aquí solo compruebo que los datos llegan.
- **Cómo sé que funciona:** veo los 8 proyectos en el orden esperado; una ficha cuyo repositorio está vacío en la base de datos muestra «Repositorio privado».

**✅ Checklist**
- [ ] Los 8 proyectos se ven con su año, descripción y etiquetas.
- [ ] El botón del repositorio apunta a la URL correcta y se abre en pestaña nueva (`rel="noopener noreferrer"`).
- [ ] Si vacío el repositorio de un proyecto en la base de datos, sale «Repositorio privado» (lo restauro después).
- [ ] Si apago el contenedor, la web falla de forma controlada (sé decir qué ve la persona visitante) y lo dejo anotado como pendiente si no está resuelto.
- [ ] Sé explicar cada salto del viaje del dato, de la tabla a la pantalla.
- [ ] Cierre común hecho.

---

## FASE D — Calidad y documentación

### Paso 11 · Probar el servicio sin Docker
- **Objetivo:** tests que comprueban `ProyectoService` y que funcionan en mi máquina y en GitHub Actions, sin base de datos instalada.
- **Conceptos:** *Arrange / Act / Assert*, base de datos efímera en memoria (SQLite en memoria), por qué no basta con *InMemory* para comprobar relaciones y restricciones (léelo en la guía de pruebas de EF Core), un contexto nuevo por test para que no se contaminen.
- **Qué hago:** añado el paquete necesario al proyecto de tests, creo una base de datos en memoria con el mismo `AppDbContext` y escribo pruebas: devuelve los proyectos ordenados por año, incluye sus tecnologías, `ObtenerProyectoPorId` con un id que existe y con otro que no.
- **Pista:** al probar con SQLite en memoria, la base de datos desaparece cuando se cierra la conexión. Busca cómo mantener la conexión abierta mientras dura el test.
- **Cómo sé que funciona:** `dotnet test` pasa en mi máquina **con Docker apagado**, y el flujo de GitHub Actions sigue en verde.

**✅ Checklist**
- [ ] Al menos 4 tests del servicio (orden, tecnologías cargadas, id existente, id inexistente).
- [ ] Cada test crea su propia base de datos (no dependen unos de otros).
- [ ] Con Docker apagado, `dotnet test` pasa.
- [ ] El flujo de GitHub Actions (`dotnet.yml`) sigue pasando sin tocar nada de Docker.
- [ ] Sé explicar por qué los tests no se conectan a la base de datos de Docker.
- [ ] Cierre común hecho.

### Paso 12 · Documentar y cerrar
- **Objetivo:** que cualquiera (yo dentro de seis meses) pueda levantar el proyecto con la base de datos leyendo el repositorio.
- **Qué hago:**
  - `README.md`: sección «Cómo arrancar en local» con los pasos exactos (copiar `.env.example` a `.env`, `docker compose up -d`, guardar el secreto, `dotnet ef database update`, `dotnet run`).
  - `docs/definicion/stack-tecnologico.md`: acceso a datos y base de datos (hoy dicen «datos en memoria» y «SQLite en desarrollo»).
  - `docs/definicion/scope-v1.md` y `docs/references/README.md`: la decisión «contenido en el código» cambia para los proyectos.
  - `docs/definicion/workflow.md`: casilla en la checklist de merge para el `.env`, y para las migraciones.
  - `docs/plans/p0-to-do.md` y este plan: casillas al día.
- **Cómo sé que funciona:** hago la prueba definitiva: clono el repositorio en otra carpeta, sigo **solo** el README y la web arranca con los 8 proyectos.

**✅ Checklist**
- [ ] Un clon limpio arranca siguiendo solo el README.
- [ ] `stack-tecnologico.md`, `scope-v1.md` y `docs/references/README.md` están al día.
- [ ] La checklist de merge de `workflow.md` incluye el `.env` y las migraciones.
- [ ] `git ls-files` no contiene `.env` ni ninguna contraseña.
- [ ] Sé destruir y recrear todo (contenedor, volumen, tablas y datos) en menos de cinco minutos.
- [ ] Sé explicar con mis palabras cada fichero nuevo del plan.
- [ ] Cierre común hecho.

---

## Buenas prácticas que trabajo en este plan

- **Infraestructura como código:** la base de datos se describe en un fichero versionado, no en pasos manuales.
- **Secretos fuera del repositorio:** `.env` y User Secrets; en lo versionado, solo ejemplos.
- **Un solo origen de verdad para el esquema:** las clases y las migraciones, nunca tablas creadas a mano.
- **Capas limpias:** `Core` no depende de EF Core; el acceso a datos vive en `Infrastructure`; `Web` solo configura y consume la interfaz.
- **Idempotencia** al sembrar datos.
- **Pruebas rápidas y sin dependencias externas** (sin Docker en los tests).
- **Fijar versiones** de imágenes y paquetes en lugar de `latest`.
- **Commits pequeños:** uno por paso, como mínimo.

## Ideas extra (cuando todo lo anterior esté hecho)

- Servicio de aplicación en Docker (un `Dockerfile` para la web y un segundo servicio en el mismo compose).
- Filtro de proyectos por tecnología hecho en la base de datos (consulta con `Where` + `Any`) en vez de en el navegador.
- Experiencia y formación también en base de datos.
- Un script `reiniciar-bd` (o un apunte) que encadene `down -v`, `up -d` y `database update`.
- Copia de seguridad y restauración de la base de datos con las herramientas del propio motor.
- Panel de administración (Fase 2 del scope) para editar proyectos sin tocar código.
