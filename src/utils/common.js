// это для того чтобы делать рандомный вывод товаров в продукте которые взаимо связаны с выбранным продуктом
export const shuffle = arr => [...arr].sort(() => 0.5 - Math.random())

//вспомогательная функция которая формирует наш запрос лоя поиска
export const buildUrl = (url, params) => {
   let urlWithParams = url
   Object.entries(params).forEach(([key, value], i) => {
      const sign = !i ? '?' : '&' // логика такая если первый элемент то будет ? если нет то &
      urlWithParams += `${sign}${key}=${value}`
   })
   return urlWithParams
}

//функция которая сичтает общюю цену добавленого товара в корзину
export const sumBy = arr => arr.reduce((prev, cur) => prev + cur, 0)
