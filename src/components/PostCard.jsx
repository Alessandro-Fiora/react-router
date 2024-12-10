import Label from "./Label";

export default function Card({
  id,
  title,
  img,
  author,
  content,
  category,
  published,
}) {
  return (
    <div className="col">
      <div className="card h-100 p-3">
        <div className="article-info flex-grow-1">
          <h3 className="h5">{title}</h3>
          <div className="img-container mb-2">
            <img src={img} alt="" className="img-fluid" />
          </div>
          <h4 className="h6 fw-normal">{author ? "Autore: " + author : ""}</h4>
          <h4 className="h6 fw-light mb-3">{content ? content : ""}</h4>

          {category && <Label>{category}</Label>}

          <h4 className="h6 fw-light mt-2">
            {published
              ? "Stato di pubblicazione: Pubblicato"
              : "Stato di pubblicazione: Bozza"}
          </h4>
        </div>
        <div className="article-buttons">
          <button
            className="btn p-0"
            data-bs-toggle="modal"
            data-bs-target={`#delete-modal-${id}`}
          >
            <i className=" fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
