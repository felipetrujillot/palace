import { db } from '~~/server/db/db'
import { publicProcedure, router } from '../trpc'
import {
  inventories,
  products,
  products_companies,
} from '~~/server/db/db_schema'
import { z } from 'zod'
import { and, eq } from 'drizzle-orm'

/**
 *
 */
export const productsTrpc = router({
  /**
   *
   *
   * @author FT
   */
  getProducts: publicProcedure.query(async () => {
    return await db.select().from(products)
  }),

  /**
   *
   *
   * @author FT
   */
  getProductByName: publicProcedure
    .input(
      z.object({
        id_product_company: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      //const { product_href } = input
      //const { id_company } = ctx.user!
      const id_company = 1

      const { id_product_company } = input

      const findProductCompany = await db
        .select({
          id_product: products.id_product,
          id_product_company: products_companies.id_product_company,
          id_company: products_companies.id_company,
          id_inventory: inventories.id_inventory,
          upc: products.upc,
          sku: products.sku,
          name: products.name,
          brand: products.brand,
          category: products.category,
          description: products.description,
          sub_category: products.sub_category,
          url_picture: products.url_picture,
          price: products_companies.price,
          granel: products_companies.granel,
          cost: products_companies.cost,
          color: products_companies.color,
          favorite: products_companies.favorite,
          no_price: products_companies.no_price,
          inventory_qty: products_companies.inventory_qty,
          created_at: products_companies.created_at,
          qty: inventories.qty,
          critical_qty: inventories.critical_qty,
        })
        .from(products_companies)
        .innerJoin(
          products,
          eq(products.id_product, products_companies.id_product)
        )
        .innerJoin(
          inventories,
          eq(inventories.id_inventory, products_companies.id_inventory)
        )
        .where(
          and(
            eq(products_companies.id_company, id_company),
            eq(products_companies.id_product_company, id_product_company)
          )
        )
        .limit(1)

      return findProductCompany[0]
      /* 
      const findProducts = await db
        .select()
        .from(products)
        .where(eq(products.product_href, product_href))

      return findProducts[0] */
    }),
})
