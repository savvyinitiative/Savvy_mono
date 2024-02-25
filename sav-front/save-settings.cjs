const fs = require("fs");

const dotenv = require("dotenv");
const axios = require("axios");
// const jwt = require("jsonwebtoken");

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const NEXT_PUBLIC_CTF_DELIVERY_TOKEN =
  process.env.NEXT_PUBLIC_CTF_DELIVERY_TOKEN;
const NEXT_PUBLIC_CTF_SPACE_ID = process.env.NEXT_PUBLIC_CTF_SPACE_ID;
// Contentful GraphQL endpoint
const apiUrl = `https://graphql.contentful.com/content/v1/spaces/${NEXT_PUBLIC_CTF_SPACE_ID}`;

// Define your GraphQL query
const query = `
  query {
    keyValuePairCollection(limit: 50) {
        items {
          sys {
            id
          }
          key
          textValue {
            json
          }
          navigationGroup {
            __typename
            ... on NavigationGroup {
              label
              navigationElementsCollection(limit: 10) {
                items {
                  label
                  subNavigationElementsCollection(limit: 5) {
                    items {
                      __typename
                      ... on Page {
                        title
                        slug
                      }
                      ... on ExternalLink {
                        title
                        link
                        linkIcon {
                          url
                        }
                      }
                    }
                  }
                  target {
                    __typename
                    ... on Page {
                      title
                      slug
                    }
                    ... on ExternalLink {
                      title
                      link
                      linkIcon {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
          image {
            title
            url
          }
        }
      }
  }
`;

const getDataFromCtf = async () => {
  try {
    const config = {
      method: "post",
      url: `${apiUrl}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${NEXT_PUBLIC_CTF_DELIVERY_TOKEN}`,
      },
      data: JSON.stringify({ query }),
    };

    let response = await axios(config);
    if (response.status !== 200) {
      throw new Error(`Request failed with status code ${response.status}`);
    }
    const data = response?.data;

    // if (!user) throw Error("User not found");

    return data;
  } catch (error) {
    console.error("Error:", error);
    // return { error: error?.message };
    throw error; // Re-throw the error for better error handling
  }

  return [];
};

const saveMicrocopyToFile = async () => {
  //  fetch data from CTF
  const data = await getDataFromCtf();
  const documents = [];
  console.log("Fetched data from CMS");

  const items = data?.data?.keyValuePairCollection?.items;

  if (!items) throw Error("No data found");

  console.log("Saving Config from CMS to file");
  //  parse the data
  items?.forEach((item) => {
    documents.push({
      textValue: item?.textValue,
      key: item?.key,
      navigationGroup: item?.navigationGroup,
      image: item?.image,
    });
  });
  //  save to file
  fs.writeFileSync("json/cmsConfig.json", JSON.stringify(documents), "utf8");
};

saveMicrocopyToFile();