export const checkForChanges = <T extends { [key: string]: unknown }>(
  initialValues: T,
  currentValues: T
): boolean => {
  return Object.keys(initialValues).some((key: string) => {
    const initialKey = initialValues[key];
    const currentKey = currentValues[key];

    if (Array.isArray(initialKey)) {
      // 배열인 경우 JSON 문자열로 변환하여 비교
      return JSON.stringify(initialKey) !== JSON.stringify(currentKey);
    }

    return initialKey !== currentKey;
  });
};
