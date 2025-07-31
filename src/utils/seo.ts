import { buildStaticPaths } from "astro-react-i18next/utils";
import { DEFAULT_LANG_CODE, localesConfig } from "../../i18n.config";

/**
 * 放置SEO 页面相关的配置
 */

/**
 * 定义静态页路径
 * 如果传入了locale，则进行过滤
 */
export function defineStaticPaths(localeList?: string[]) {
  const paramsList: {
    params: {
      locale: string | undefined;
    };
  }[] = buildStaticPaths();

  let newParamsList = paramsList;

  // 过滤语言
  if (localeList?.length) {
    newParamsList = paramsList?.filter((item) => {
      const curLocale = item.params.locale;
      // en 语言为 undefine，直接返回，所有都带 en 语言
      if (!curLocale) {
        return true;
      } else {
        return localeList.includes(curLocale);
      }
    });
  }

  const curPageLocales = newParamsList.map((item) => {
    return item.params.locale || DEFAULT_LANG_CODE;
  });

  return newParamsList.map((item) => {
    return {
      // 路由参数
      ...item,
      // 传递告知当前页面有几种语言，用于 canonical 等
      props: {
        curPageLocales: curPageLocales,
      },
    };
  });
}

/**
 * 获取canonical 与 alternate
 * @param params.url 当前路径
 * @param params.locale 当前语言code，如果没有则为默认语言
 * @param params.curPageLocales 当前页面所有语言
 * @returns
 */
export function getCanonical(params: {
  pathname: string;
  locale?: string;
  curPageLocales: string[];
}) {
  const { pathname, locale = DEFAULT_LANG_CODE, curPageLocales } = params;

  // 确定 pathname，不加默认语言前缀
  let pathWithoutLocale = pathname.replace(/^\/[^\/]+/, ""); // 去掉语言前缀部分
  pathWithoutLocale = pathWithoutLocale == "/" ? "" : pathWithoutLocale;

  const canonicalPath =
    locale === DEFAULT_LANG_CODE
      ? pathWithoutLocale || "" // 如果是默认语言，没有路径就变成 '/'
      : `/${locale}${pathWithoutLocale}`;

  const canonicalUrl = `${
    import.meta.env.PUBLIC_DOMAIN_ADDRESS
  }${canonicalPath}`;

  return {
    canonicalPath: canonicalUrl,
    hreflangUrl: curPageLocales.map((locale) => {
      const isDefaultLocale = locale == DEFAULT_LANG_CODE;
      return {
        hreflang: localesConfig.find((d) => d.code == locale)?.language!,
        href: isDefaultLocale
          ? import.meta.env.PUBLIC_DOMAIN_ADDRESS
          : `${import.meta.env.PUBLIC_DOMAIN_ADDRESS}/${locale}`,
      };
    }),
  };
}


