$(function() {
  generateYears($("#sel-birth"));
  let birthSelect = $("#sel-birth").selectmenu();
  birthSelect.selectmenu("menuWidget").addClass("overflow");

  $("#form-register").submit(function(e) {
    e.preventDefault();

    $(this)
      .find(".txt-warning")
      .empty()
      .hide();

    let email = $("#inp-email").val();

    if (!validateEmail(email)) {
      $("#inp-email")
        .next()
        .html("잘못된 형식입니다.")
        .show();
      return;
    }

    let password = $("#inp-password").val();

    if (!validatePassword(password)) {
      $("#inp-password")
        .next()
        .html("대문자와 숫자가 포함된 최소 8자 이상의 문자열이어야 합니다.")
        .show();
      return;
    }

    let confirm = $("#inp-confirm").val();

    if (password !== confirm) {
      $("#inp-password")
        .next()
        .html("비밀번호와 일치하지 않습니다.")
        .show();
      return;
    }

    let gender = $('input[name="gender"]:checked').val();

    if (!gender) {
      $("#inp-femail")
        .siblings(".txt-warning")
        .html("필수항목입니다.")
        .show();
      return;
    }

    let birth = $("#sel-birth").val();

    if (!birth) {
      $("#sel-birth")
        .siblings(".txt-warning")
        .html("필수항목입니다.")
        .show();
      return;
    }

    let accept = $("#inp-accept:checked").val();

    if (!accept) {
      $("#inp-accept")
        .next()
        .next()
        .html("필수항목입니다.")
        .show();
      return;
    }

    submit(email, password, gender, birth);
  });
});
// 출생년도 옵션설정
function generateYears($select) {
  for (let i = 1950; i <= 2010; i++) {
    $select.append('<option value="' + i + '">' + i + "</option>");
  }
}
// 이메일 유효검사
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
// 패스워드 유효검사
function validatePassword(password) {
  var re = /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
  return re.test(password);
}
// 회원정보 api 전달
function submit(email, password, gender, birth) {
  let params = {
    email: email,
    password: password,
    gender: gender,
    birth: birth
  };

  $.post("api-address", params, function(r) {
    //  api 연결 및 콜백시 작업영역
    console.log(r);
  });
}
