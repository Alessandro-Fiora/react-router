import { useState, useEffect } from "react";
import Label from "../components/Label";

const customApiUrl = import.meta.env.VITE_API_URL;

export default function PostIndex() {
  const categories = ["HTML", "CSS", "JS"];

  const [articles, setArticles] = useState([]);

  // ^ INDEX
  const fetchArticles = () => {
    fetch(customApiUrl)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.filteredPosts);
      });
  };

  // ^ DESTROY
  const fetchDestroyArticle = (id) => {
    fetch(customApiUrl + id, {
      method: "DELETE",
    })
      .then((res) => res)
      .then((data) => {
        fetchArticles();
      });
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <>
      <div className="container py-5">
        <h1>All posts</h1>
        <div className="row row-cols-3 g-3">
          {articles.map(
            (article) =>
              article.title && (
                <div className="col" key={article.id}>
                  <div className="card h-100 p-3">
                    <div className="article-info flex-grow-1">
                      <h3 className="h5">{article.title}</h3>
                      <div className="img-container mb-2">
                        <img src={article.img} alt="" className="img-fluid" />
                      </div>
                      <h4 className="h6 fw-normal">
                        {article.author ? "Autore: " + article.author : ""}
                      </h4>
                      <h4 className="h6 fw-light mb-3">
                        {article.content ? article.content : ""}
                      </h4>

                      {article.category && <Label>{article.category}</Label>}

                      <h4 className="h6 fw-light mt-2">
                        {article.published
                          ? "Stato di pubblicazione: Pubblicato"
                          : "Stato di pubblicazione: Bozza"}
                      </h4>
                    </div>
                    <div className="article-buttons">
                      <button
                        className="btn p-0"
                        data-bs-toggle="modal"
                        data-bs-target={`#delete-modal-${article.id}`}
                      >
                        <i className=" fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>

      {/* MODALS TO DELETE ARTICLES */}

      {articles.map((article) => (
        <div
          key={article.id}
          className="modal"
          id={`delete-modal-${article.id}`}
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Cancella {article.title}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                Sei sicuro? L'eliminazione è irreversibile
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Annulla
                </button>
                <button
                  onClick={() => {
                    fetchDestroyArticle(article.id);
                  }}
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Elimina
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
