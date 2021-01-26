const kakaoMapRoot = `https://map.kakao.com/link/`;

export function getMapLocation(name = "no-name", lat, lng) {
  return kakaoMapRoot + `map/${name},${lat},${lng}`;
}

export function getMapByID(id) {
  return kakaoMapRoot + `map/${id}`;
}

export function getRoute(name = "no-name", lat, lng) {
  return kakaoMapRoot + `to/${name},${lat},${lng}`;
}

export function getRouteByID(id) {
  return kakaoMapRoot + `to/${id}`;
}

export function roadView(name = "no-name", lat, lng) {
  return kakaoMapRoot + `roadview/${lat},${lng}`;
}

export function roadViewByID(id) {
  return kakaoMapRoot + `roadview/${id}`;
}

export function searchResult(keyword) {
  return kakaoMapRoot + `search/${keyword}`;
}