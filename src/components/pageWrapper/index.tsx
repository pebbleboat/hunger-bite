"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { IBreadCrumbs } from "@/utils/types";
import clsx from "clsx";
import { FC, PropsWithChildren } from "react";
interface IPageWraps {
  wrapperClass?: string;
  hideHeader?: boolean;
  hideFooter?: boolean;
  breadCrumbs?: IBreadCrumbs[];
}

const PageWrapper: FC<PropsWithChildren<IPageWraps>> = ({
  children,
  wrapperClass,
  hideHeader,
  hideFooter,
  breadCrumbs,
}) => {
  return (
    <main className="flex flex-col h-full min-h-0">
      {!hideHeader && <Header breadCrumbs={breadCrumbs} />}
      <div
        className={clsx(
          "animate-bottom overflow-hidden relative flex flex-col flex-1 min-h-0 lg:max-h-[calc(100vh-117px)] overflow-y-auto lg:mb-0 mb-5",
          wrapperClass,
        )}
      >
        {children}
      </div>
      {!hideFooter && <Footer />}
    </main>
  );
};

export default PageWrapper;
