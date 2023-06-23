export const filteredCards = (cards) => {
  return cards.filter(e => e.author._id === '644101713291d790b3f840ef')
}

export const findLiked = (product, id) => {
  return product.likes.some(e => e === id)
}

export  const getEndings = (numb, field = 'товар') => {
  const tmp = numb % 10;
  if (!tmp || !numb) {
      return ` ${field}ов`
  }
  if (tmp >= 10 && tmp <= 14) {
      return ` ${field}ов`
  }

  if (tmp === 1) {
      return ` ${field}`
  }
  if (tmp > 1 && tmp < 5) {
      return ` ${field}а`
  }
  if (tmp > 5 && tmp < 9) {
      return ` ${field}ов`
  }
  return ` ${field}ов`
}