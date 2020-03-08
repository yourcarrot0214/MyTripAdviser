let MARKER_LABELS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let map;
let markers = {};

$(function() {
  let myTrips = Cookies.getJSON("MYTRIPS");

  if (!myTrips) myTrips = [];

  showMap();
  generateMyTripList(myTrips);
});

function generateMyTripList(list) {
  let bounds = new google.maps.LatLngBounds();
  let $list = $("#mytrip-list");
  console.log(list);

  for (let i = 0; i < list.length; i++) {
    let myTrip = list[i];

    let pos = {
      lat: myTrip.x,
      lng: myTrip.y
    };

    let markerLabel = MARKER_LABELS[i];

    let $item = $("#mytrip-item-template")
      .clone()
      .removeAttr("id");

    $item.data("id", myTrip.id);
    $item.find(".item-name").html(markerLabel + ". " + myTrip.name);
    $item.find(".item-city-name").html(myTrip.cityName);

    $item.find(".item-remove").click(function() {
      let $elem = $(this).closest(".mytrip-item");
      let id = $elem.data("id");

      $elem.remove();

      markers[id].setMap(null);
      markers[id] = null;

      let newList = removeFromList(list, id);

      Cookies.set("MYTRIPS", newList);
    });

    $list.append($item);

    let marker = new google.maps.Marker({
      position: pos,
      label: markerLabel,
      map: map
    });

    markers[myTrip.id] = marker;

    bounds.extend(pos);
  }

  map.fitBounds(bounds);
}
// 마이트립 리스트 삭제
function removeFromList(list, id) {
  let index = -1;

  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      index = i;
      break;
    }
  }

  if (index !== -1) {
    list.splice(index, 1);
  }

  return list;
}
// 구글지도 생성
function showMap() {
  map = new google.maps.Map(document.getElementById("map"));
}
