import { useState, useEffect } from "react";
import Card from "../components/Card";
import DeleteModal from "../components/DeleteModal";

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
    <div className="container py-5">
      <h1>All posts</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {/* CARDS FOR POSTS */}

        {articles.map(
          (article) =>
            article.title && (
              <Card
                key={article.id}
                id={article.id}
                title={article.title}
                img={article.img}
                author={article.author}
                content={article.content}
                category={article.category}
                published={article.published}
              />
            )
        )}
      </div>

      {/* MODALS TO DELETE ARTICLES */}

      {articles.map((article) => (
        <DeleteModal
          key={article.id}
          id={article.id}
          title={article.title}
          onClick={fetchDestroyArticle}
        />
      ))}
    </div>
  );
}
