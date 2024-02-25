import * as contentful from "contentful";
import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode, EntitySys } from "contentful";

export interface TypeBlockContainerFields {
    id: EntryFieldTypes.Symbol;
    title?: EntryFieldTypes.Symbol;
    content: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeMediaWrapperSkeleton | TypeRichCopySkeleton>>;
    appearance: EntryFieldTypes.Symbol<"equal-rights" | "nepotism" | "reverse-nepotism">;
}

export type TypeBlockContainerSkeleton = EntrySkeletonType<TypeBlockContainerFields, "blockContainer">;
export type TypeBlockContainer<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeBlockContainerSkeleton, Modifiers, Locales>;

export interface TypeCourseFields {
    id: EntryFieldTypes.Symbol;
    title: EntryFieldTypes.Symbol;
    lessons?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLessonSkeleton>>;
    slug: EntryFieldTypes.Symbol;
}

export type TypeCourseSkeleton = EntrySkeletonType<TypeCourseFields, "course">;
export type TypeCourse<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeCourseSkeleton, Modifiers, Locales>;

export interface TypeImageHotspotFields {
    id: EntryFieldTypes.Symbol;
    title?: EntryFieldTypes.Symbol;
    image: EntryFieldTypes.EntryLink<TypeMediaWrapperSkeleton>;
    items: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeRichCopySkeleton>>;
    hotspots: EntryFieldTypes.Object;
}

export type TypeImageHotspotSkeleton = EntrySkeletonType<TypeImageHotspotFields, "imageHotspot">;
export type TypeImageHotspot<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeImageHotspotSkeleton, Modifiers, Locales>;

export interface TypeLessonFields {
    id: EntryFieldTypes.Symbol;
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    introText: EntryFieldTypes.RichText;
    modules?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeBlockContainerSkeleton | TypeImageHotspotSkeleton | TypeModuleSkeleton | TypeRichtextBlockSkeleton | TypeTabsSkeleton | TypeWistiaVideoSkeleton>>;
}

export type TypeLessonSkeleton = EntrySkeletonType<TypeLessonFields, "lesson">;
export type TypeLesson<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeLessonSkeleton, Modifiers, Locales>;

export interface TypeMediaWrapperFields {
    id: EntryFieldTypes.Symbol;
    title?: EntryFieldTypes.Symbol;
    altText: EntryFieldTypes.Symbol;
    image: EntryFieldTypes.AssetLink;
}

export type TypeMediaWrapperSkeleton = EntrySkeletonType<TypeMediaWrapperFields, "mediaWrapper">;
export type TypeMediaWrapper<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeMediaWrapperSkeleton, Modifiers, Locales>;

export interface TypeModuleFields {
    id: EntryFieldTypes.Symbol;
}

export type TypeModuleSkeleton = EntrySkeletonType<TypeModuleFields, "module">;
export type TypeModule<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeModuleSkeleton, Modifiers, Locales>;

export interface TypeRichCopyFields {
    id: EntryFieldTypes.Symbol;
    title?: EntryFieldTypes.Symbol;
    body?: EntryFieldTypes.RichText;
}

export type TypeRichCopySkeleton = EntrySkeletonType<TypeRichCopyFields, "richCopy">;
export type TypeRichCopy<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeRichCopySkeleton, Modifiers, Locales>;

export interface TypeRichtextBlockFields {
    id: EntryFieldTypes.Symbol;
    body?: EntryFieldTypes.RichText;
    media?: EntryFieldTypes.EntryLink<TypeMediaWrapperSkeleton | TypeWistiaVideoSkeleton>;
    graphic?: EntryFieldTypes.EntryLink<EntrySkeletonType>;
    bottomCopy?: EntryFieldTypes.RichText;
    variant?: EntryFieldTypes.Symbol<"equal-rights" | "nepotism">;
}

export type TypeRichtextBlockSkeleton = EntrySkeletonType<TypeRichtextBlockFields, "richtextBlock">;
export type TypeRichtextBlock<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeRichtextBlockSkeleton, Modifiers, Locales>;

export interface TypeTabsFields {
    id?: EntryFieldTypes.Symbol;
    title?: EntryFieldTypes.Symbol;
    items?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeRichCopySkeleton>>;
    appearance: EntryFieldTypes.Symbol<"accordion" | "tabs">;
}

export type TypeTabsSkeleton = EntrySkeletonType<TypeTabsFields, "tabs">;
export type TypeTabs<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeTabsSkeleton, Modifiers, Locales>;

export interface TypeWistiaVideoFields {
    title: EntryFieldTypes.Symbol;
    videoId: EntryFieldTypes.Symbol;
}

export type TypeWistiaVideoSkeleton = EntrySkeletonType<TypeWistiaVideoFields, "wistiaVideo">;
export type TypeWistiaVideo<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeWistiaVideoSkeleton, Modifiers, Locales>;
export interface IRichCopy extends EntrySkeletonType {
    fields : {
        id: EntryFieldTypes.Symbol;
        title?: EntryFieldTypes.Symbol;
        body?: EntryFieldTypes.RichText;
    }

}
