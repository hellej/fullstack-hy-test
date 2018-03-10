
const dummy = (blogs) => {
  return 1
}


const totalLikes = (blogs) => {
  const sum = blogs.reduce((a, b) => (a + b.likes), 0)
  return sum
}


const favoriteBlog = (blogs) => {
  blogs.sort((a, b) => a.likes - b.likes)
  return blogs[blogs.length - 1]
}


const authorStats = (blogs) => {

  const groupauthors = blogs.reduce(
    (obj, item) => (
      obj[item.author] = obj[item.author] || [],
      obj[item.author].push(item.likes),
      // console.log(obj),
      // console.log(obj[item.author]),
      obj
    ), []
  )

  const reducer = (accumulator, currentValue) => { return accumulator + currentValue }

  const authorstats = Object.keys(groupauthors).map((key) => {
    return { name: key, likes: groupauthors[key].reduce(reducer), count: groupauthors[key].length }
  })

  return authorstats

}

const mostBlogs = (blogs) => {
  const authorblogs = authorStats(blogs).sort((a, b) => a.count - b.count)
  // console.log('Authorblogs sorted: '.authorblogs);

  return authorblogs[authorblogs.length - 1]
}

const mostLikes = (blogs) => {
  const authorlikes = authorStats(blogs).sort((a, b) => a.likes - b.likes)
  // console.log('Authorlikes sorted: ', authorlikes);
  // authorstats.sort((a, b) => a.likes - b.likes)

  return authorlikes[authorlikes.length - 1]
}






module.exports = {
  dummy, totalLikes, favoriteBlog, mostLikes, mostBlogs
}