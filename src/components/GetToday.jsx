function getToday() {
  let date = new Date();

  // 년월일을 따로 사용할 수 있도록 JSON 형식으로 담기
  return {
    year: date.getFullYear(),
    month: ("0" + (1 + date.getMonth())).slice(-2),
    day: ("0" + date.getDate()).slice(-2),
    hours: ("0" + date.getHours()).slice(-2),
    minutes: ("0" + date.getMinutes()).slice(-2),
    seconds: ("0" + date.getSeconds()).slice(-2),
  };
}

export default getToday();
