import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function ConfirmarCampeon({ tablasArray }) {
  console.log(
    "🚀 ~ file: ConfirmarCampeon.js ~ line 13 ~ ConfirmarCampeon ~ tablasArray",
    tablasArray
  );
  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    // const quotes = reorder(
    //   state.quotes,
    //   result.source.index,
    //   result.destination.index
    // );

    // setState({ quotes });
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* <Droppable droppableId="list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <QuoteList quotes={state.quotes} />
            {provided.placeholder}
          </div>
        )}
      </Droppable> */}
    </DragDropContext>
  );
}
