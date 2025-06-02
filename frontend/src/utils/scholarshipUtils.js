export const getDeadlineStatus = (deadline) => {
  if (!deadline) {
    return {
      text: 'No deadline specified',
      color: 'text-gray-500'
    };
  }

  const now = new Date();
  const deadlineDate = new Date(deadline);
  const daysUntil = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24));

  if (daysUntil < 0) {
    return {
      text: 'Deadline passed',
      color: 'text-red-600'
    };
  } else if (daysUntil <= 7) {
    return {
      text: `${daysUntil} day${daysUntil === 1 ? '' : 's'} left!`,
      color: 'text-red-600 font-bold animate-pulse'
    };
  } else if (daysUntil <= 30) {
    return {
      text: `${daysUntil} days left`,
      color: 'text-orange-600'
    };
  } else {
    return {
      text: `Deadline: ${new Date(deadline).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })}`,
      color: 'text-green-600'
    };
  }
}; 