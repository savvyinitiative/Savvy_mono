// import { ILessonEntry } from "./../api/intellum/lessons";
import type { ImageLoader } from "next/image";
import {
  ICardGroup,
  ICard,
  IContentfulAsset,
  IExternalLink,
} from "@/interfaces/contentful/general";
// import microcopy from "@/json/microcopy.json";

export function normalizeContentfulUrl(src: string) {
  const urlProtocol = "https:";

  if (src) {
    return new URL(`https:${src}`);
  }
  return "";
}
export const contentfulImageLoader: ImageLoader = ({ src, width, quality }) => {
  const url: any = normalizeContentfulUrl(src);
  // const searchParams = new URLSearchParams(url.search);
  // const params = url?.searchParams
  const params = new URLSearchParams(url.search);
  // params.set('auto', params.getAll('auto').join(',') || 'format')
  // params.set('fit', params.getAll('fit').join(',') || 'max')
  params.set("w", params.get("w") || width.toString());

  if (quality) {
    params.set("q", quality.toString());
  }

  return url.href;
};

export const extractLinkFromTarget = (target: IExternalLink | any) => {
  const contentType = target?.sys?.contentType?.sys?.id;

 

  if (!contentType) return "/";

  switch (contentType) {
    case "externalLink":
      return target?.fields?.link || "/";

      break;
 

    case "page":

      const page = target;
      return `/${page?.fields?.slug}` || "/";

      break;

    default:
      return "/";
      break;
  }

  return "/";
};

export const extractCtfImageUrl = (image: IContentfulAsset | null) => {
  const url = image?.fields?.file?.url;
  if (url) return url;
  return "";
};

export const getMicrocopyContentByKey = (val: string) => {
  try {
    // const content = microcopy?.find((r) => r?.key === val);
    // if (!content) return "";

    // return content?.content;
  } catch (error) {
    return "";
  }
};

export const extractYoutubeVideoId = (videoLink: string) => {
  const pattern = /v=([A-Za-z0-9_-]+)/;

  try {
    const match = videoLink.match(pattern);
    if (match) {
      const videoId = match[1];
      return videoId
  } 
    return videoLink

  } catch (error) {
    return videoLink
  }
};

