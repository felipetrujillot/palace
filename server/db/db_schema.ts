/**
 *
 */
import {
  mysqlTable,
  varchar,
  int,
  timestamp,
  mysqlSchema,
  text,
  float,
} from 'drizzle-orm/mysql-core'

export const mySchema = mysqlSchema('linebox')

/**
 *
 */
export const users = mysqlTable('users', {
  id_user: int('id_user').autoincrement().notNull(),
  id_company: int('id_company').notNull(),
  id_terminal: int('id_terminal').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  lastname: varchar('lastname', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: int('phone').notNull(),
  role: int('role').notNull().default(0),
  thermal_printer: int('thermal_printer').notNull().default(0),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').onUpdateNow(),
})

/**
 *
 */
export const companies = mysqlTable('companies', {
  id_company: int('id_company').autoincrement().notNull(),
  discount: int('discount').default(0).notNull(),
  subscription_id: int('subscription_id').default(0).notNull(),
  alert: int('alert').default(0).notNull(),
  company_name: varchar('company_name', { length: 255 }).notNull(),
  company_rut: varchar('company_rut', { length: 255 }).notNull(),
  company_giro: varchar('company_giro', { length: 255 }).notNull(),
  company_address: varchar('company_address', { length: 255 }).notNull(),
  company_razon_social: varchar('company_razon_social', {
    length: 255,
  }).notNull(),
  company_comuna: varchar('company_comuna', { length: 255 }).notNull(),
  company_region: varchar('company_region', { length: 255 }).notNull(),
  company_phone: varchar('company_phone', { length: 255 }).notNull(),
  active: int('active').notNull().default(1),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').onUpdateNow(),
})

/**
 *
 */
export const products = mysqlTable('products', {
  id_product: int('id_product').autoincrement(),
  name: varchar('name', {
    length: 255,
  }).notNull(),
  description: varchar('description', {
    length: 5000,
  }).notNull(),
  category: varchar('category', {
    length: 255,
  }).notNull(),
  sub_category: varchar('sub_category', {
    length: 255,
  }).notNull(),
  brand: varchar('brand', {
    length: 255,
  }).notNull(),
  cost: float('cost').notNull(),
  price: float('price').notNull(),
  upc: varchar('upc', {
    length: 255,
  }).notNull(),
  sku: varchar('sku', {
    length: 255,
  }).notNull(),
  url_picture: varchar('url_picture', {
    length: 2000,
  }).notNull(),
  mia_picture: int('mia_picture').default(0).notNull(),
  active: int('active').default(1).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').onUpdateNow(),
})

/**
 *
 */
export const products_companies = mysqlTable('products_companies', {
  id_product_company: int('id_product_company').autoincrement(),
  id_product: int('id_product').notNull(),
  id_company: int('id_company').notNull(),
  id_inventory: int('id_inventory').notNull(),
  cost: float('cost').notNull(),
  price: float('price').notNull(),
  inventory_qty: int('inventory_qty').notNull(),
  color: varchar('color', { length: 100 }).notNull(),
  granel: int('granel').notNull(),
  favorite: int('favorite').notNull().default(0),
  no_price: int('no_price').notNull().default(0),
  active: int('active').notNull().default(1),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at'),
})

/**
 *
 */
export const passwords_reset = mySchema.table('passwords_reset', {
  id_password_reset: int('id_password_reset').primaryKey().autoincrement(),
  token: varchar('token', { length: 250 }).notNull(),
  id_user: int('id_user').notNull(),
  active: int('active').default(1).notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at'),
})

/**
 *
 */
export const inventories = mysqlTable('inventories', {
  id_inventory: int('id_inventory').autoincrement(),
  //id_product_company: int('id_product_company').notNull(),
  //id_product: int('id_product').notNull(),
  //id_company: int('id_company').notNull(),
  qty: int('qty').notNull(),
  critical_qty: int('critical_qty').notNull(),
  active: int('active').notNull().default(1),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at'),
})



export type Users = typeof users.$inferSelect
export type PasswordsReset = typeof passwords_reset.$inferSelect
