using System.Collections;

namespace MiWebPersonal.Core.Models;

public class Proyecto
{
    public int Id { get; set; }
    public string Titulo { get; set; }
    public string Descripcion { get; set; }
    public ArrayList Tecnologias { get; set; } = new ArrayList();




}
