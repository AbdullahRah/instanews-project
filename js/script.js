$(function() {
  $(".sections").on("change", function() {
    let tmp, tmpKey, tmpSubj;
    tmpSubj = $(this).val();
    $.ajax({
      method: "GET",
      url: `https://api.nytimes.com/svc/topstories/v2/${tmpSubj}.json?api-key=6jGQCBe60VZSVYGc6e77GpSrKDxJFZ54`,
      dataType: "json"
    })
      .done(function(data) {
        let imgFilter = data.results.filter(function(filtered) {
          if (filtered.multimedia[4] !== undefined) {
            return true;
          } else {
            return false;
          }
        });

        imgFilter = imgFilter.slice(0, 12);
        console.log(imgFilter);
        $(".stories").empty();
        $.each(imgFilter, function(index, value) {
          // console.log(value.title);
          $(".stories").append(
            `<a href="${value.short_url}" target="_blank"><article class="nyt-article" style="background-image:url('${value.multimedia[4].url}')">
              <p>${value.abstract}</p>
            </article>
            </a>`
          );
        });
        //********CHANGE header into smaller size****** */
        $(".site-header").css({
          "justify-content": "left",
          transition: "0.5s ease"
        });
        $(".logo img").css({
          height: "20vh",
          transition: "0.5s ease"
        });
      })
      .fail(function(e) {
        console.log(e + " error here");
      });
  });
});
