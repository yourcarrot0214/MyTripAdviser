let map;

$(function() {
  let id = parseId(window.location.search);

  getDetailInfo(id);
  showMap();
});

function getDetailInfo(id) {
  let API_URL = "https://javascript-basic.appspot.com/locationDetail";

  $.getJSON(
    API_URL,
    {
      id: id
    },
    function(r) {
      // API Data Check
      console.log(r);

      $(".detail-header-name").html(r.name);
      $(".detail-header-city-name").html(r.cityName);
      $(".detail-desc-text").html(r.desc);

      let $gallery = $("#detail-images");
      let images = r.subImageList;

      for (let i = 0; i < images.length; i++) {
        let $image = $(`<img src="${images[i]}"/>`);
        $gallery.append($image);
      }

      Galleria.loadTheme(
        "libs/galleria/themes/classic/galleria.classic.min.js"
      );
      Galleria.run("#detail-images");

      showMarkerOnMap(r.position.x, r.position.y);

      $(".btn-register").click(function() {
        let myTrips = Cookies.getJSON("MYTRIPS");

        if (!myTrips) myTrips = [];

        myTrips.push({
          id: id,
          name: r.name,
          cityName: r.cityName,
          x: r.position.x,
          y: r.position.y
        });

        Cookies.set("MYTRIPS", myTrips);
        alert("여행지가 등록되었습니다!");

        // Data Check
        console.log(myTrips);
      });
    }
  );
}

function parseId(str) {
  let s = str.substring(1);
  let args = s.split("&");

  for (let i = 0; i < args.length; i++) {
    let arg = args[i];
    let tokens = arg.split("=");

    if (tokens[0] === "id") {
      return tokens[1];
    }
  }

  return null;
}

function showMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: {
      lat: 33.3617,
      lng: 126.5292
    }
  });
}

function showMarkerOnMap(lat, lng) {
  let pos = {
    lat: lat,
    lng: lng
  };

  new google.maps.Marker({
    position: pos,
    map: map
  });

  map.panTo(pos);
}
