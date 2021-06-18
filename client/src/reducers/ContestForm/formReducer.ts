import { ContestFormState } from '../../interface/Contest';

type ContestAction =
  | { type: 'field'; fieldName: string; payload: { value: string | number; error: boolean } }
  | { type: 'error'; fieldName: string; payload: { value: string | number; error: boolean } }
  | { type: 'addImages'; payload: string[] }
  | { type: 'reset' };

function formReducer(state: ContestFormState, action: ContestAction): ContestFormState {
  switch (action.type) {
    case 'field': {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case 'error': {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case 'reset': {
      return {
        title: {
          value: '',
          error: false,
        },
        description: {
          value: '',
          error: false,
        },
        prize: {
          value: 0,
          error: false,
        },
        deadline: {
          value: '',
          error: false,
        },
      };
    }

    default:
      return state;
  }
}

export default formReducer;
