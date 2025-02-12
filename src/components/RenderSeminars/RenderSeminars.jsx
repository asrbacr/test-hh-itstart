import { useContext } from "react";
import s from "./RenderSeminars.module.css";
import AppContext from "../../context";

/**
 * Отрисовка списка семинаров
 * @param {seminars} seminars - список семинаров, которые требуется отрендерить на странице
 * @returns
 */
export const RenderSeminars = ({ seminars }) => {
  const {
    setOpenModalDelete,
    setOpenModalEdit,
    setSeminarToDelete,
    setSeminarToEdit,
  } = useContext(AppContext);
  return (
    <>
      <h1>Семинары</h1>
      {seminars.map((el) => (
        <div key={el.id} className={s.cart}>
          <img src={el.photo} alt={el.title} />
          <div className={s.list}>
            <p>{el.title}</p>
            <p>{el.description}</p>
            <p>{el.date}</p>
            <p>{el.time}</p>

            <button
              onClick={() => {
                setSeminarToEdit(el);
                setOpenModalEdit(true);
              }}
            >
              Редактировать
            </button>
            <button
              onClick={() => {
                setSeminarToDelete(el);
                setOpenModalDelete(true);
              }}
            >
              Удалить
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
