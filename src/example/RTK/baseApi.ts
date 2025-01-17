import { getBaseUrl } from "./api";
import { axiosBaseQuery } from "./baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

// порт 8180
export const baseApi = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: getBaseUrl("8180"),
  }),
  reducerPath: "baseApi",
  tagTypes: [
    "region",
    "code",
    "countries",
    "languages",
    "userProfile",
    "userProfileCountry",
    "genders",
    "checkUniquenessNickname",
    "users",
    "users_by_id",
    "sendMediaMessage",
    "interests",
    "mapRegionData",
    "usersCountListByCountry",
    "user_search",
    "helps",
    "helps-select",
    "users-find-by-mission",
  ],
  endpoints: (builder) => ({}),
});
