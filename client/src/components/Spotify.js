import axios from "axios";

// Map for localStorage keys

const LOCALSTORAGE_KEYS = {
  accessToken: "spotify_access_token",
  refreshToken: "spotify_refresh_token",
  expireTime: "spotify_token_expire_time",
  timestamp: "spotify_token_timestamp",
};

// map to retrieve localStorage value

const LOCALSTORAGE_VALUE = {
  accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
  refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
  expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
  timeStamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
};

export const logout = () => {
  for (const property in LOCALSTORAGE_KEYS) {
    window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
  }
  window.location = window.location.origin;
};

const hasTokenExpired = () => {
  const { accessToken, timeStamp, expireTime } = LOCALSTORAGE_VALUE;
  if (!accessToken || !timeStamp) {
    return false;
  }

  const millisecondsElapsed = Date.now() - Number(timeStamp);
  return millisecondsElapsed / 1000 > Number(expireTime);
};

const refreshToken = async () => {
  try {
    if (
      !LOCALSTORAGE_VALUE.refreshToken ||
      LOCALSTORAGE_VALUE.refreshToken === "undefined" ||
      Date.now() - Number(LOCALSTORAGE_VALUE.timeStamp) / 1000 < 1000
    ) {
      console.error("No refresh token available");
      logout();
    }

    const { data } = await axios.get(
      `/refresh_token/refresh_token=${LOCALSTORAGE_VALUE.refreshToken}`
    );

    window.localStorage.setItem(
      LOCALSTORAGE_KEYS.accessToken,
      data.access_token
    );
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());

    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

const getAccessToken = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const queryParams = {
    [LOCALSTORAGE_KEYS.accessToken]: urlParams.get("access_token"),
    [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get("refresh_token"),
    [LOCALSTORAGE_KEYS.expireTime]: urlParams.get("expires_in"),
  };

  const hasError = urlParams.get("error");

  if (
    hasError ||
    hasTokenExpired() ||
    LOCALSTORAGE_VALUE.accessToken === "undefined"
  ) {
    refreshToken();
  }

  if (
    LOCALSTORAGE_VALUE.accessToken &&
    LOCALSTORAGE_VALUE.accessToken !== "undefined"
  ) {
    return LOCALSTORAGE_VALUE.accessToken;
  }

  if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
    for (const property in queryParams) {
      window.localStorage.setItem(property, queryParams[property]);
    }
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());

    return queryParams[LOCALSTORAGE_KEYS.accessToken];
  }

  return false;
};

export const getToken = getAccessToken();

axios.defaults.baseURL = "https://api.spotify.com/v1";
axios.defaults.headers["Authorization"] = `Bearer ${getToken}`;
axios.defaults.headers["Content-Type"] = "application/json";

export const getCurrentUserProfile = () => axios.get("/me");
export const getCurrentUserPlaylist = (limit = 20) => {
  return axios.get(`./me/playlists?limit=${limit}`);
};
export const getTopArtist = (time_range = "long_term") => {
  return axios.get(`/me/top/artists?time_range=${time_range}`);
};
