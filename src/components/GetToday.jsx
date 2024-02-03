function getToday() {
  let date = new Date();

  // 년월일을 따로 사용할 수 있도록 JSON 형식으로 담기
  return {
    year: date.getFullYear(),
    month: ("0" + (1 + date.getMonth())).slice(-2),
    day: ("0" + date.getDate()).slice(-2),
  };
}

export default getToday();
