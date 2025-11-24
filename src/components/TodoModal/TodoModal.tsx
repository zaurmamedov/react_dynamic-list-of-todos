import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  selectedTodoId?: number;
  onSelect?: (todo: Todo | null) => void;
  loading: boolean;
};

export const TodoModal: React.FC<Props> = ({
  todo,
  selectedTodoId,
  onSelect = () => {},
  loading,
}) => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!loading) {
      timer = setTimeout(() => setShowLoader(false), 500); // затримка
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [loading]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{selectedTodoId}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={() => onSelect(null)}
          />
        </header>

        <div className="modal-card-body">
          {showLoader ? (
            <Loader />
          ) : (
            <>
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>
              <p className="block" data-cy="modal-user">
                {todo.completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}

                {' by '}

                {todo.user && (
                  <a href={`mailto:${todo.user.email}`}>{todo.user.name}</a>
                )}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
