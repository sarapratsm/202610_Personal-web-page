using System;
using System.Collections.Generic;
using System.Text;
using MiWebPersonal.Core.Interfaces;
using MiWebPersonal.Core.Models;

namespace MiWebPersonal.Infrastructure.Services
{
    public class ProyectoService : IProyectoService
    {

        private List<Proyecto> proyectos = new List<Proyecto>();

        public Proyecto ObtenerProyectoPorId(int id)
        {
            throw new NotImplementedException();
        }

        public List<Proyecto> ObtenerTodos()
        {
            if (proyectos.Count == 0)
            {
                proyectos.Add(new Proyecto
                {
                    Id = 1,
                    Titulo = "Mi Web Personal",
                    Descripcion = "¡Sí, es este proyecto!",
                    Tecnologias = new System.Collections.ArrayList
                    {
                        new Tecnologia { Id = 1, Nombre = "C#"},
                        new Tecnologia { Id = 2, Nombre = "ASP.NET Core" },
                        new Tecnologia { Id = 3, Nombre = "Entity Framework Core" }
                    }
                });

                proyectos.Add(new Proyecto
                {
                    Id = 2,
                    Titulo = "Rutex",
                    Descripcion = "Proyecto desarrollado en la empresa Maccion Lean Solutions",
                    Tecnologias = new System.Collections.ArrayList
                    {
                        /*  backend/     .NET 10 · ASP.NET Core · Clean Architecture (modular monolith) · Dapper · PostgreSQL
                            frontend/    React 19 · Vite 8 · TypeScript · Tailwind v4 · shadcn/ui · TanStack Router/Query · Zustand (pnpm)*/
                        new Tecnologia { Id = 1, Nombre = "C#"},
                        new Tecnologia { Id = 2, Nombre = "ASP.NET Core" }

                    }
                });
            }
            return proyectos;
        }
    }
}
