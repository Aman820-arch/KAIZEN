const currencyFormatters = {
  USD: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }),
}

export function formatPrice(amount, currency = 'USD') {
  const formatter = currencyFormatters[currency]

  if (!formatter) {
    return `${currency} ${amount}`
  }

  return formatter.format(amount)
}
