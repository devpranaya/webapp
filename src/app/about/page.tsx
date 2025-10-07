import { PERSONAL_INFO } from "@/lib/personal-info";

export default function AboutPage() {
  return (
    <article className="card">
      <h1 className="page-heading">About This Builder</h1>
      <p>
        The site delivers the first milestone of the LTU Cloud WebApp project. It focuses
        on helping staff produce portable HTML that meets accessibility and LMS
        constraints.
      </p>

      <section aria-labelledby="profile-details">
        <h2 id="profile-details" className="section-heading">
          Student details
        </h2>
        <p>
          <strong>Name:</strong> {PERSONAL_INFO.name}
          <br />
          <strong>Student number:</strong> {PERSONAL_INFO.studentNumber}
        </p>
      </section>

      <section aria-labelledby="video-guide">
        <h2 id="video-guide" className="section-heading">
          Walkthrough video
        </h2>
        <p>
          Watch the demonstration for a quick tour of configuring tabs, exporting code,
          and embedding it in Moodle.
        </p>
        <div
          style={{
            position: "relative",
            paddingBottom: "56.25%",
            height: 0,
            borderRadius: "1rem",
            overflow: "hidden",
            boxShadow: "0 12px 24px rgba(15, 23, 42, 0.15)",
          }}
        >
          <iframe
            title="Tab generator walkthrough"
            src="https://www.youtube-nocookie.com/embed/ysz5S6PUM-U"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
          />
        </div>
      </section>
    </article>
  );
}
