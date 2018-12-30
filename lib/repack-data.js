function cleanupLine (line) {
  return line.substr(5, line.length - 6)
}

module.exports = data => {
  const list = data.split('\n')
  // removes start
  list.splice(0, 3)
  // removes end
  list.splice(list.length - 4, 3)
  return list.map(cleanupLine).join('\n')
}
