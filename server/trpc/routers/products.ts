import { db } from '~/server/db/db'
import { publicProcedure, router } from '../trpc'
import { products } from '~/server/db/db_schema'
import { z } from 'zod'
import { eq } from 'drizzle-orm'

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
        product_href: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { product_href } = input
      const findProducts = await db
        .select()
        .from(products)
        .where(eq(products.product_href, product_href))

      return findProducts[0]
    }),
})
