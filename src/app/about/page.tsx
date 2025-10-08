import { PERSONAL_INFO } from "@/lib/personal-info";

export default function AboutPage() {
  return (
    <article className="card">
      <h1 className="page-heading">About This Builder</h1>
      <p>
        The site delivers the first milestone of the Cloud WebApp project. It focuses
        on portable HTML code that meets accessibility and the outlined constraints.
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
    </article>
  );
}
