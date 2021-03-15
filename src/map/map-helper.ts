const kakaoMapRoot: string = `https://map.kakao.com/link/`;

export const getMapLocation = (name = "no-name", lat: string, lng: string) =>
  kakaoMapRoot + `map/${name},${lat},${lng}`;

export const getMapByID = (id: string) => kakaoMapRoot + `map/${id}`;

export const getRoute = (name = "no-name", lat: string, lng: string) =>
  kakaoMapRoot + `to/${name},${lat},${lng}`;

export const getRouteByID = (id: string) => kakaoMapRoot + `to/${id}`;

export const roadView = (lat: string, lng: string) =>
  kakaoMapRoot + `roadview/${lat},${lng}`;

export const roadViewByID = (id: string) => kakaoMapRoot + `roadview/${id}`;

export const searchResult = (keyword: string) =>
  kakaoMapRoot + `search/${keyword}`;
