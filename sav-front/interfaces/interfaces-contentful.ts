
import * as contentful from "contentful";
import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
  EntitySys,
} from "contentful";

export interface IMediaWrapper extends EntrySkeletonType {
  sys: EntitySys;
  fields: {
    id: EntryFieldTypes.Symbol;
    title?: EntryFieldTypes.Symbol;
    altText: EntryFieldTypes.Symbol;
    image: IContentfulAsset;
    caption? :string;
  };
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
