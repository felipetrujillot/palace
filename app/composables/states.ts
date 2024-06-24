/**
 *
 */
export type ProductCart = {
  id_product: number
  id_product_company: number
  id_inventory: number
  inventory_qty: number
  qty: number
  name: string
  url_picture: string
  price: number
  granel: number
  cost: number
}

/**
 *
 */
export const MAX_AGE = 3600 * 24 * 365

/**
 *
 * @returns
 */
export const useCart = () => useState<ProductCart[]>('useCart', () => [])

/**
 *
 * @returns
 */
export const useSheet = () => useState('useSheet', () => false)

/**
 * Add a product to the cart
 * if the product exists add a qty
 * @param product
 */
export const addUseCart = (product: ProductCart) => {
  const cart = useCart()

  if (typeof cart.value === 'undefined') {
    cart.value = [
      {
        ...product,
        qty: product.inventory_qty,
        granel: product.granel,
      },
    ]
    return
  }

  const findProduct = cart.value.find((c) => {
    if (c.id_product === product.id_product) return c
  })

  if (findProduct) {
    findProduct.qty += product.inventory_qty
    findProduct.cost += product.cost
    findProduct.price += product.price
    return
  }

  cart.value.push({
    ...product,
    qty: product.inventory_qty,
    granel: product.granel,
  })

  return
}

/**
 * finds a product and updates the qty to the defined one
 * @param id_product
 * @param qty
 */
export const updateProductQty = (id_product: number, qty: number) => {
  const cart = useCart()

  const findProduct = cart.value.find((c) => {
    if (c.id_product === id_product) return c
  })
  if (findProduct) {
    const originalPrice = findProduct.price / findProduct.qty
    const originalCost = findProduct.cost / findProduct.qty

    findProduct.qty = qty
    findProduct.price = qty * originalPrice
    findProduct.cost = qty * originalCost
  }
}

/**
 *
 */
export const removeProduct = (id_product: number) => {
  const cart = useCart()

  const filterProduct = cart.value.filter((c) => {
    if (c.id_product !== id_product) return c
  })

  cart.value = filterProduct
}

/**
 *
 * @returns
 */
export const useTotalCart = () => {
  const cart = useCart()

  let total = 0

  cart.value.forEach((c) => {
    total += c.price
  })
  return total
}
