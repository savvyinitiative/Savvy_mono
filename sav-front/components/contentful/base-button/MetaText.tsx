import React from "react";
import { ContentfulLivePreview } from "@contentful/live-preview";

const LOCALE = "en_US";

export interface IMetaText {
  headline: string;
  subline: string;
  entryId: string;
}
const MetaText = ({ headline, subline, entryId }: IMetaText) => {
  return (
    <div className="flex flex-col ">
      <h1
        className=""
        {...ContentfulLivePreview.getProps({
          entryId,
          fieldId: "headline",
          locale: LOCALE,
        })}
      >
        {headline}
      </h1>

      <p className="text-2xl font-bold">{subline}</p>
    </div>
  );
  return (
    <div className=" h-full  ">
      <div className=" flex flex-col justify-center justify-items-center  space-y-4 w-full m-auto h-full prose-xl  p-2">
        <div className=" max-w-fit mx-auto prose-xl">
          <h2
            className=""
            {...ContentfulLivePreview.getProps({
              entryId,
              fieldId: "headline",
              locale: LOCALE,
            })}
          >
            {headline}
          </h2>
        </div>
        <div className="max-w-fit w-[80%] mx-auto ">
          <p className="">{subline}</p>
        </div>
      </div>
    </div>
  );
};

export default MetaText;
