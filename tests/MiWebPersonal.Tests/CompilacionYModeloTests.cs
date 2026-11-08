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
}