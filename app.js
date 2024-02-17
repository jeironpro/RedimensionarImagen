document.getElementById('input').addEventListener('click', function() {
    var inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.style.display = 'none';

    document.body.appendChild(inputFile);
    inputFile.click();
    inputFile.addEventListener('change', function() {
        var archivo = inputFile.files[0];
        var reader = new FileReader();

        reader.onload = function(e) {
            var previsualizacion = document.getElementById('previsualizacion');
            previsualizacion.src = e.target.result;
            previsualizacion.style.display = 'flex';
        }
        reader.readAsDataURL(archivo);
        document.body.removeChild(inputFile);
    });
});

document.querySelector('button').addEventListener('click', function() {
    var imagen = document.getElementById('previsualizacion');
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var anchoMaximo = parseInt(document.getElementById('ancho').value);
    var largoMaximo = parseInt(document.getElementById('largo').value);
    var ancho = imagen.width;
    var largo = imagen.height;

    if (ancho > largo) {
        if (ancho > anchoMaximo) {
            largo *= anchoMaximo / ancho;
            ancho = anchoMaximo;
        }
    } else {
        if (largo > largoMaximo) {
            ancho *= largoMaximo / largo;
            largo = largoMaximo;
        }
    }
    canvas.width = ancho;
    canvas.height = largo;

    ctx.drawImage(imagen, 0, 0, ancho, largo);

    var enlace = document.createElement('a');
    enlace.download = 'imagen_redimensionada.png';
    enlace.href = canvas.toDataURL('image/png');
    enlace.click();
});