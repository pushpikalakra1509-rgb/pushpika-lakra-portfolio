export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-inner">
        <p className="not-found-code">404 / SIGNAL LOST</p>

        <h1>
          This page
          <br />
          doesn’t exist.
        </h1>

        <p className="not-found-copy">
          The requested signal could not be located.
          <br />
          Let’s get you back to the portfolio.
        </p>

        <a href="/pushpika-lakra-portfolio/" className="not-found-link">
          ← RETURN TO PORTFOLIO
        </a>
      </div>
    </main>
  );
}