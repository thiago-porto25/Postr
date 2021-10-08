export const parseTimestamp = (timestamp) => {
  return timestamp.toDate().toLocaleDateString('en-US', { timeZone: 'UTC' })
}
