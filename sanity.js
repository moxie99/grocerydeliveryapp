import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import {
  REACT_APP_SANITY_PROJECT_ID,
  REACT_APP_SANITY_PROJECT_TOKEN,
} from "@env";
const client = sanityClient({
  projectId: REACT_APP_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "v2021-10-21",
  useCdn: true,
  //   token: process.env.REACT_APP_SANITY_PROJECT_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export default client;
