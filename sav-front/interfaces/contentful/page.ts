
import { SysType, EntryType } from "./general"
export interface RegularPageType  {
    fields: RegularPageFieldsType;
    metatdata: object;
    sys: SysType;
}

enum PageType {
    "blog",
    "regular",
    "event"
}
export interface RegularPageFieldsType  {
    title: string;
    slug: string
    type?: object;
    heroBanner : EntryType
    pageType: PageType;
    topSection: EntryType[]
    seo : any

}

export interface RegularPageEntryType  {
    title: string;
    slug: string
    type?: object;
    pageType: PageType;

}

export interface BlogPageType  {
    fields: BlogPageFieldsType;
    metatdata: object;
    sys: SysType;

}

export interface BlogPageFieldsType  {
    title: string;
    slug: string
    publishedDate: string
    introText: string
    body: string
    featuredImage: any;
    seo : any
    category : EntryType
    authors : EntryType[]
    pageType: PageType;
    moreSections: EntryType[]

}




