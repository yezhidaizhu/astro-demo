import { buildStaticPaths } from "astro-react-i18next/utils";
/**
 * 放置SEO 页面相关的配置
 */

/**
 * 定义静态页路径
 * 如果传入了locale，则进行过滤
 */
export function defineStaticPaths(localeList?: string[]) {
  const DEFAULT_LANG = "en"; // 默认语言；

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
    return item.params.locale || DEFAULT_LANG;
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
