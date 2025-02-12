import s from "./ModalWindow.module.css";

/**
 * Модальное окно
 * @param {onConfirm} onConfirm - свойство для кнопки подтверждения
 * @param {onCancel} onCancel - свойство для кнопки отмены
 * @param {content} content - свойство для контента
 * @param {yes} yes - название для кнопки подтверждения
 * @param {no} no - название для кнопки отмены
 * @returns 
 * @example <ModalWindow onConfirm={onConfirm} onCancel={onCancel} content={content} yes={yes} no={no} />
 */
export const ModalWindow = ({ onConfirm, onCancel, content, yes, no }) => {
  return (
    <>
      <div className={`${s.overlay} ${s.overlayVisible}`}>
        <div className={s.block}>
          {content}
          <div>
            <button onClick={onConfirm}>{yes}</button>
            <button onClick={onCancel}>{no}</button>
          </div>
        </div>
      </div>
    </>
  );
};
