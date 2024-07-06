import '../error-page/ErrorPage.css';

const ErrorPage = ({ message }) => {
  return (
    <div className="container">
      <h3 className="title">Something went wrong...</h3>
      <p className="subtitle">
        An error occurred or you requested a page that does not exist
      </p>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ErrorPage;
