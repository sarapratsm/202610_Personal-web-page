using Xunit;
using MiWebPersonal.Core.Models;

namespace MiWebPersonal.Tests;

public class CompilacionYModeloTests
{
    [Fact]
    public void La_solucion_compila_correctamente()
    {
        // Este test simplemente verifica que el proyecto de pruebas
        // compila y se ejecuta correctamente.
        Assert.True(true);
    }

    [Fact]
    public void Proyecto_se_puede_instanciar_con_valores_por_defecto()
    {
        // Arrange & Act
        var proyecto = new Proyecto();

        // Assert
        Assert.NotNull(proyecto);
    }

    [Fact]
    public void Proyecto_tiene_propiedades_esperadas()
    {
        // Arrange
        var proyecto = new Proyecto
        {
            Id = 1,
            Titulo = "Mi proyecto de prueba",
            Descripcion = "Una descripcion de prueba",
            UrlGitHub = "https://github.com/usuario/proyecto",
            UrlDemo = "https://mi-demo.com"
        };

        // Assert
        Assert.Equal(1, proyecto.Id);
        Assert.Equal("Mi proyecto de prueba", proyecto.Titulo);
        Assert.Equal("Una descripcion de prueba", proyecto.Descripcion);
        Assert.Equal("https://github.com/usuario/proyecto", proyecto.UrlGitHub);
        Assert.Equal("https://mi-demo.com", proyecto.UrlDemo);
    }
}