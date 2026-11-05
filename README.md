# 202610_Personal-web-page
A modo de introducción a ASP.NET Core.

![Status](https://img.shields.io/badge/Status-En%20Desarrollo-orange?style=for-the-badge&logo=git)
![Made with Love](https://img.shields.io/badge/Made%20with-Love-pink?style=for-the-badge&logo=heart)
![.NET 10](https://img.shields.io/badge/.NET-10.0-512BD4?style=for-the-badge&logo=dotnet)
![C#](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=csharp)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

--
## Intención
Se planea desarrollar este proyecto a lo largo del tiempo. Es una carrera de fondo, no un sprint. 
La intención de este proyecto es primeramente, desarrollar una página web. Al haber centrado mis estudios en las aplicaciones de escritorio, el ámbito web es un terreno bastante sin explorar, y me gustaría que dejara de ser así. 

La intención también es que esta web esté hecha con mucho amor y paciencia, que parece que hoy en día escasea. No me sirve simplemente crear una web que funcione. Quiero crear una web que entienda cómo funciona. Quiero pelearme con el código y darme cabezazos contra la pared; los que haga falta. 

La intención NO es usar IA para escribir código. la intención es escribir yo misma el código, a la antigua usanza, pues creo que este es el camino (sí, el camino dificil) que puede llevarme a ser mejor programadora. Sí será aceptable el uso de IA para hacer documentación posterior.

---

## Stack Tecnológico

* **Plataforma & Framework:** .NET 10 (ASP.NET Core MVC)
* **Lenguaje:** C#
* **Acceso a datos:**
  * **Fase 1 (MVP):** Colecciones y *seed data* en memoria.
  * **Fase 2:** Entity Framework Core (Code-First + Migraciones).
* **Bases de datos:** SQLite (desarrollo local) / PostgreSQL (producción planificada).
* **Frontend:** Razor Views, Bootstrap y CSS modular personalizado (`site.css`).
* **Seguridad & Configuración:** *User Secrets* para entorno de desarrollo local y variables de entorno para producción.

---

## Estructura del proyecto (provisional)
```text
├── docs/                 # Documentación técnica, alcance y flujos de trabajo
├── src/                  # Código fuente de la solución
│   ├── Core/             # Dominio: Entidades, modelos base e interfaces
│   ├── Infrastructure/   # Acceso a datos, persistencia y servicios externos (Email/SMTP)
│   └── Web/              # Presentación: Controladores MVC, ViewModels y Vistas Razor
└── tests/                # Pruebas unitarias y de integración
```

