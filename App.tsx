import React, { useEffect, useMemo, useState } from 'react';
import './humdex.css';

const BIBTEX = `@article{humdex2026,
  title   = {HumDex: Humanoid Dexterous Manipulation Made Easy},
  author  = {Liang Heng and Yihe Tang and Jiajun Xu and Henghui Bao and Di Huang and Yue Wang},
  journal = {Conference Submission},
  year    = {2026}
}`;

const App: React.FC = () => {
  const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('humdex-theme');
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('humdex-theme', theme);
  }, [theme]);

  const pageClassName = useMemo(
    () => `humdex-page${theme === 'light' ? ' light' : ''}`,
    [theme]
  );

  return (
    <div className={pageClassName}>
      <header className="topbar">
        <div className="container topbar-inner">
          <a className="brand" href="#home">HumDex</a>
          <nav className="nav">
            <a href="#abstract">Abstract</a>
            <a href="#method">Method</a>
            <a href="#videos">Video</a>
            <a href="#figures">Results</a>
            <a href="#bibtex">BibTeX</a>
          </nav>
        </div>
      </header>

      <main id="home">
        <section className="hero">
          <div className="container hero-inner">
            <h1>HumDex: Humanoid Dexterous Manipulation Made Easy</h1>
            <p className="subtitle">
              Liang Heng, Yihe Tang, Jiajun Xu, Henghui Bao, Di Huang, Yue Wang
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href={asset('571_HumDex_Humanoid_Dexterous_.pdf')}>
                Paper PDF
              </a>
              <a
                className="btn"
                href="https://github.com/LiangHeng121/HumDex"
                target="_blank"
                rel="noopener noreferrer"
              >
                Project Code
              </a>
              <a className="btn" href="#videos">Watch Demo</a>
            </div>
            <div className="meta">
              <span>Conference Submission</span>
              <span>Year: 2026</span>
            </div>
          </div>
        </section>

        <section className="section" id="abstract">
          <div className="container">
            <h2>Abstract</h2>
            <p>
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
        </section>

        <section className="section alt" id="method">
          <div className="container">
            <h2>Method Overview</h2>
            <div className="cards">
              <article className="card">
                <h3>IMU-Based Whole-Body Teleoperation</h3>
                <p>
                  Portable motion tracking provides accurate full-body control
                  without heavy infrastructure or strict line-of-sight
                  constraints.
                </p>
              </article>
              <article className="card">
                <h3>Learning-Based Hand Retargeting</h3>
                <p>
                  A lightweight model maps glove fingertip observations to 20-DoF
                  hand joints, producing smooth dexterous motions without manual
                  tuning.
                </p>
              </article>
              <article className="card">
                <h3>Two-Stage Imitation Learning</h3>
                <p>
                  The policy is first trained on diverse human data, then
                  fine-tuned on robot demonstrations for embodiment-specific
                  precision.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="videos">
          <div className="container">
            <h2>Demo Video</h2>
            <div className="video-stack">
              <figure className="video-card large">
                <video
                  className="demo-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                >
                  <source src={asset('videos/demo.mp4')} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <figcaption>Main Demonstration</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="section alt" id="figures">
          <div className="container">
            <h2>Results</h2>
            <div className="fig-grid">
              <figure className="result-figure">
                <img src={asset('figs/teaser.png')} alt="Fig.1 The HumDex System" />
                <figcaption>
                  <strong>Fig. 1: The HumDex System.</strong> Our portable teleoperation
                  system enables efficient collection of high-quality dexterous
                  manipulation data. Left: We demonstrate data collection and
                  autonomous policy execution on challenging tasks featuring
                  dexterous manipulation, bimanual coordination, long-horizon
                  planning, deformable and articulated object manipulation, and
                  whole-body movement. Middle: We use a Unitree-G1 humanoid and
                  two 20 DoF dexterous hands. Right: By pretraining robot policy
                  on diverse human data, our policy generalizes to new positions,
                  objects, and backgrounds unseen in robot data.
                </figcaption>
              </figure>
              <figure className="result-figure">
                <img src={asset('figs/method.png')} alt="Fig.2 System Overview" />
                <figcaption>
                  <strong>Fig. 2: System Overview.</strong> (A) Our teleoperation
                  pipeline and hand retargeting policy training. (B) Our imitation
                  learning policy architecture. We approximate proprioceptive
                  states missing in human data with previous-frame actions.
                </figcaption>
              </figure>
              <figure className="result-figure">
                <img src={asset('figs/task.png')} alt="Fig.3 Evaluation Tasks" />
                <figcaption>
                  <strong>Fig. 3: Evaluation Tasks and Generalization.</strong> We show
                  the initial state and key steps in evaluated tasks. In Task 5
                  generalization test, robot data used for training only consists
                  the Seen (position, object, background) setting.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="section alt" id="bibtex">
          <div className="container">
            <h2>BibTeX</h2>
            <pre className="bibtex"><code>{BIBTEX}</code></pre>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <p>© 2026 HumDex Project. All Rights Reserved.</p>
          <button
            type="button"
            className="theme-toggle"
            aria-label="Toggle theme"
            onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
          >
            {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;