import {  Document } from '@contentful/rich-text-types';
// import { SysType } from './general';
import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
  EntitySys,
  EntrySys
  
} from "contentful";

export interface SysType {
  contentType: SysContentType;
  space: object;
  createdAt: string;
  updatedAt: string;
  locale: string;
  type: string;
  revision: number;
  id: string;
}

interface SysContentType {
  sys: {
    linkType: string;
    id: string;
    type: string;
  };
}

export interface EntryType {
  sys: SysType;
  fields: any;
}

export interface IContentfulAsset {
  metadata: {
    tags: string[];
  };
  sys: {
    space: {
      sys: {
        type: "Link";
        linkType: "Space";
        id: string;
      };
    };
    type: "Asset";
    id: string;
    revision: number;
    createdAt: string;
    updatedAt: string;
    environment: {
      sys: {
        id: string;
        type: "Link";
        linkType: "Environment";
      };
    };
    locale: string;
  };
  fields: {
    title: string;
    file: {
      url: string;
      details: {
        size: number;
        image: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
}

export interface IMediaWrapperFields {
  altText: string;
  publishedDate?: string;
  image?: IContentfulAsset;
}

export interface IMediaWrapper extends EntrySkeletonType {
  sys: EntrySys;
  fields: IMediaWrapperFields;
}







export interface IPexelsImageWrapper extends EntrySkeletonType {
  sys: EntrySys;
  fields: {
    internalTitle: string;
    pexelsImage: {
      photographer: string;
      photographer_url: string;
      image: string;
      src: {
        original: string;
        large2x?: string;
        large: string;
        medium: string;
        small: string;
        portrait: string;
        landscape: string;
        tiny: string;
      };
      alt: string;
      avg_color: string;
      url: string;
      attribution: string;
      photographer_attribution: string;
      width: number;
      height?: number;
    };
  };
}



export interface IHeroBanner extends EntrySkeletonType {
  sys: EntrySys;
  fields: {
    headline: string;
    subline: string;
    size: string;
    style: string;
    image: IMediaWrapper;
  };
}

export interface IExternalLink extends EntrySkeletonType {
  sys: EntrySys;
  fields: {
    title: string;
    url: string;
  };
}

export interface ICard extends EntrySkeletonType {
  sys: EntrySys;
  fields: {
    title: string;
    topLine?: string;
    style: "standard";
    bottomLine?: string;
    target?: IExternalLink | any;
    image?: IContentfulAsset
  };
}

export interface ICardGroup extends EntrySkeletonType {
  sys: EntrySys;
  fields: {
    title: string;
    items?: ICard[];
  };
}



