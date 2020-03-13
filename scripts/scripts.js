$(function() {
  $(window).scroll(function() {
    let top = $(window).scrollTop();

    if (top > 0) {
      $("#header").addClass("inverted");
    } else {
      $("#header").removeClass("inverted");
    }
  });
  // scroll event handler
  $(window).trigger("scroll");

  // calendar setting > jQuery libs datepicker
  let setFromDate = $("#from").datepicker({
    dateFormat: "yy-mm-dd",
    minDate: 0,
    onSelect: function() {
      setToDate.datepicker(
        "option",
        "minDate",
        setFromDate.datepicker("getDate")
      );
    }
  });
  setFromDate.datepicker("setDate", new Date());

  let setToDate = $("#to").datepicker({
    dateFormat: "yy-mm-dd",
    minDate: 0
  });
  setToDate.datepicker("setDate", 4);

  $("#form-search").submit(function(e) {
    e.preventDefault();

    let from = $("#from").val();
    let to = $("#to").val();

    search(from, to);
  });
});
// API 요청
function search(from, to) {
  const url = "https://javascript-basic.appspot.com/searchLocation";

  $.getJSON(
    url,
    {
      from: from,
      to: to
    },
    function(r) {
      // API Data Check
      console.log(r);

      let $list = $("#list-panel");

      for (let i = 0; i < r.length; i++) {
        let data = r[i];
        let $item = createListItem(data);

        $list.append($item);
      }

      $("#list-bg").show();
    }
  );
}
// LIST 생성
function createListItem(data) {
  let $template = $("#list-item-template")
    .clone()
    .removeAttr("id");

  $template.find(".list-item-image").attr("src", data.titleImageUrl);
  $template.find(".list-item-name").html(data.name);
  $template.find(".list-item-city-name").html(data.cityName);

  $template.click(function(e) {
    let url = `detail.html?id=${data.id}`;
    window.location = url;
  });

  return $template;
}
