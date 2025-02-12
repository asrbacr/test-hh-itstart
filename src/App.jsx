import { useState, useEffect } from "react";
import axios from "axios";
import { ModalWindow } from "./components/ModalWindow/ModalWindow";
import { EditForm } from "./components/EditForm/EditForm";
import { RenderSeminars } from "./components/RenderSeminars/RenderSeminars";
import AppContext from "./context";

const SERVER_URL = "http://localhost:3000/seminars";

function App() {
  const [seminars, setSeminars] = useState([]);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [seminarToDelete, setSeminarToDelete] = useState(null);
  const [seminarToEdit, setSeminarToEdit] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(SERVER_URL);

        const formattedData = response.data.map((obj) => ({
          ...obj,
          date: formatDate(obj.date),
        }));

        setSeminars(formattedData);
      } catch (error) {
        console.error("Ошибка при получении данных: ", error);
      }
    }
    getData();
  }, []);

  // Функция преобразования даты
  const formatDate = (dateString) => {
    if (!dateString) return ""; // Защита от пустых значений

    const [day, month, year] = dateString.split(".");
    const dateObj = new Date(`${year}-${month}-${day}`);

    return dateObj.toISOString().split("T")[0]; // Приводим к формату YYYY-MM-DD
  };

  // Функция удаления
  const delSeminar = async () => {
    if (!seminarToDelete) return;
    try {
      await axios.delete(`${SERVER_URL}/${seminarToDelete.id}`);
      setSeminars((prev) =>
        prev.filter((obj) => obj.id !== seminarToDelete.id)
      );
      console.log(`Удалено: ${SERVER_URL}/${seminarToDelete.id}`);
    } catch (error) {
      console.error("Ошибка при удалении семинара: ", error);
    }
    setOpenModalDelete(false);
    setSeminarToDelete(null);
  };

  // Функция редактирования
  const editSeminar = async (newData) => {
    if (!seminarToEdit) return;
    try {
      await axios.put(`${SERVER_URL}/${seminarToEdit.id}`, newData);
      setSeminars((prev) =>
        prev.map((obj) =>
          obj.id === seminarToEdit.id ? { ...obj, ...newData } : obj
        )
      );
      console.log(`Изменено: ${SERVER_URL}/${seminarToEdit.id}`);
    } catch (error) {
      console.error("Ошибка при изменении семинара: ", error);
    }
    setOpenModalEdit(false);
    setSeminarToEdit(null);
  };

  return (
    <AppContext.Provider
      value={{
        setSeminarToEdit,
        setOpenModalEdit,
        setSeminarToDelete,
        setOpenModalDelete,
      }}
    >
      <>
        {openModalDelete && (
          <ModalWindow
            yes="Да"
            no="Нет"
            onConfirm={delSeminar}
            onCancel={() => setOpenModalDelete(false)}
            content={<h4>Вы действительно хотите удалить этот семинар?</h4>}
          />
        )}

        {openModalEdit && seminarToEdit && (
          <ModalWindow
            yes="Готово"
            no="Отмена"
            onConfirm={() => {
              setOpenModalEdit(false);
            }}
            onCancel={() => setOpenModalEdit(false)}
            content={<EditForm seminar={seminarToEdit} onSave={editSeminar} />}
          />
        )}

        <RenderSeminars seminars={seminars} />
      </>
    </AppContext.Provider>
  );
}

export default App;
