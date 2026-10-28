using MiWebPersonal.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MiWebPersonal.Core.Interfaces
{
    public interface IProyectoService
    {
        List<Proyecto> ObtenerTodos();

        Proyecto ObtenerProyectoPorId(int id);

    }
}
