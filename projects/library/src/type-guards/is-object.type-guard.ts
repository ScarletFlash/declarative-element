export const isObject = (input: unknown): input is Record<string, unknown> => {
  if (input === null) {
    return false;
  }

  switch (typeof input) {
    case 'function':
    case 'object': {
      return true;
    }

    default: {
      return false;
    }
  }
};
