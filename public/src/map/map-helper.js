const kakaoMapRoot = `https://map.kakao.com/link/`;

export const getMapLocation = (name = "no-name", lat, lng) =>
  kakaoMapRoot + `map/${name},${lat},${lng}`;

export const getMapByID = id => kakaoMapRoot + `map/${id}`;

export const getRoute = (name = "no-name", lat, lng) =>
  kakaoMapRoot + `to/${name},${lat},${lng}`;

export const getRouteByID = id => kakaoMapRoot + `to/${id}`;

export const roadView = (name = "no-name", lat, lng) =>
  kakaoMapRoot + `roadview/${lat},${lng}`;

export const roadViewByID = id => kakaoMapRoot + `roadview/${id}`;

export const searchResult = keyword => kakaoMapRoot + `search/${keyword}`;
