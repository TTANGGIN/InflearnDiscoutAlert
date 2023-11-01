# 인프런 강의 할인 알림 크롬 확장 프로그램

- [x] “https://www.inflearn.com/course/”로 시작하는 도메인을 가진 웹 사이트를 사용자에게 입력을 받는다. 예를들면 “https://www.inflearn.com/course/강력-css-코드캠프”와 같은 형식이다. 해당 주소는 인프런 사이트의 강의 정보 사이트이다.
- [x] 사용자는 여러 주소(강의)를 등록할 수 있다.
- [x] 추가된 사이트들을 리스트로 만들어 관리한다.
- [x] 추가된 사이트 중에서 class="cd-price\_\_discount-rate"요소가 존재하는지 확인한다.
  - [x] 존재한다면 사용자에게 해당 class="cd-header**title”이 class="cd-price**discount-rate" 만큼 할인한다고 알린다. 또한 ~~class="cd-price\_\_reg-price"~~ → class="cd-price\_\_pay-price" 의 형식으로 가격을 표시한다.
  - [x] 존재하지 않는다면 무시한다.
- [x] 매일 0시 30분에 리스트에 존재하는 사이트들은 일괄적으로 갱신된다.
  - [x] 만약 사용자가 새로 추가한 사이트의 경우 추가 즉시 해당 사이트만 1회 갱신한다.
- [x] 만약 사용자가 등록한 사이트 중 할인하는 사이트가 존재한다면 알림을 발송한다.
  - [x] 크롬 브라우저 알림으로 알림을 전송한다.
  - [x] 알림은 백그라운드환경에서도 알람 전송이 가능하다.
  - [x] 알림은 하루에 한 번만 전송한다.

## 추가 예정

- [ ] 강의 사이트 삭제
- [ ] 강의명(별명) 입력
- [ ] 유효한 사이트 접속 시 사이트 등록 추천