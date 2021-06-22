import React from 'react';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './ViewportPane.css';

const ViewportPane = function (props) {
  const { children, onDrop, onClick, viewportIndex, className: propClassName } = props;
  const [{ hovered, highlighted }, drop] = useDrop({
    accept: 'thumbnail',
    drop: (droppedItem, monitor) => {
      const canDrop = monitor.canDrop();
      const isOver = monitor.isOver();

      if (canDrop && isOver && onDrop) {
        const { StudyInstanceUID, displaySetInstanceUID } = droppedItem;

        onDrop({ viewportIndex, StudyInstanceUID, displaySetInstanceUID });
      }
    },
    // Monitor, and collect props.
    // Returned as values by `useDrop`
    collect: monitor => ({
      highlighted: monitor.canDrop(),
      hovered: monitor.isOver(),
    }),
  });

  return (
    <div
      className={classNames(
        'viewport-drop-target',
        { hovered: hovered },
        { highlighted: highlighted },
        propClassName
      )}
      ref={drop}
      data-cy={`viewport-container-${viewportIndex}`}
      onClick={ev => onClick(viewportIndex)}
      style={{
        position: 'absolute',
        left: (props.pos.x1 * 100) + '%',
        top: (props.pos.y1 * 100) + '%',
        width: ((props.pos.x2 - props.pos.x1) * 100) + '%', 
        height: ((props.pos.y1 - props.pos.y2) * 100) + '%'
      }}
    >
      {children}
    </div>
  );
};

ViewportPane.propTypes = {
  children: PropTypes.node.isRequired,
  viewportIndex: PropTypes.number.isRequired,
  onDrop: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  pos: PropTypes.object.isRequired
};

export default ViewportPane;
