import React from "react";
import moment from "moment";
import "./laundry-row.css";

function LaundryRow({ index, week, isHide, handleWeekChange, editMode }) {
  const currentWeek = moment().isoWeekday(1).isoWeek();

  const handleOnDrag = (e, weekRow, type) => {
    e.dataTransfer.setData("weekRow", JSON.stringify(weekRow));
    e.dataTransfer.setData("type", type);
  };

  const handleOnDrop = (e) => {
    const weekRow = JSON.parse(e.dataTransfer.getData("weekRow"));
    const fromType = e.dataTransfer.getData("type");

    const toObject = JSON.parse(e.currentTarget.getAttribute("data-week"));
    const toType = e.currentTarget.getAttribute("data-type");

    const newRows = evalType(weekRow, toObject, fromType, toType);

    handleWeekChange(newRows.from, newRows.to);
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  const evalType = (fromObject, toObject, typeFrom, typeTo) => {
    if (fromObject.week === toObject.week) {
      return {
        from: {
          week: fromObject.week,
          stue: fromObject.bad,
          bad: fromObject.stue,
        },
        to: {
          week: fromObject.week,
          stue: fromObject.bad,
          bad: fromObject.stue,
        },
      };
    }

    if (fromObject.week !== toObject.week && typeFrom === typeTo) {
      return {
        from: {
          week: fromObject.week,
          stue: toObject.stue,
          bad: fromObject.bad,
        },
        to: {
          week: toObject.week,
          stue: fromObject.stue,
          bad: toObject.bad,
        },
      };
    }

    if (
      fromObject.week !== toObject.week &&
      typeFrom === "stue" &&
      typeTo === "bad"
    ) {
      return {
        from: {
          week: fromObject.week,
          stue: toObject.bad,
          bad: fromObject.bad,
        },
        to: {
          week: toObject.week,
          stue: toObject.stue,
          bad: fromObject.stue,
        },
      };
    }

    if (
      fromObject.week !== toObject.week &&
      typeFrom === "bad" &&
      typeTo === "stue"
    ) {
      return {
        from: {
          week: fromObject.week,
          stue: fromObject.stue,
          bad: toObject.stue,
        },
        to: {
          week: toObject.week,
          stue: toObject.stue,
          bad: fromObject.bad,
        },
      };
    }
  };

  if (!editMode) {
    return (
      <div
        className={`week-row ${
          week.week === currentWeek && isHide ? "highlight" : ""
        }`}
        key={index}
      >
        <div>{week.week}</div>
        <div>{week.stue}</div>
        <div>{week.bad}</div>
      </div>
    );
  }

  return (
    <div
      className={`week-row ${
        week.week === currentWeek && isHide ? "highlight" : ""
      }`}
      key={index}
    >
      <div>{week.week}</div>
      <div
        draggable
        onDragStart={(e) => handleOnDrag(e, week, "stue")}
        onDragOver={handleOnDragOver}
        onDrop={handleOnDrop}
        data-week={JSON.stringify(week)}
        data-type={"stue"}
      >
        {week.stue}
      </div>
      <div
        draggable
        onDragStart={(e) => handleOnDrag(e, week, "bad")}
        onDragOver={handleOnDragOver}
        onDrop={handleOnDrop}
        data-week={JSON.stringify(week)}
        data-type={"bad"}
      >
        {week.bad}
      </div>
    </div>
  );
}

export default LaundryRow;
