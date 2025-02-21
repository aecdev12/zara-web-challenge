const purgeUndefinedValueFromObject = <T extends Record<string, unknown>>(
  object: T
): Partial<T> => {
  Object.entries(object).forEach(([key, value]) => {
    if (value === undefined || value === null) delete object[key];
  });

  return object;
};

export default purgeUndefinedValueFromObject;
