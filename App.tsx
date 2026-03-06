import React from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import Section from './components/Section';
import VideoCarousel from './components/VideoCarousel';
import { CarouselItem } from './types';

const BIBTEX = `@article{humdex2026,
  title   = {HumDex: Humanoid Dexterous Manipulation Made Easy},
  author  = {Liang Heng and Yihe Tang and Jiajun Xu and Henghui Bao and Di Huang and Yue Wang},
  journal = {Conference Submission},
  year    = {2026}
}`;

const DEMO_VIDEOS: CarouselItem[] = [
  {
    id: 1,
    title: 'Main Demonstration',
    description: 'HumDex whole-body dexterous manipulation demo.',
    videoUrl: 'videos/demo.mp4',
  },
];

type ResultVideoItem = {
  id: number;
  title: string;
  videoUrl: string;
  featured?: boolean;
};

const INFERENCE_VIDEOS: ResultVideoItem[] = [
  // Supports both local paths and full HTTPS URLs.
  { id: 1, title: 'Scan&Pack', videoUrl: 'videos/扫码-推理.hq2.mp4', featured: true },
  { id: 2, title: 'Hang Towel', videoUrl: 'videos/挂毛巾-推理.hq2.mp4' },
  { id: 3, title: 'Open Door', videoUrl: 'videos/开门-推理.hq2.mp4' },
  { id: 4, title: 'Place Basket', videoUrl: 'videos/提篮子-推理.hq2.mp4' },
  { id: 5, title: 'Pick Bread', videoUrl: 'videos/抓面包-推理-横.hq2.mp4' },
];

const TELEOP_VIDEOS: ResultVideoItem[] = [
  // Supports both local paths and full HTTPS URLs.
  { id: 1, title: 'Scan&Pack Teleoperation', videoUrl: 'videos/扫码-遥操-横.hq2.mp4' },
  { id: 2, title: 'Hang Towel Teleoperation', videoUrl: 'videos/挂毛巾-遥操-横.hq2.mp4' },
  { id: 3, title: 'Open Door Teleoperation', videoUrl: 'videos/开门-遥操.hq2.mp4' },
  { id: 4, title: 'Place Basket Teleoperation', videoUrl: 'videos/提篮子-遥操-横.hq2.mp4' },
  { id: 5, title: 'Pick Bread Teleoperation', videoUrl: 'videos/抓面包-遥操-横.hq2.mp4' },
];

const App: React.FC = () => {
  const teleopScrollRef = React.useRef<HTMLDivElement>(null);
  const asset = (path: string) => `${import.meta.env.BASE_URL}${encodeURI(path)}`;
  const resolveVideoUrl = (url: string) =>
    /^https?:\/\//i.test(url) ? url : asset(url);
  const videoItems = DEMO_VIDEOS.map((item) => ({
    ...item,
    videoUrl: item.videoUrl ? resolveVideoUrl(item.videoUrl) : undefined,
  }));
  const inferenceVideos = INFERENCE_VIDEOS.map((item) => ({
    ...item,
    videoUrl: resolveVideoUrl(item.videoUrl),
  }));
  const teleopVideos = TELEOP_VIDEOS.map((item) => ({
    ...item,
    videoUrl: resolveVideoUrl(item.videoUrl),
  }));
  const scrollTeleop = (direction: 'left' | 'right') => {
    const node = teleopScrollRef.current;
    if (!node) return;
    const offset = Math.round(node.clientWidth * 0.85);
    node.scrollBy({
      left: direction === 'left' ? -offset : offset,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-brand-dark selection:bg-brand-cyan selection:text-brand-dark font-sans text-gray-100">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/80 backdrop-blur-md py-3 border-b border-white/5 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-full">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-purple to-brand-cyan flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-brand-purple/20">
                H
              </div>
              <a href="#hero" className="text-white text-xl font-bold tracking-tight hover:text-brand-cyan transition-colors">
                HumDex
              </a>
            </div>
            <div className="hidden md:flex space-x-1">
              {[
                ['Intro', '#intro'],
                ['Method', '#method'],
                ['Results', '#results'],
                ['BibTeX', '#bibtex'],
              ].map(([name, href]) => (
                <a key={name} href={href} className="text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full text-sm font-medium transition-all">
                  {name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-dark/30 to-brand-dark pointer-events-none" />
        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 flex flex-col items-center text-center">
          <div className="mb-10 max-w-5xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-white">
                HumDex
              </span>
              <span className="block mt-3 text-2xl md:text-4xl lg:text-5xl font-semibold text-gray-100">
                Humanoid Dexterous Manipulation Made Easy
              </span>
            </h1>
          </div>

          <p className="max-w-3xl text-base md:text-xl text-gray-300 leading-relaxed">
            Liang Heng, Yihe Tang, Jiajun Xu, Henghui Bao, Di Huang, Yue Wang
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a
              href={asset('571_HumDex_Humanoid_Dexterous_.pdf')}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-brand-cyan/50 text-white transition-all duration-300"
            >
              <i className="fas fa-file-pdf"></i>
              <span className="font-medium">Paper PDF</span>
            </a>
            <a
              href="https://github.com/LiangHeng121/HumDex"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-brand-cyan/50 text-white transition-all duration-300"
            >
              <i className="fab fa-github"></i>
              <span className="font-medium">Project Code</span>
            </a>
          </div>
        </div>
      </section>

      <main>
        <Section id="intro" title="Intro">
          <div className="space-y-6">
            <div className="max-w-4xl mx-auto">
              <VideoCarousel items={videoItems} />
            </div>
            <p className="text-justify leading-relaxed text-gray-300">
              This paper investigates humanoid whole-body dexterous manipulation,
              where efficient collection of high-quality demonstrations remains a
              central bottleneck. We introduce HumDex, a portable teleoperation
              system that leverages IMU-based motion tracking for accurate
              full-body tracking and a learning-based hand retargeting method for
              smooth, natural dexterous control. Building on this system, we
              propose a two-stage imitation learning framework: pre-train on
              diverse human motion data, then fine-tune on robot data to bridge
              embodiment gaps. Experiments show strong improvements in collection
              efficiency, teleoperation success, downstream policy performance,
              and generalization to unseen positions, objects, and backgrounds.
            </p>
          </div>
        </Section>

        <Section id="method" title="Method Overview">
          <div className="space-y-6">
            <figure className="bg-black/30 rounded-xl overflow-hidden border border-white/10">
              <img src={asset('figs/method.jpg')} alt="Method Overview" className="w-full h-auto" />
            </figure>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <article className="bg-black/30 rounded-xl p-5 border border-white/10">
                <h3 className="text-xl font-bold mb-3">IMU-Based Whole-Body Teleoperation</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Portable motion tracking provides accurate full-body control
                  without heavy infrastructure or strict line-of-sight constraints.
                </p>
              </article>
              <article className="bg-black/30 rounded-xl p-5 border border-white/10">
                <h3 className="text-xl font-bold mb-3">Learning-Based Hand Retargeting</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  A lightweight model maps glove fingertip observations to 20-DoF
                  hand joints, producing smooth dexterous motions without manual tuning.
                </p>
              </article>
              <article className="bg-black/30 rounded-xl p-5 border border-white/10">
                <h3 className="text-xl font-bold mb-3">Two-Stage Imitation Learning</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  The policy is first trained on diverse human data, then fine-tuned
                  on robot demonstrations for embodiment-specific precision.
                </p>
              </article>
            </div>
          </div>
        </Section>

        <Section id="results" title="Results" fullWidth>
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4">Autonomous Inference</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[200px]">
                {inferenceVideos.map((item) => (
                  <figure
                    key={item.id}
                    className={`relative bg-black/30 rounded-xl overflow-hidden border border-white/10 ${
                      item.featured ? 'md:col-span-2 md:row-span-2 md:col-start-2 md:row-start-1' : ''
                    }`}
                  >
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls
                      preload="metadata"
                    >
                      <source src={item.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <figcaption className="absolute top-2 left-2 text-sm font-semibold bg-black/60 px-3 py-1 rounded-md border border-white/20">
                      {item.title}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <h3 className="text-2xl font-bold">Teleoperation</h3>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Scroll left"
                    onClick={() => scrollTeleop('left')}
                    className="h-9 w-9 rounded-full border border-white/20 bg-black/40 hover:bg-black/60 transition-colors"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    aria-label="Scroll right"
                    onClick={() => scrollTeleop('right')}
                    className="h-9 w-9 rounded-full border border-white/20 bg-black/40 hover:bg-black/60 transition-colors"
                  >
                    ›
                  </button>
                </div>
              </div>
              <div
                ref={teleopScrollRef}
                className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory"
              >
                {teleopVideos.map((item) => (
                  <figure
                    key={item.id}
                    className="relative shrink-0 w-[260px] sm:w-[280px] snap-start bg-black/30 rounded-xl overflow-hidden border border-white/10"
                  >
                    <video
                      className="w-full aspect-video object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls
                      preload="metadata"
                    >
                      <source src={item.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <figcaption className="absolute top-2 left-2 text-sm font-semibold bg-black/60 px-3 py-1 rounded-md border border-white/20">
                      {item.title}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <figure className="bg-black/30 rounded-xl overflow-hidden border border-white/10">
              <img src={asset('figs/teaser.png')} alt="Fig.1 The HumDex System" className="w-full h-auto" />
              <figcaption className="p-4 text-sm text-gray-300 leading-relaxed">
                <strong>Fig. 1: The HumDex System.</strong> Our portable teleoperation system enables efficient collection of high-quality dexterous manipulation data.
              </figcaption>
            </figure>
            <figure className="bg-black/30 rounded-xl overflow-hidden border border-white/10">
              <img src={asset('figs/method.jpg')} alt="Fig.2 System Overview" className="w-full h-auto" />
              <figcaption className="p-4 text-sm text-gray-300 leading-relaxed">
                <strong>Fig. 2: System Overview.</strong> Teleoperation and hand retargeting pipeline with imitation policy architecture.
              </figcaption>
            </figure>
            <figure className="bg-black/30 rounded-xl overflow-hidden border border-white/10">
              <img src={asset('figs/task.png')} alt="Fig.3 Evaluation Tasks" className="w-full h-auto" />
              <figcaption className="p-4 text-sm text-gray-300 leading-relaxed">
                <strong>Fig. 3: Evaluation Tasks and Generalization.</strong> Initial states and key steps in evaluated tasks under seen and unseen settings.
              </figcaption>
            </figure>
          </div>
        </Section>

        <Section id="bibtex" title="BibTeX">
          <pre className="bg-[#0d1117] p-6 rounded-xl overflow-x-auto text-sm text-gray-300 font-mono border border-white/10 shadow-inner">
            {BIBTEX}
          </pre>
        </Section>
      </main>

      <footer className="bg-black/80 backdrop-blur-md border-t border-white/5 py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} HumDex Project. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;