# HTML

    1. index.html
        메인 페이지

    2. detail.html
        API로 전달받은 여행지 데이터를 출력하는 페이지.

    3. mytrip.html
        detail.html에서 저장한 여행지 목록을 출력하는 페이지.

    4. register.html
        회원가입 페이지.
        회원정보를 전달할 API 주소 없음

# styles

    1. style.css
        HTML 문서의 모든 스타일 설정.
        반응형 미구현

# scripts

    1. scripts.js
        header 영역 스크롤 이벤트 구현.
        달력 영역 : jQuery datepicker 라이브러리 연결.
        검색 버튼 이벤트 : API 데이터 전송 요청 및 출력
        리스트 템플릿 복제 및 데이터 입력 기능 구현.

    2. detail.js
        여행지별 세부정보 출력.
        사진 출력 영역 : jQuery Falleria 라이브러리 연결.
        지도 출력 영역 : 구글지도 API 연결.
        지도 마커 삽입 기능 구현.

    3. mytrip.js
        쿠키 데이터를 활용해 등록한 여행지를 출력
            - jQuery Cookies 라이브러리 연결.
        지도 & 마커 등록, 순서 A-Z 출력. 삭제 기능 구현.

    4. register.js
        회원정보 수집 및 api 서버 전송 구현.(api 주소 미지정)
        이메일, 패스워드, 출생년도, 성별, 약관동의 정보 수집 및 기능구현.

# API

    1. https://javascript-basic.appspot.com/searchLocation
        - JSON 데이터 리턴.
        - 해당 검색 날짜에 대한 모든 데이터를 포함함.(ex> 현재 21개의 여행지 정보를 리턴)
        {
            "id": 0 ~
            "cityName": 도시 이름
            "name": 장소 이름
            "titleImageUrl": wikimeda 이미지 경로
            "subImageList": [
                wikimedia 이미지 경로
            ]
            "position": {
                "x": 위도값
                "y": 경도값
            }
            "desc": 상세설명
        }

    2. https://javascript-basic.appspot.com/locationDetail
        - JSON 데이터 리턴.
        - 선택한 여행지의 객체 정보만 리턴함.
        - 리턴하는 데이터값은 1의 정보와 같음.

# fonts : 폰트 폴더

# images : 이미지 폴더

# libs : 라이브러리 폴더
