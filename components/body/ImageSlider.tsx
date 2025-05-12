"use client";
import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import gsap from "gsap";
import "swiper/css";
import "swiper/css/navigation";
import styles from "@/Styles/ImageSlider.module.css";
import Image from "next/image";
import SwiperCore from "swiper";

const images = [
  "/images/image1.webp",
  "/images/image2.webp",
  "/images/image4.webp",
];

const ImageSlider = () => {
  const swiperRef = useRef<SwiperCore | null>(null);
  const progressRefs = useRef<HTMLDivElement[]>([]);
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const currentTween = useRef<gsap.core.Tween | null>(null);

  const progressBarColor = "#f99a10";
  const activeBarColor = "#d0cdcb";

  const resetAllBars = (activeIdx: number) => {
    progressRefs.current.forEach((bar, i) => {
      gsap.killTweensOf(bar);
      gsap.set(bar, {
        width: i < activeIdx ? "100%" : "0%",
        backgroundColor: i < activeIdx ? activeBarColor : progressBarColor,
      });
    });
  };
  const animateSingleBar = (index: number) => {
    if (!progressRefs.current[index]) return;

    // ریست تمام انیمیشن‌های در حال اجرا
    if (currentTween.current) currentTween.current.kill();

    // صفرش کن
    gsap.set(progressRefs.current[index], {
      width: "0%",
      backgroundColor: progressBarColor,
    });

    currentTween.current = gsap.to(progressRefs.current[index], {
      width: "100%",
      duration: 5,
      ease: "linear",
      onComplete: () => {
        // تغییر رنگ بعد از پر شدن
        gsap.to(progressRefs.current[index], {
          backgroundColor: activeBarColor,
          duration: 0.5,
          onComplete: () => {
            const nextIndex = (index + 1) % images.length;
            if (swiperRef.current) {
              swiperRef.current.slideToLoop(nextIndex);
            }
            animateSingleBar(nextIndex); // بلافاصله بعدی شروع شه
          },
        });
      },
    });
  };

  useEffect(() => {
    if (swiperRef.current) {
      const swiper = swiperRef.current;

      swiper.on("slideChange", () => {
        const index = swiper.realIndex;

        // ریست همه بارها
        resetAllBars(index);

        // کمی مکث بعد اجرای انیمیشن جدید
        setTimeout(() => {
          animateSingleBar(index);
        }, 300);
      });

      // شروع انیمیشن بار اول
      resetAllBars(0);
      animateSingleBar(0);
    }

    return () => {
      swiperRef.current?.off("slideChange");
      currentTween.current?.kill();
    };
  }, []);

  return (
    <div className={styles.sliderContainer}>
      <div ref={nextRef} className={`${styles.navButton} ${styles.left}`}>
        <HiOutlineChevronLeft size={23} />
      </div>
      <div ref={prevRef} className={`${styles.navButton} ${styles.right}`}>
        <HiOutlineChevronRight size={23} />
      </div>

      <Swiper
        dir="rtl"
        modules={[Navigation]}
        loop
        speed={1000}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
          if (swiper.params.navigation) {
            const nav = swiper.params.navigation as any;
            nav.prevEl = prevRef.current;
            nav.nextEl = nextRef.current;
          }
        }}
        navigation={{
          nextEl: nextRef.current,
          prevEl: prevRef.current,
        }}
        className={styles.swiper}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className={styles.imageWrapper}>
              <Image
                src={img}
                alt={`slide-${index}`}
                layout="fill"
                objectFit="cover"
                className={styles.slideImage}
              />
              {index === 0 && (
                <div className={styles.overlayContent1}>
                  <h3>با قدرت پیش برو</h3>
                  <p>انتخابت رو از بین بهترین‌ها شروع کن!!</p>
                  <a href="/products" className={styles.ctaButton}>
                    دریافت اطلاعات
                  </a>
                </div>
              )}
              {index === 1 && (
                <div className={styles.overlayContent2}>
                  <h4>تصاویر گویاتر از کلماتند</h4>
                  <p>پشت صحنه قدرت را ببین!..</p>
                  <a href="/media" className={styles.ctaButtonAlt}>
                    شروع بررسی
                  </a>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.progressContainer}>
        {images.map((_, index) => (
          <div className={styles.progressBarWrapper} key={index}>
            <div
              className={styles.progressBar}
              ref={(el) => {
                if (el) progressRefs.current[index] = el;
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
