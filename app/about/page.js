// app/about/page.js
import styles from "./about.module.css";
import Image from "next/image";

export const metadata = {
  title: "About Us | Your Company",
  description:
    "Learn about our story, our mission and the team behind Your Company",
};

export default function AboutPage() {
  return (
    <div className={styles.aboutContainer}>
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>About Us</h1>
          <p className={styles.heroSubtitle}>
            Our story, mission, and the people who make it possible
          </p>
        </div>
      </section>

      {/* <section className={styles.storySection}>
        <div className={styles.storyContent}>
          <div className={styles.storyText}>
            <h2 className={styles.sectionTitle}>Our Story</h2>
            <p>
              Founded in 2024, our journey began with a clear mission: to
              revolutionize the grocery shopping experience. We saw an
              opportunity to blend the convenience of e-commerce with
              cutting-edge AI technology to create something truly innovative.
            </p>
            <p>
              What started as a passionate team's vision quickly grew into a
              dynamic effort to build the future of grocery retail. We're
              dedicated to empowering both businesses and individuals, making
              fresh, quality groceries more accessible and personal than ever
              before.
            </p>
          </div>
          <div className={styles.storyImage}>
            <div className={styles.imagePlaceholder}>
              <div>
                <img src="/images/aboutusImg.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
       */}

      <section className={styles.storySection}>
        <div className={styles.storyContent}>
          <div className={styles.storyText}>
            <h2 className={styles.sectionTitle}>Our Story</h2>
            <p>
              Founded in 2024, our journey began with a clear mission: to
              revolutionize the grocery shopping experience. We saw an
              opportunity to blend the convenience of e-commerce with
              cutting-edge AI technology to create something truly innovative.
            </p>
            <p>
              What started as a passionate team's vision quickly grew into a
              dynamic effort to build the future of grocery retail. We're
              dedicated to empowering both businesses and individuals, making
              fresh, quality groceries more accessible than before.
            </p>
          </div>
          <div className={styles.storyImage}>
            <div className={styles.imagePlaceholder}>
              <img
                src="/images/aboutusImg.jpg"
                alt="About us - Our story and mission"
                className={styles.responsiveImage}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.missionSection}>
        <div className={styles.missionContent}>
          <h2 className={styles.sectionTitle}>Our Mission & Values</h2>
          <div className={styles.missionCards}>
            <div className={styles.missionCard}>
              <div className={styles.cardIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
              <h3>Our Mission</h3>
              <p>
                To deliver exceptional value through innovative solutions that
                address real-world challenges, while maintaining the highest
                standards of quality and customer service.
              </p>
            </div>
            <div className={styles.missionCard}>
              <div className={styles.cardIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h3>Innovation</h3>
              <p>
                We constantly seek new ideas and approaches, embracing change
                and technological advancements to stay ahead of the curve and
                deliver cutting-edge solutions.
              </p>
            </div>
            <div className={styles.missionCard}>
              <div className={styles.cardIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3>Collaboration</h3>
              <p>
                We believe in the power of teamwork and partnership, fostering
                an environment where diverse perspectives come together to
                create exceptional outcomes.
              </p>
            </div>
            <div className={styles.missionCard}>
              <div className={styles.cardIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              </div>
              <h3>Integrity</h3>
              <p>
                We conduct our business with honesty, transparency, and ethical
                principles, building trust with our clients, partners, and
                within our team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <section className={styles.teamSection}>
        <div className={styles.teamContent}>
          <h2 className={styles.sectionTitle}>Meet Our Team</h2>
          <p className={styles.teamIntro}>
            Our success is driven by our talented team of professionals who
            bring diverse skills, experiences, and perspectives to every
            project.
          </p>

          <div className={styles.teamGrid}>
            {[1, 2, 3, 4].map((member) => (
              <div key={member} className={styles.teamMember}>
                <div className={styles.memberPhoto}>
                  <div className={styles.photoPlaceholder}></div>
                </div>
                <h3 className={styles.memberName}>Team Member {member}</h3>
                <p className={styles.memberRole}>Position Title</p>
                <p className={styles.memberBio}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam at justo vel tellus facilisis efficitur.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.statsSection}>
        <div className={styles.statsContent}>
          <div className={styles.statCard}>
            <h3 className={styles.statNumber}>5+</h3>
            <p className={styles.statLabel}>Years of Experience</p>
          </div>
          <div className={styles.statCard}>
            <h3 className={styles.statNumber}>100+</h3>
            <p className={styles.statLabel}>Projects Completed</p>
          </div>
          <div className={styles.statCard}>
            <h3 className={styles.statNumber}>50+</h3>
            <p className={styles.statLabel}>Happy Clients</p>
          </div>
          <div className={styles.statCard}>
            <h3 className={styles.statNumber}>15+</h3>
            <p className={styles.statLabel}>Team Members</p>
          </div>
        </div>
      </section> */}

      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Join Our Journey</h2>
          <p className={styles.ctaText}>
            Ready to work with us? We're always looking for new challenges and
            opportunities to make an impact.
          </p>
          <div className={styles.ctaButtons}>
            <a href="/contactus" className={styles.primaryButton}>
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
