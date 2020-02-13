$(document).ready(function() {

var LinkApi = "http://157.230.17.132:3006/todos/";

stampaTutti(LinkApi);


$(document).on("click", ".container__invio button", function(){
  var datoInput = $(".container__invio input").val();
  console.log(datoInput);
  aggiungiAttivita(LinkApi, datoInput)
})

$(document).on("click", ".delete", function(){
  var questoElimina = $(this);
  var idAttivita = questoElimina.parent().parent().attr("data-id");
  console.log(" id att: " + idAttivita)
  eliminaAttivita(LinkApi, idAttivita)

})

});

///////////// FUNZIONI DELLO SCRIPT //////////////////////////
function stampaTutti(link) {
  $.ajax({
    url : link,
    method : "GET",
    success :function (data) {
      var source = $("#attivita").html();
      var template = Handlebars.compile(source);
      for (var i = 0; i < data.length; i++) {
        var context = {
          testo: data[i].text,
          id : data[i].id,
           };
        var html = template(context);
        $(".container__attivita").append(html)
      }
    },
    error : function (errore) {
      alerr("errore" + errore)
    }
  })
}


function aggiungiAttivita(link, datoInput) {
  $.ajax({
    url : link,
    method : "POST",
    data : {
      text : datoInput
    },
    success :function (data) {
      $(".container__attivita").empty();
      stampaTutti(link)
    },
    error : function (errore) {
      alerr("errore" + errore)
    }
  })
}


function eliminaAttivita(link, id) {
  $.ajax({
    url : link + id,
    method : "DELETE",

    success :function (data) {
      $(".container__attivita").empty();
      stampaTutti(link)
    },
    error : function (errore) {
      alerr("errore" + errore)
    }
  })
}
