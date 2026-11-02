using Microsoft.AspNetCore.Mvc;
using MiWebPersonal.Core.Interfaces;
using MiWebPersonal.Core.Models;
using MiWebPersonal.Web.Models;
using System.Diagnostics;

namespace MiWebPersonal.Web.Controllers;

public class HomeController : Controller
{
    private readonly IProyectoService _proyectoService;

    public HomeController(IProyectoService proyectoService)
    {
        _proyectoService = proyectoService;
    }

    /// <summary>
    /// Muestra la página de inicio del sitio web.
    /// Este método se ejecuta por defecto al acceder a la ruta principal (por ejemplo, http://localhost:5236/).
    /// Obtiene la lista de proyectos a través del servicio de proyectos y la envía a la vista Index.cshtml
    /// para que se renderice en el navegador.
    /// </summary>
    /// <returns>
    /// Una vista (IActionResult) que contiene el listado de proyectos para mostrar en la página de inicio.
    /// </returns>
    public IActionResult Index()
    {
        List<Proyecto> proyectos = _proyectoService.ObtenerTodos();
        return View(proyectos);
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }

    public IActionResult Error404()
    {
        return View(); //TODO: Crear una vista personalizada para el error 404 (Not Found)
    }

    // Crear una accion que devuelva mi curriculum en PDF, para que el usuario pueda descargarlo desde la web.
    public IActionResult DescargarCurriculum()
    {
        string nombreArchivo = "Curriculum_SaraPrats.pdf"; //Solo lo quiero escribir una vez, gracias.
        string rutaArchivo = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "files", nombreArchivo);

        if (!System.IO.File.Exists(rutaArchivo))
        {
            return NotFound(); // Retornar un error 404 si el archivo no se encuentra
        }
        var bytes = System.IO.File.ReadAllBytes(rutaArchivo);

        return File(bytes, "application/pdf", nombreArchivo);
    }

}
