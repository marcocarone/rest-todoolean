$(document).ready(function() {

  var LinkApi = "http://157.230.17.132:3006/todos/";

  stampaTutti(LinkApi);


  $(document).on("click", ".container__invio button", function() {
    var datoInput = $(".container__invio input").val();
    if (datoInput.length == 0) {
      Toastify({
        text: "Il campo non può essere vuoto",
        duration: 2000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        gravity: "bottom",
        position: 'right',
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
      }).showToast();
    } else {
      aggiungiAttivita(LinkApi, datoInput)
    }


  })

  $(document).on("keydown", ".container__invio input", function() {
    if (event.which == 13 || event.keyCode == 13) {
      var datoInput = $(".container__invio input").val();
      if (datoInput.length == 0) {
        Toastify({
          text: "Il campo non può essere vuoto",
          duration: 2000,
          destination: "https://github.com/apvarun/toastify-js",
          newWindow: true,
          gravity: "bottom",
          position: 'right',
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        }).showToast();
      } else {
        aggiungiAttivita(LinkApi, datoInput)
      }
    }
  })


  $(document).on("click", ".delete", function() {
    var questoElimina = $(this);
    var idAttivita = questoElimina.parent().parent().attr("data-id");
    console.log(" id att: " + idAttivita)
    eliminaAttivita(LinkApi, idAttivita)

  })

  $(document).on("click", ".edit", function() {
    var questoEdit = $(this);
    var attivitaModifica = questoEdit.parent().parent().find("input").prop('disabled', false);
    questoEdit.parent().parent().find(".fa-pen-square").removeClass("display_none");
    $(".fa-pen-square").click(function() {
      $(this).parent().parent().find("input").prop('disabled', true);
      $(this).parent().parent().removeClass("active");
      var datoNuovoInput = $(this).parent().find("input").val();
      var idAttivita = $(this).parent().parent().attr("data-id");
      $(".container__attivita").html("");
      modifica(LinkApi, idAttivita, datoNuovoInput)
    })
  })
});

///////////// FUNZIONI DELLO SCRIPT //////////////////////////
function stampaTutti(link) {
  $.ajax({
    url: link,
    method: "GET",
    success: function(data) {
      var source = $("#attivita").html();
      var template = Handlebars.compile(source);
      for (var i = 0; i < data.length; i++) {
        var context = {
          testo: data[i].text,
          id: data[i].id,
        };
        var html = template(context);
        $(".container__attivita").append(html)
      }
    },
    error: function(errore) {
      alerr("errore" + errore)
    }
  })
}


function aggiungiAttivita(link, datoInput) {
  $.ajax({
    url: link,
    method: "POST",
    data: {
      text: datoInput
    },
    success: function(data) {
      $(".container__attivita").empty();
      stampaTutti(link)
      $(".container__invio input").val("");

    },
    error: function(errore) {
      alerr("errore" + errore)
    }
  })
}


function eliminaAttivita(link, id) {
  $.ajax({
    url: link + id,
    method: "DELETE",

    success: function(data) {
      $(".container__attivita").empty();
      stampaTutti(link)
    },
    error: function(errore) {
      alerr("errore" + errore)
    }
  })
}


function modifica(link, id, nuovoTesto) {
  $.ajax({
    url: link + id,
    method: "PATCH",
    data: {
      text: nuovoTesto,
    },
    success: function(data) {
      $(".container__attivita").empty();
      stampaTutti(link)
    },
    error: function(errore) {
      alert("errore" + errore)
    }
  })
}
