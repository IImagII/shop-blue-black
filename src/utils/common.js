// это для того чтобы делать рандомный вывод товаров в продукте которые взаимо связаны с выбранным продуктом
export const shuffle = arr => [...arr].sort(() => 0.5 - Math.random())
