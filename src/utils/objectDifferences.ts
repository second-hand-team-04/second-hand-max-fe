export const areDifferent = <T extends { [key: string]: unknown }>(
  initialValues: T,
  currentValues: T
): boolean => {
  return Object.keys(initialValues).some((key: string) => {
    const initialKey = initialValues[key];
    const currentKey = currentValues[key];
    return JSON.stringify(initialKey) !== JSON.stringify(currentKey);
  });
};
