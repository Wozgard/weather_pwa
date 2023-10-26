import env from "react-dotenv";
import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: env.UNSPLASH_ACCESS_KEY,
  secret: env.UNSPLASH_SICKRET_KEY,
});

export const fetchPhotos = async (query) => {
  const photo = await unsplash.search.getPhotos({
    query: query,
    page: 1,
    perPage: 1,
    orientation: "landscape",
  });

  console.log(photo);
  /* return photo.response.results[0].links.self; */
  return photo.response.results[0].urls.full;
};
