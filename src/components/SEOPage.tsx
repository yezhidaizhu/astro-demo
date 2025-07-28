import React, { useState, useEffect, useCallback } from "react";

// 定义类型
interface CarouselItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

interface FeatureItem {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const SEOPage: React.FC = (props) => {
  console.log(props);

  // 状态管理
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });

  // 轮播图数据
  const carouselItems: CarouselItem[] = [
    {
      id: 1,
      title: "提升您的网站排名",
      description: "使用我们的SEO工具，让您的网站在搜索引擎结果页上脱颖而出。",
      imageUrl: "https://picsum.photos/id/1015/800/250",
      link: "#features",
    },
    {
      id: 2,
      title: "内容优化专家",
      description: "我们的AI内容分析器可以帮助您创建搜索引擎友好的内容。",
      imageUrl: "https://picsum.photos/id/1016/800/250",
      link: "#stats",
    },
    {
      id: 3,
      title: "数据分析与洞察",
      description: "实时跟踪您的网站性能，做出数据驱动的决策。",
      imageUrl: "https://picsum.photos/id/1018/800/250",
      link: "#cta",
    },
  ];

  // 特性数据
  const featureItems: FeatureItem[] = [
    {
      id: 1,
      icon: "📊",
      title: "高级分析",
      description: "深入了解您的网站流量来源和用户行为。",
    },
    {
      id: 2,
      icon: "⚡",
      title: "快速优化",
      description: "一键式SEO建议，立即提升您的网站排名。",
    },
    {
      id: 3,
      icon: "🔍",
      title: "关键词研究",
      description: "发现高潜力关键词，轻松超越竞争对手。",
    },
    {
      id: 4,
      icon: "📱",
      title: "移动优先",
      description: "确保您的网站在所有设备上都能完美展示。",
    },
  ];

  // 轮播图自动切换
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 滚动效果
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 切换暗黑模式
  const toggleDarkMode = useCallback(() => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", String(newMode));
    }
  }, [isDarkMode]);

  // 导航到指定部分
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  // 轮播图控制
  const goToSlide = (index: number) => {
    setActiveSlide(index);
  };

  // 渲染轮播图指示器
  const renderIndicators = () => {
    return carouselItems.map((_, index) => (
      <button
        key={index}
        onClick={() => goToSlide(index)}
        className={`w-3 h-3 rounded-full transition-all ${
          activeSlide === index ? "bg-white scale-125" : "bg-white/50"
        }`}
        aria-label={`Go to slide ${index + 1}`}
      />
    ));
  };

  // 渲染轮播图内容
  const renderCarousel = () => {
    return (
      <div
        className="relative w-full h-[600px] overflow-hidden rounded-xl shadow-2xl"
        style={{
          backgroundImage: `url(${carouselItems[activeSlide].imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {carouselItems[activeSlide].title}
          </h2>
          <p className="text-xl text-white/90 mb-6 max-w-2xl">
            {carouselItems[activeSlide].description}
          </p>
          <a
            href={carouselItems[activeSlide].link}
            className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all transform hover:scale-105"
          >
            了解更多
          </a>
        </div>
        <button
          onClick={() =>
            goToSlide(
              (activeSlide - 1 + carouselItems.length) % carouselItems.length
            )
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/30 hover:bg-white/50 transition-all"
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={() => goToSlide((activeSlide + 1) % carouselItems.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/30 hover:bg-white/50 transition-all"
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {renderIndicators()}
        </div>
      </div>
    );
  };

  // 渲染特性卡片
  const renderFeatureCards = () => {
    return featureItems.map((feature) => (
      <div
        key={feature.id}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
      >
        <div className="text-4xl mb-4 flex justify-center">{feature.icon}</div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 text-center">
          {feature.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-center">
          {feature.description}
        </p>
      </div>
    ));
  };

  // 渲染SEO统计数据
  const renderStats = () => {
    const stats = [
      { value: "10M+", label: "网站优化" },
      { value: "500K+", label: "满意客户" },
      { value: "98%", label: "成功率" },
      { value: "24/7", label: "支持" },
    ];

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="text-4xl font-bold text-primary mb-2">
              {stat.value}
            </div>
            <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
          </div>
        ))}
      </div>
    );
  };

  // 导航栏样式
  const navClasses = `fixed w-full z-50 transition-all duration-300 ${
    scrollPosition > 100
      ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md"
      : "bg-transparent"
  }`;

  // 主题图标
  const themeIcon = isDarkMode ? "🌙" : "☀️";

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* 导航栏 */}
      <nav className={navClasses}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a href="#" className="flex-shrink-0 flex items-center">
                <svg
                  className="h-8 w-8 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="ml-2 font-bold text-xl">SEO Pro</span>
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                功能
              </a>
              <a
                href="#stats"
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                统计数据
              </a>
              <a
                href="#cta"
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                开始使用
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {themeIcon}
              </button>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#features"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                功能
              </a>
              <a
                href="#stats"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                统计数据
              </a>
              <a
                href="#cta"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                开始使用
              </a>
              <button
                onClick={toggleDarkMode}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              >
                {themeIcon} 切换主题
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* 英雄区域 */}
      <header className="pt-24 pb-16 md:pt-32 md:pb-24">
        {renderCarousel()}
      </header>

      {/* 特性部分 */}
      <section id="features" className="py-16 bg-gray-50 dark:bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
              强大的SEO功能
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              我们的工具提供全方位的SEO解决方案，帮助您的网站在搜索引擎中获得更好的排名。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {renderFeatureCards()}
          </div>
        </div>
      </section>

      {/* 统计数据部分 */}
      <section id="stats" className="py-16 bg-primary/10 dark:bg-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
              我们的成就
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              数千家企业信任我们的SEO解决方案，取得了显著成果。
            </p>
          </div>
          {renderStats()}
        </div>
      </section>

      {/* CTA部分 */}
      <section
        id="cta"
        className="py-20 bg-gradient-to-r from-primary to-secondary"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            准备好提升您的网站排名了吗？
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            立即注册，免费试用我们的SEO工具，体验网站流量增长的快感。
          </p>
          <a
            href="#"
            className="px-8 py-4 bg-white text-primary rounded-lg font-medium hover:bg-white/90 transition-all transform hover:scale-105"
          >
            免费开始
          </a>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="py-12 bg-gray-900 dark:bg-gray-800 text-gray-300 dark:text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">SEO Pro</h3>
              <p className="mb-4">
                专业的SEO工具，帮助您的网站在搜索引擎中获得更好的排名。
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-1.064.045-1.791.208-2.427.455a4.883 4.883 0 01-1.772 1.148 4.883 4.883 0 01-1.148 1.772c-.248.637-.414 1.364-.465 2.427C2.013 6.867 2 7.21 2 9.633v.63c0 2.456.011 2.784.058 3.807.045 1.064.208 1.791.455 2.427a4.883 4.883 0 011.148 1.772A4.883 4.883 0 015.45 18.085c.637.248 1.364.414 2.427.465C8.901 18.58 9.256 18.6 11.685 18.6h.63c2.456 0 2.784-.011 3.807-.058 1.064-.045 1.791-.208 2.427-.455a4.883 4.883 0 011.772-1.148 4.883 4.883 0 011.148-1.772c.248-.637.414-1.364.465-2.427.047-1.067.06-1.407.06-4.123v-.63c0-2.43-.012-2.784-.058-3.807-.045-1.064-.208-1.791-.455-2.427a4.883 4.883 0 01-1.148-1.772 4.883 4.883 0 01-1.772-1.148c-.247-.636-.414-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.08z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">产品</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    功能介绍
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    价格方案
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    客户案例
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    帮助中心
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">公司</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    关于我们
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    团队
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    博客
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    联系我们
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">法律</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    隐私政策
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    服务条款
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookie政策
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 text-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} SEO Pro. 保留所有权利。
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SEOPage;
