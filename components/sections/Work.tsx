"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import { fadeUp, viewport } from "@/lib/animations";

const projects = [
  { name: "Afterhours", tag: "Gaming & community", category: "Web design & development", href: "https://afterhours.thryvvdigital.in/", image: "/images/afterhours-preview.png", theme: "afterhours" },
  { name: "Bloom & Co.", tag: "Lifestyle & gifting", category: "Brand website", href: "https://bloom.thryvvdigital.in", image: "/images/bloom-preview.png", theme: "bloom" },
  { name: "Aroma", tag: "Hospitality & culture", category: "Web design & development", href: "https://aroma.thryvvdigital.in/", image: "/images/aroma-preview.png", theme: "aroma" },
  { name: "Veilux", tag: "Luxury & lifestyle", category: "Digital experience", href: "https://veilux.thryvvdigital.in", image: "/images/veilux-preview.png", theme: "veilux" },
];

export function Work() {
  const reducedMotion = useReducedMotion();
  const [autoplay] = useState(() => Autoplay({ delay: 5000, playOnInit: false, stopOnInteraction: true, stopOnFocusIn: false }));
  const [carouselRef, carouselApi] = useEmblaCarousel({ loop: true, align: "center", duration: reducedMotion ? 0 : 32 }, [autoplay]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!carouselApi) return;
    const updateSelection = () => {
      setActiveIndex(carouselApi.selectedScrollSnap());
      autoplay.reset();
    };
    carouselApi.on("select", updateSelection);
    carouselApi.on("reInit", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
      carouselApi.off("reInit", updateSelection);
    };
  }, [carouselApi, autoplay]);

  useEffect(() => {
    if (!carouselApi) return;
    const showcase = carouselApi.rootNode().closest<HTMLElement>(".work-showcase");
    if (!showcase) return;
    let inView = false;
    let dragging = false;
    let focusFrame = 0;
    const syncPlayback = () => {
      const keyboardFocused = showcase.contains(document.activeElement) && document.activeElement?.matches(":focus-visible");
      const canPlay = !autoplayPaused && reducedMotion === false && inView && !dragging && !document.hidden && !keyboardFocused;
      if (canPlay && !autoplay.isPlaying()) autoplay.play();
      if (!canPlay) autoplay.stop();
    };
    const schedulePlayback = () => { cancelAnimationFrame(focusFrame); focusFrame = requestAnimationFrame(syncPlayback); };
    const dragStart = () => { dragging = true; syncPlayback(); };
    const dragEnd = () => { dragging = false; syncPlayback(); };
    const playbackStarted = () => setIsPlaying(true);
    const playbackStopped = () => setIsPlaying(false);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio >= 0.25;
      syncPlayback();
    }, { threshold: 0.25 });

    carouselApi.on("autoplay:play", playbackStarted).on("autoplay:stop", playbackStopped);
    carouselApi.on("pointerDown", dragStart).on("pointerUp", dragEnd).on("reInit", syncPlayback);
    showcase.addEventListener("pointerdown", schedulePlayback);
    showcase.addEventListener("keydown", schedulePlayback);
    showcase.addEventListener("focusin", syncPlayback);
    showcase.addEventListener("focusout", schedulePlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    observer.observe(showcase);
    return () => {
      autoplay.stop();
      observer.disconnect();
      cancelAnimationFrame(focusFrame);
      carouselApi.off("autoplay:play", playbackStarted).off("autoplay:stop", playbackStopped);
      carouselApi.off("pointerDown", dragStart).off("pointerUp", dragEnd).off("reInit", syncPlayback);
      showcase.removeEventListener("pointerdown", schedulePlayback);
      showcase.removeEventListener("keydown", schedulePlayback);
      showcase.removeEventListener("focusin", syncPlayback);
      showcase.removeEventListener("focusout", schedulePlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, [carouselApi, autoplay, autoplayPaused, reducedMotion]);

  function selectProject(index: number) {
    carouselApi?.scrollTo(index, Boolean(reducedMotion));
  }

  return (
    <section id="work" className="work-section section-space" aria-labelledby="work-title">
      <div className="page-shell">
        <motion.div className="section-heading" variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          <div><p className="section-label">01 / Selected work</p><h2 id="work-title">Different brands.<br /><span>Same high standards.</span></h2></div>
          <p className="section-aside">A selection of our digital concepts.<br />Distinctive by design. Built with purpose.</p>
        </motion.div>
        <motion.div className="work-showcase" role="region" aria-label="Selected projects" aria-roledescription="carousel" variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          <div ref={carouselRef} id="work-carousel" className="project-carousel" tabIndex={0} aria-label="Project slides" onKeyDown={(event) => {
            if (event.target !== event.currentTarget) return;
            const destinations: Record<string, number> = { ArrowLeft: (activeIndex - 1 + projects.length) % projects.length, ArrowRight: (activeIndex + 1) % projects.length, Home: 0, End: projects.length - 1 };
            const destination = destinations[event.key];
            if (destination === undefined) return;
            event.preventDefault();
            selectProject(destination);
          }}>
            <div className="project-track">
              {projects.map((project, index) => (
                <article key={project.name} className={`project-slide${index === activeIndex ? " is-selected" : ""}`} aria-roledescription="slide" aria-label={`${index + 1} of ${projects.length}: ${project.name}`}>
                  <a href={project.href} target="_blank" rel="noopener noreferrer" className={`project project-${project.theme}`} tabIndex={index === activeIndex ? 0 : -1} aria-label={`Explore ${project.name} live website (opens in a new tab)`} onDragStart={(event) => event.preventDefault()}>
                    <div className="project-image"><Image src={project.image} alt={`${project.name} website design`} fill sizes="(max-width: 767px) 85vw, (max-width: 1440px) 75vw, 1080px" className="object-cover object-top" draggable={false} /></div>
                    <div className="project-caption">
                      <div><h3>{project.name}</h3><p>{project.tag}</p></div>
                      <span className="project-category">{project.category}</span>
                      <span className="project-visit"><ArrowUpRight size={22} aria-hidden="true" /></span>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </div>
          <div className="project-controls">
            <span className="project-count"><strong>{String(activeIndex + 1).padStart(2, "0")}</strong><span> / {String(projects.length).padStart(2, "0")}</span></span>
            <span className="sr-only" aria-live={isPlaying ? "off" : "polite"} aria-atomic="true">{projects[activeIndex].name}, project {activeIndex + 1} of {projects.length}</span>
            <div className="project-pagination" role="group" aria-label="Choose project">
              {projects.map((project, index) => <button key={project.name} type="button" className="project-dot" aria-label={`Show ${project.name}`} title={project.name} aria-current={index === activeIndex ? "true" : undefined} aria-controls="work-carousel" onClick={() => selectProject(index)}><span /></button>)}
            </div>
            <div className="project-arrows">
              {!reducedMotion && <button type="button" className="project-control" aria-label={autoplayPaused ? "Resume automatic slideshow" : "Pause automatic slideshow"} title={autoplayPaused ? "Resume automatic slideshow" : "Pause automatic slideshow"} aria-controls="work-carousel" onClick={() => setAutoplayPaused((paused) => !paused)}>{autoplayPaused ? <Play size={18} aria-hidden="true" /> : <Pause size={18} aria-hidden="true" />}</button>}
              <button type="button" className="project-control" aria-label="Previous project" title="Previous project" aria-controls="work-carousel" onClick={() => carouselApi?.scrollPrev(Boolean(reducedMotion))}><ArrowLeft size={20} aria-hidden="true" /></button>
              <button type="button" className="project-control project-control-next" aria-label="Next project" title="Next project" aria-controls="work-carousel" onClick={() => carouselApi?.scrollNext(Boolean(reducedMotion))}><ArrowRight size={20} aria-hidden="true" /></button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}