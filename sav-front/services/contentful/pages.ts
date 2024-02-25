import { client } from "./client";
import * as contentful from "contentful";
import type {
  EntrySkeletonType
} from "contentful";
import {parse, stringify, toJSON, fromJSON} from 'flatted';
import { getCircularReplacer, serializeData } from "@/utils/general";

const CONTENT_TYPE_NAME = "page"

export type ModuleEntrySkeleton = {
  contentTypeId: "module";
  fields: {
    id: contentful.EntryFieldTypes.Text;
  };
};

export type LessonEntrySkeleton = {
  contentTypeId: "page";
  fields: {
    id: contentful.EntryFieldTypes.Text;
    title: contentful.EntryFieldTypes.Text;
    slug: contentful.EntryFieldTypes.Text;
    heroBanner: contentful.EntryFieldTypes.Object<
      contentful.EntryFieldTypes.EntryLink<ModuleEntrySkeleton>
    >;
    topSection: contentful.EntryFieldTypes.Array<
      contentful.EntryFieldTypes.EntryLink<ModuleEntrySkeleton>
    >;
  };
};

export interface IPageFields {
  title: string;
  slug: string;
  // pageType: string;
  seo?: any;
  sections: any;
  hero?: any;
}

export interface IPageEntry extends IPageFields {
  sys?: any;
}

export interface IPage extends EntrySkeletonType {
  fields: IPageFields;
}

export const fetchPages = async (preview = false,) => {
  const data = await client(preview).getEntries<LessonEntrySkeleton>({
    content_type: CONTENT_TYPE_NAME,
    include: 5
  });

  const parsedData = serializeData(data);

  return parsedData
};



export const fetchPageWithSlug = async ({
  slug,
  preview = false,
}: {
  slug: string;
  preview?: boolean;
}) => {
  try {
    const response = await client(preview).getEntries({
      content_type: CONTENT_TYPE_NAME,
      "fields.slug[match]": slug,
      include: 7,
    });

    return response.items?.[0]
    const parsedData = serializeData(response.items?.[0]);

    return parsedData
  } catch (error) {
    return null;
  }
};