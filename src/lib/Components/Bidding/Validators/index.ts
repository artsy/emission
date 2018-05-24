export const validatePresence = (value: string): string => {
  return value && value.length > 0 ? null : "This field is required"
}
