import { generateRandom5Digits } from '~/composables/helper'
import { publicProcedure, router } from '../trpc'
import HmacSHA256 from 'crypto-js/hmac-sha256'

import axios from 'axios'
import { z } from 'zod'

const sandboxUrl = 'https://sandbox.flow.cl/api/'
const apiKey = '1F5B2515-9E8D-41A1-A6D6-5D267L306466'
const secretKey = 'ca6cb2b20120c02552a72f0d7ea8ea0c273cf92c'

type Invoices = {
  amount: string
  attemp_count: number
  attemped: number
  created: string
  currency: string
  customerId: string
  due_date: string
  id: number
  next_attemp_date: null
  period_end: string
  period_start: string
  status: number
  subject: string
  subscriptionId: string
  paymentLink: string
}
type GetSubByCustomerId = {
  subscriptionId: string
  planId: string
  plan_name: string
  customerId: string
  created: string
  subscription_start: string
  subscription_end: string
  period_start: string
  period_end: string
  next_invoice_date: string
  trial_period_days: number
  trial_start: string
  trial_end: string
  cancel_at_period_end: number
  cancel_at: string
  periods_number: number
  days_until_due: number
  status: number
  morose: number
  invoices: Invoices[]
}

/**
 *
 */
export const flowTrpc = router({
  /**
   *
   */
  newPayment: publicProcedure
    .input(
      z.object({
        nombre: z.string(),
        comuna: z.string(),
        email: z.string(),
        numero: z.string(),
        region: z.string(),
        detalle: z.string(),
      })
    )
    .mutation(async () => {
      return await ordenCobro()
    }),

  payInvoice: publicProcedure
    .input(
      z.object({
        invoiceId: z.number(),
      })
    )
    .query(async ({ input }) => {
      const { invoiceId } = input

      const { paymentLink } = await getInvoiceById({
        invoiceId,
      })

      return { paymentLink }
    }),
})

/**
 *
 * @param param0
 */
const getInvoiceById = async ({ invoiceId }: { invoiceId: number }) => {
  const body = {
    apiKey,
    invoiceId,
    //filter: subscriptionId,
    //limit: 1,
  }

  const sign = signIn(body)
  const bodyParams = getPack(body, 'GET')

  const { data } = await axios.get(
    `${sandboxUrl}invoice/get?${bodyParams}&s=${sign}`
  )

  type Invoice = {
    id: number
    paymentLink: string
  }

  return data as Invoice
}

const getOrdenStatus = async () => {
  const body = {
    apiKey,
    token: '10C10CDFA071ED483828D8C5BB39A294FD4814BG',
  }

  const bodyParams = getPack(body, 'GET')
  const sign = signIn(body)

  type GetOrdenStatus = {
    flowOrder: number
    commerceOrder: string
    requestDate: string
    status: number
    subject: string
    currency: string
    amount: string
    payer: string
    optional: null
    pending_info: {
      media: null
      date: null
    }
    paymentData: {
      date: null
      media: null
      conversionDate: null
      conversionRate: null
      amount: null
      currency: null
      fee: null
      balance: null
      transferDate: null
    }
    merchantId: null
  }
  const { data } = await axios.get(
    `${sandboxUrl}payment/getStatus?${bodyParams}&s=${sign}`
  )

  return data as GetOrdenStatus
}
/**
 *
 * @returns
 */
const ordenCobro = async () => {
  const body = {
    apiKey,
    commerceOrder: generateRandom5Digits(),
    subject: 'Pago de prueba',
    currency: 'CLP',
    amount: 1000,
    email: 'trujillo.felipe1997@gmail.com',
    urlConfirmation: 'https://www.google.cl',
    urlReturn: 'https://www.google.cl',
  }

  const sign = signIn(body)
  const bodyParams = getPack(body, 'POST')

  type OrdenCobro = {
    data: {
      token: string
      url: string
      flowOrder: number
    }
  }
  const { data } = <OrdenCobro>(
    await axios.post(sandboxUrl + 'payment/create', `${bodyParams}&s=${sign}`)
  )

  return data
}

/**
 *
 * @param params
 * @param method
 * @returns
 */
const getPack = (params: any, method: string) => {
  const keys = Object.keys(params)
    .map((key) => key)
    .sort((a, b) => {
      if (a > b) return 1
      else if (a < b) return -1
      return 0
    })
  let data: any = []
  keys.map((key) => {
    if (method == 'GET') {
      data.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    } else {
      data.push(key + '=' + params[key])
    }
  })
  return data.join('&')
}

/**
 *
 * @param params
 * @returns
 */
const signIn = (params: any) => {
  const keys = Object.keys(params)
    .map((key) => key)
    .sort((a, b) => {
      if (a > b) return 1
      else if (a < b) return -1
      return 0
    })
  let toSign: any = []
  keys.map((key) => {
    toSign.push(key + '=' + params[key])
  })
  toSign = toSign.join('&')

  return HmacSHA256(toSign, secretKey)
}
