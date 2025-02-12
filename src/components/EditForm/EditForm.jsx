import { useState } from "react";

/**
 * Модуль редактирования формы Семинаров
 * @param {seminar} seminar - Семинар в который будут вносится изменения
 * @param {onSave} onSave - Функция сохранения изменений
 * @returns Возвращается новое значение семинара
 * @example
 * <EditForm seminar={seminar} onSave={editSeminar} />
 */
export const EditForm = ({ seminar, onSave }) => {
  const [formData, setFormData] = useState({ ...seminar });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleInputChange}
      />
      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleInputChange}
      />
      <button onClick={() => onSave(formData)}>Сохранить</button>
    </div>
  );
};
