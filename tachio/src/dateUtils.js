function createDateInTimeZone(hour, minute, timeZone, daysOffset = 0) {
  const now = new Date();

  now.setDate(now.getDate() + daysOffset);
  const dateStr = now.toLocaleDateString('en-CA', { timeZone });
  const dateTimeStr = `${dateStr}T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;

  return new Date(dateTimeStr + 'Z');
}

module.exports = {
  createDateInTimeZone
}
