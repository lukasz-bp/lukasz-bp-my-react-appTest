import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import Draggable from "react-draggable";

export type CalendarProps = {
  gameDate: Date;
  calendarVisible: boolean;
  setCalendarVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onSetGameDate: (date: Date) => void;
};

export function DraggableCalendar({
  //setGameDate,
  gameDate,
  calendarVisible,
  setCalendarVisible,
  onSetGameDate,
}: CalendarProps) {
  //
  return (
    <Draggable>
      <div className="draggable__container">
        <div className="draggable">
          {calendarVisible && (
            <>
              <button
                className="closeCallendar__btn"
                onClick={() => setCalendarVisible(false)}
              >
                ❌
              </button>
              <Calendar
                value={gameDate}
                onChange={(value) => {
                  if (value instanceof Date) {
                    onSetGameDate(value);
                  }
                }}
              />
            </>
          )}
        </div>
      </div>
    </Draggable>
  );
}
