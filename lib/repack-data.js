module.exports = data => {
  const list = data.split('\n')
  // removes start
  list.splice(0, 3)
  // removes end
  list.splice(list.length - 4, 3)
  return list.join('\n')
}
