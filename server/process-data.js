function processVotesData(data) {
  // Calculate total votes from the data.json vote tallies
  //
  // Object.values(data) returns an array of values
  //
  const totalVotes = Object.values(data).reduce((total, n) => (total += n), 0);

  data = Object.entries(data).map(([label, votes]) => {
    return {
      label,
      percentage: ((100 * votes) / totalVotes || 0).toFixed(0), // or zero prevent divide by zero errors, .toFixed(0) converts to whole number
    };
  });

  return data;
}

module.exports = { processVotesData };
