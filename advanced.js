function converter() {
    var unidadeOrigem = document.getElementById("unidade_origem").value;
    var unidadeDestino = document.getElementById("unidade_destino").value;
    var valor = parseFloat(document.getElementById("valor").value);
    
    var resultado;
    var resultadoTexto;
    
    if (unidadeOrigem === unidadeDestino) {
        resultado = valor;
        resultadoTexto = "As unidades de origem e destino são iguais. O valor não foi convertido.";
    } else if (unidadeOrigem === "metro") {
        if (unidadeDestino === "pe") {
            resultado = valor * 3.281;
        } else if (unidadeDestino === "quilometro") {
            resultado = valor / 1000;
        } else if (unidadeDestino === "milha") {
            resultado = valor / 1609;
        }
    } else if (unidadeOrigem === "pe") {
        if (unidadeDestino === "metro") {
            resultado = valor / 3.281;
        } else if (unidadeDestino === "quilometro") {
            resultado = valor / 3281;
        } else if (unidadeDestino === "milha") {
            resultado = valor / 5280;
        }
    } else if (unidadeOrigem === "quilograma") {
        if (unidadeDestino === "grama") {
            resultado = valor * 1000;
        } else if (unidadeDestino === "libra") {
            resultado = valor * 2.205;
        } else if (unidadeDestino === "onca") {
            resultado = valor * 35.274;
        }
    } else if (unidadeOrigem === "grama") {
        if (unidadeDestino === "quilograma") {
            resultado = valor / 1000;
        } else if (unidadeDestino === "libra") {
            resultado = valor / 454;
        } else if (unidadeDestino === "onca") {
            resultado = valor / 28.35;
        }
    } else if (unidadeOrigem === "libra") {
        if (unidadeDestino === "quilograma") {
            resultado = valor / 2.205;
        } else if (unidadeDestino === "grama") {
            resultado = valor * 454;
        } else if (unidadeDestino === "onca") {
            resultado = valor * 16;
        }
    } else if (unidadeOrigem === "onca") {
        if (unidadeDestino === "quilograma") {
            resultado = valor / 35.274;
        } else if (unidadeDestino === "grama") {
            resultado = valor * 28.35;
        } else if (unidadeDestino === "libra") {
            resultado = valor / 16;
        }
    } else if (unidadeOrigem === "celsius") {
        if (unidadeDestino === "fahrenheit") {
            resultado = (valor * 9/5) + 32;
        } else if (unidadeDestino === "kelvin") {
            resultado = valor + 273.15;
        }
    } else if (unidadeOrigem === "fahrenheit") {
        if (unidadeDestino === "celsius") {
            resultado = (valor - 32) * 5/9;
        } else if (unidadeDestino === "kelvin") {
            resultado = (valor + 459.67) * 5/9;
        }
    } else if (unidadeOrigem === "kelvin") {
        if (unidadeDestino === "celsius") {
            resultado = valor - 273.15;
        } else if (unidadeDestino === "fahrenheit") {
            resultado = (valor * 9/5) - 459.67;
        }
    }
    
    if (isNaN(resultado)) {
        resultadoTexto = "Selecione unidades válidas e insira um valor numérico.";
    } else {
        resultadoTexto = valor + " " + unidadeOrigem + " equivale a " + resultado.toFixed(2) + " " + unidadeDestino;
    }
    
    document.getElementById("resultado").innerHTML = resultadoTexto;
}
